/** Cached text results in XLSX can be misread as dates when a formula cell has a date format. */
export async function readFormulaCachedText(source: ArrayBuffer, selectedSheets: Set<string>): Promise<Map<string, Map<string, string>>> {
  const JSZip = (await import("jszip")).default;
  const zip = await JSZip.loadAsync(source);
  const workbookXml = await zip.file("xl/workbook.xml")?.async("string");
  const relationshipsXml = await zip.file("xl/_rels/workbook.xml.rels")?.async("string");
  const result = new Map<string, Map<string, string>>();
  if (!workbookXml || !relationshipsXml) return result;

  const workbook = new DOMParser().parseFromString(workbookXml, "application/xml");
  const relationships = new DOMParser().parseFromString(relationshipsXml, "application/xml");
  const targets = new Map(Array.from(relationships.getElementsByTagName("Relationship"), rel => [rel.getAttribute("Id"), rel.getAttribute("Target")]));
  for (const sheet of Array.from(workbook.getElementsByTagName("sheet"))) {
    const name = sheet.getAttribute("name");
    if (!name || !selectedSheets.has(name)) continue;
    const relationshipId = Array.from(sheet.attributes).find(attr => attr.localName === "id")?.value;
    const target = targets.get(relationshipId ?? null);
    if (!target) continue;
    const path = target.startsWith("/") ? target.slice(1) : target.startsWith("xl/") ? target : `xl/${target}`;
    const xml = await zip.file(path)?.async("string");
    if (!xml) continue;
    const cached = new Map<string, string>();
    for (const cell of xml.matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
      if (!/\bt=["']str["']/.test(cell[1] ?? "") || !/<f\b/.test(cell[2] ?? "")) continue;
      const address = /\br=["']([^"']+)["']/.exec(cell[1] ?? "")?.[1];
      const value = /<v>([\s\S]*?)<\/v>/.exec(cell[2] ?? "")?.[1];
      if (!address || value === undefined) continue;
      cached.set(address, value.replace(/&(?:amp|lt|gt|quot|apos|#x[0-9a-f]+|#\d+);/gi, entity => {
        const code = entity.slice(1, -1);
        if (code.startsWith("#x")) return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
        if (code.startsWith("#")) return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
        return ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" } as Record<string, string>)[code] ?? entity;
      }));
    }
    if (cached.size) result.set(name, cached);
  }
  return result;
}
