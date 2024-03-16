import { getSiteMeta } from "../3rd/site-meta";
import { allItemsEqual } from "../utils/equal";

let preDeps;
let meta;

export function useSiteMeta(deps = []) {
  if (!preDeps || !allItemsEqual(deps, preDeps)) {
    meta = getSiteMeta();
    preDeps = deps;
  }
  return { meta };
}
