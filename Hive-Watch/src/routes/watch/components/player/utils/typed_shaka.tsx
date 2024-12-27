import * as shakaPlayer from "shaka-player/dist/shaka-player.ui.js";

// Cast the imported module to the `shaka` namespace type
export const shakaTyped: typeof shaka = shakaPlayer;
