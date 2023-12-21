import { atom } from "nanostores";
import { PageContext } from "vike/types";

export const $pageContext = atom<PageContext>({} as PageContext);

