import { Normal } from "../Components/Layouts/Normal/Normal";
import { Aurora } from "../Components/Layouts/Aurora/Aurora";

export const LayoutConfig = {
  Normal: {
    component: Normal,
  },
  Aurora: {
    component: Aurora,
  },
} as const;

export type LayoutKey = keyof typeof LayoutConfig;