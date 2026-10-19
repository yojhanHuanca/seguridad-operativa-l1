import { expect, it } from 'vitest';
import { createImportRowReader } from './import-row-reader.js';
import type { ImportacionRow } from './importacion.types.js';

it('reconoce acentos y puntuación y conserva ceros, falsos y ceros iniciales', () => {
  const read = createImportRowReader({ dni: ['DNI'], age: ['Edad'], ok: ['Acepta atención'] });
  const row = { 'D.N.I.': '00123456', EDAD: 0, 'Acepta atencion': false };
  expect(read(row, 'dni')).toBe('00123456');
  expect(read(row, 'age')).toBe('0');
  expect(read(row, 'ok')).toBe('false');
});

it('lee cambios en valores y encabezados sin reutilizar datos obsoletos', () => {
  const read = createImportRowReader({ name: ['Nombre', 'Persona'] });
  const row: ImportacionRow = { Nombre: 'Inicial' };
  expect(read(row, 'name')).toBe('Inicial');
  row.Nombre = 'Corregido';
  expect(read(row, 'name')).toBe('Corregido');
  delete row.Nombre;
  row.Persona = 'Otra columna';
  expect(read(row, 'name')).toBe('Otra columna');
});

it('mantiene la primera columna reconocida cuando hay varios alias', () => {
  const read = createImportRowReader({ name: ['Nombre', 'Persona'] });
  expect(read({ Persona: 'Primero', Nombre: 'Segundo' }, 'name')).toBe('Primero');
  expect(read({ Desconocido: 'Valor' }, 'name')).toBe('');
});
