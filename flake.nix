{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    {
      nixpkgs,
      systems,
      ...
    }:
    let
      inherit (nixpkgs) lib;
      forAllSystems = lib.genAttrs (import systems);
      pkgsFor = forAllSystems (system: nixpkgs.legacyPackages.${system});
    in
    {
      packages = forAllSystems (
        system:
        let
          pkgs = pkgsFor.${system};
        in
        {
          default =
            with pkgs;
            buildNpmPackage {
              pname = "vue-nix-manual";
              version = "1.0.0";

              postPatch = ''
                substituteInPlace package.json \
                  --replace 'npm run build' ':'
              '';

              src = nix-gitignore.gitignoreSourcePure [
                ./.gitignore
                "result\n"
                "README.md\n"
                "flake.*\n"
              ] (lib.cleanSource ./.);

              npmDeps = importNpmLock {
                npmRoot = ./.;
              };

              npmConfigHook = importNpmLock.npmConfigHook;

              allowSubstitutes = false;
              preferLocalBuild = true;
            };
        }
      );

      devShells = forAllSystems (
        system:
        let
          pkgs = pkgsFor.${system};
        in
        {
          default = pkgs.mkShell {
            name = "vue-nix-manual-dev";
            packages = with pkgs; [
              nodejs
            ];
          };
        }
      );
    };
}
