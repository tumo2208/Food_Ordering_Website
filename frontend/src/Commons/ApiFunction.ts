import type {SearchOptions} from "./Type.ts";
import {smartSearch} from "./DataDummy.ts";

export const searchFunction = async (query:SearchOptions) => {
    const res = smartSearch(query);
    return Promise.resolve(res);
}