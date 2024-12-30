// global.d.ts
declare module "shaka-player/dist/shaka-player.ui.js" {
  export = shaka; // Expose the shaka object from the shaka-player package
}

declare global {
  var shaka: typeof import("shaka-player/dist/shaka-player.ui.js");
}

export {}; // Ensures the file is treated as a module
