{
  nixosOptionsDoc,
  lib,
  module,
  pkgs,
  ...
}:
let
  eval = lib.evalModules {
    modules = [
      {
        options._module.args = lib.mkOption {
          internal = true;
        };
        config = {
          _module.check = false;
        };
      }
      module
    ];

    specialArgs = { inherit pkgs; };
  };
in
nixosOptionsDoc {
  # TODO: Fix warnings... (add missing descriptions to ALL options)
  warningsAreErrors = false;
  inherit (eval) options;
}
