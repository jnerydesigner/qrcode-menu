export function normalizeSvgBeforeSave(svg: string): string {
  return svg
    .replace(/^"/, "")                 // remove aspas externas do JSON
    .replace(/"$/, "")                 // remove aspas externas finais
    .replace(/\\"/g, '"')              // remove aspas escapadas
    .replace(/\\n/g, "")               // remove \n literais
    .replace(/\\\\/g, "\\")            // remove barras duplas desnecessárias
    .trim();
}