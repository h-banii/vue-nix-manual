<template>
  <div :class="$style['chip-container']" v-if="props.filters.length > 1">
    <div v-for="(filter, filterIndex) in props.filters" :key="filterIndex">
      <input
        type="checkbox"
        :id="`filter-${filter.id}`"
        v-model="filter.checked"
        @input="filterToggle(filterIndex)"
      />
      <label
        :for="`filter-${filter.id}`"
        :class="$style['chip']"
      >
        {{ filter.match }}
      </label>
    </div>
  </div>
  <div v-if="!!subFilters.length">
    <hr v-if="subFilters.length > 1" />
    <FilterChip :filters="subFilters" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FilterChipModel } from "../types";

const props = defineProps<{ filters: FilterChipModel[] }>();

const subFilters = computed(() =>
  props.filters.length == 1
    ? props.filters[0].children
    : props.filters.find((filter) => filter.checked)?.children || [],
);

function filterToggle(filterIndex: number) {
  props.filters.forEach((filter, index) => {
    if (index == filterIndex) {
      console.log("CHANGING", filter);
    }
    filter.checked = index == filterIndex;
  });
}
</script>

<style module>
.chip-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 8px;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    display: none;
    &:checked + .chip {
      border: 1px var(--vp-local-search-highlight-bg) solid;
    }
  }

  .chip {
    padding: 6px;
    border: 1px var(--vp-input-border-color) solid;
    border-radius: 16px;

    &:hover {
      outline: 2px var(--vp-local-search-highlight-bg) solid !important;
    }
  }
}
</style>
