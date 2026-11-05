import type { Workbook } from "exceljs";

const SPREADSHEET_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
const PACKAGE_NS = "http://schemas.openxmlformats.org/package/2006/relationships";

// ExcelJS compara nombres de etiquetas literalmente (workbook, no x:workbook).
// Solo adaptamos los namespaces conocidos en una copia temporal del paquete.
function normalizeNamespace(xml: string, namespace: string): string {
  const prefixes = new Set<string>();
  xml.replace(/xmlns:([\w.-]+)\s*=\s*(["'])(.*?)\2/g, (match, prefix: string, _quote: string, uri: string) => {
    if (uri === namespace) prefixes.add(prefix);
    return match;
  });
  for (const prefix of prefixes) {
    const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    xml = xml.replace(new RegExp(`(<\\/?)${escaped}:`, "g"), "$1");
  }
  return xml;
}

function relativeTarget(relationshipPath: string, target: string): string {
  const sourceDirectory = relationshipPath.includes("/_rels/")
    ? relationshipPath.slice(0, relationshipPath.indexOf("/_rels/")) : "";
  const from = sourceDirectory.split("/").filter(Boolean);
  const to = target.slice(1).split("/").filter(Boolean);
  let common = 0;
  while (common < from.length && common < to.length && from[common] === to[common]) common++;
  return [...Array(from.length - common).fill(".."), ...to.slice(common)].join("/");
}

/** Read only: never modifies the File, uploads data or executes workbook macros. */
export async function readExcelWorkbook(source: ArrayBuffer): Promise<Workbook> {
  const ExcelJS = (await import("exceljs")).default;
  const load = async (bytes: ArrayBuffer) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(bytes);
    if (!workbook.worksheets.length) throw new Error("El libro no contiene hojas.");
    return workbook;
  };
  try {
    return await load(source);
  } catch {
    try {
      const JSZip = (await import("jszip")).default;
      const archive = await JSZip.loadAsync(source);
      // .rels son XML aunque su extensión no sea .xml. No omitirlos.
      const entries = Object.keys(archive.files).filter(name => /\.(xml|rels)$/i.test(name));
      await Promise.all(entries.map(async name => {
        const entry = archive.file(name);
        if (!entry) return;
        let xml = normalizeNamespace(await entry.async("string"), SPREADSHEET_NS);
        if (name.endsWith(".rels")) {
          xml = normalizeNamespace(xml, PACKAGE_NS);
          xml = xml.replace(/<Relationship\b[^>]*(?:\/>|>[\s\S]*?<\/Relationship>)/g, relationship => {
            // Las tablas son presentación; conservamos todas las celdas del rango.
            if (/\bType=["'][^"']*\/table["']/.test(relationship)) return "";
            // No cambiar ni resolver enlaces externos.
            if (/\bTargetMode=["']External["']/.test(relationship)) return relationship;
            return relationship.replace(/\bTarget=(["'])(\/[^"']*)\1/g,
              (_match, quote: string, target: string) => `Target=${quote}${relativeTarget(name, target)}${quote}`);
          });
        }
        if (name.startsWith("xl/worksheets/") && name.endsWith(".xml")) {
          xml = xml.replace(/<tableParts\b[^>]*(?:\/>|>[\s\S]*?<\/tableParts>)/g, "");
        }
        if (name === "[Content_Types].xml") {
          xml = xml.replace(/<Override\b(?=[^>]*\bPartName=["']\/xl\/tables\/)[^>]*\/>/g, "");
        }
        archive.file(name, xml);
      }));
      Object.keys(archive.files).filter(name => name.startsWith("xl/tables/")).forEach(name => archive.remove(name));
      return await load(await archive.generateAsync({ type: "arraybuffer" }));
    } catch (cause) {
      throw new Error("No se pudo leer el libro de Excel. Comprueba que sea un archivo .xlsx o .xlsm válido, no esté dañado y no tenga contraseña de apertura.", { cause });
    }
  }
}
