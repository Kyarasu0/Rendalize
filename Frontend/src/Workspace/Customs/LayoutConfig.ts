import { Normal } from "../Components/Layouts/Normal/Normal";
import { Aurora } from "../Components/Layouts/Aurora/Aurora";
import { WhiteGrid } from "../Components/Layouts/WhiteGrid/WhiteGrid";

export const LayoutConfig = {
  Normal: {
    component: Normal,
  },
  Aurora: {
    component: Aurora,
  },
  WhiteGrid: {
    component: WhiteGrid,
  },
} as const;

export type LayoutKey = keyof typeof LayoutConfig;