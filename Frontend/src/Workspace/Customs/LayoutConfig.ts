import { Normal } from "../Components/Layouts/Normal/Normal";
import { Aurora } from "../Components/Layouts/Aurora/Aurora";
import { WhiteGrid } from "../Components/Layouts/WhiteGrid/WhiteGrid";
import { ImageBackground } from "../Components/Layouts/ImageBackground/ImageBackground";

export const LayoutConfig = {
  Normal: { component: Normal },
  Aurora: { component: Aurora },
  WhiteGrid: { component: WhiteGrid },
  ImageBackground: { component: ImageBackground },
} as const;

export type LayoutKey = keyof typeof LayoutConfig;