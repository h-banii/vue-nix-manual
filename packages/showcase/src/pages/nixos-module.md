<script setup>
import options from "./options.json";
import { createFilters } from 'vue-nix-manual';

const pluginOptions = Object.fromEntries(Object.entries(options).filter(([key, _]) => key.includes("plugins")));
</script>

# NixOS Module

<SearchOptions :options='options' :filters='createFilters(options, 2).concat(createFilters(pluginOptions, 3, 2))' />
