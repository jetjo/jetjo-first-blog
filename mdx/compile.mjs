export function parseMDXHeader(headerStr) {
  return (
    '{"' + headerStr.replaceAll(":", '":').replaceAll(/\n/g, ',\n"') + "}"
  );
}
