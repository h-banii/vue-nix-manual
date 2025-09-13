<script setup>
import { createFilters } from 'vue-nix-manual';

const options = {
  "programs.youtube-music.options.alwaysOnTop": {
    "declarations": [
      "/nix/store/4y5mqkxr9vw9h1y0ydqzycwzlfk4p9db-source/nix/hm-module/options.nix"
    ],
    "default": {
      "_type": "literalExpression",
      "text": "false"
    },
    "description": "This option has no description.",
    "loc": ["programs", "youtube-music", "options", "alwaysOnTop"],
    "readOnly": false,
    "type": "unspecified value"
  },
  "programs.youtube-music.plugins.something": {
    "declarations": [
      "/nix/store/4y5mqkxr9vw9h1y0ydqzycwzlfk4p9db-source/nix/hm-module/options.nix"
    ],
    "default": {
      "_type": "literalExpression",
      "text": "false"
    },
    "description": "This option has no description.",
    "loc": ["programs", "youtube-music", "options", "alwaysOnTop"],
    "readOnly": false,
    "type": "unspecified value"
  },
  "programs.youtube-music.options.something": {
    "declarations": [
      "/nix/store/4y5mqkxr9vw9h1y0ydqzycwzlfk4p9db-source/nix/hm-module/options.nix"
    ],
    "default": {
      "_type": "literalExpression",
      "text": "false"
    },
    "description": "This option has no description.",
    "loc": ["programs", "youtube-music", "options", "alwaysOnTop"],
    "readOnly": false,
    "type": "unspecified value"
  }
};

const pluginOptions = Object.fromEntries(Object.entries(options).filter(([key, _]) => key.includes("plugins")));
</script>

# NixOS Module

<SearchOptions :options='options' :filters='createFilters(options, 2).concat(createFilters(pluginOptions, 3, 2))' />
