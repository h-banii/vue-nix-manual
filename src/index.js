import SearchOptions from "./components/SearchOptions.vue";

export const createFilters = (options, depth = 1, labelDepth = depth) =>
  Object.entries(options)
    .map(([key, option]) => {
      const keys = key.split(".");

      if (keys.length < depth + 1) {
        return null;
      }

      return {
        match: keys.slice(0, depth + 1).join("."),
        label: keys.slice(labelDepth, depth + 1).join("."),
        checked: false,
      };
    })
    .filter((v) => !!v)
    .filter(
      (filter, index, filters) =>
        filters.map((filter) => filter.match).indexOf(filter.match) == index,
    );

export default {
  install(app) {
    app.component("SearchOptions", SearchOptions);
  },
};
