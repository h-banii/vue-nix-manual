import { Plugin } from "vue";
import SearchOptions from "./components/SearchOptions.vue";
import { FilterChipModel } from "./types";

export const createFilters = (options: string[]): FilterChipModel[] => {
  let root = new Map<string, Set<string>>();

  for (const option of options) {
    const keys = option.split(".");
    const key = keys[0];

    if (!root.has(key)) {
      root.set(key, new Set());
    }

    if (keys.length > 1) {
      root.get(key)?.add(keys.slice(1).join("."));
    }
  }

  return Array.from(root.keys())
    .map((key): [string, Set<string> | undefined] => [key, root.get(key)])
    .filter((arg): arg is [string, Set<string>] => arg[1] !== undefined)
    .sort(([_a, sub_a], [_b, sub_b]) => sub_b.size - sub_a.size)
    .map(
      ([key, subfilters]: [string, Set<string>]): FilterChipModel => ({
        match: key,
        label: key,
        checked: false,
        children: createFilters(Array.from(subfilters!)),
      }),
    );
};

const plugin: Plugin = {
  install(app) {
    app.component("SearchOptions", SearchOptions);
  },
};

export default plugin;
