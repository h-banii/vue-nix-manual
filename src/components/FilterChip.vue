<template>
  <div :class="$style['chip-container']" v-if="props.filters.length > 1">
    <div v-for="(filter, filterIndex) in props.filters" :key="filterIndex">
      <input
        type="checkbox"
        :id="`filter${filter.match}${filterIndex}`"
        v-model="filter.checked"
        @input="filterToggle(filterIndex)"
      />
      <label
        :for="`filter${filter.match}${filterIndex}`"
        :class="$style['chip']"
      >
        {{ filter.label }}
      </label>
    </div>
  </div>
  <div v-if="!!subFilters.length">
    <hr v-if="subFilters.length > 1" />
    <FilterChip :filters="subFilters" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { FilterChipModel } from "../types";

const props = defineProps<{ filters: FilterChipModel[] }>();

const filters = ref<FilterChipModel[]>(props.filters);
const subFilters = computed(() =>
  filters.value.length == 1
    ? filters.value[0].children
    : filters.value.find((filter) => filter.checked)?.children || [],
);

function filterToggle(filterIndex: number) {
  props.filters.forEach((filter, index) => {
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
