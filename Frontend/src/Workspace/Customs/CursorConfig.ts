import { Laser } from "../Components/Cursors/Laser/Laser";
import { Sparkle } from "../Components/Cursors/Sparkle/Sparkle";
import { Glow } from "../Components/Cursors/Glow/Glow";
import { TapRipple } from "../Components/Cursors/TapRipple/TapRipple";
import { Marker } from "../Components/Cursors/Marker/Marker";

export const CursorConfig = {
  laser: {
    component: Laser,
    label: "Laser",
  },
  sparkle: {
    component: Sparkle,
    label: "Sparkle",
  },
  glow: {
    component: Glow,
    label: "Glow",
  },
  TapRipple: {
    component: TapRipple,
    label: "TapRipple",
  },
  Marker: {
    component: Marker,
    label: "Marker",
  },
} as const;

// typeof CursorConfig = { laser: {component: component, label: string}, sparkle: {component: component, label: string}, glow: {component: component, label: string} }
// keyof { laser: {component: component, label: string}, sparkle: {component: component, label: string}, glow: {component: component, label: string} } = "laser" | "sparkle" | "glow"
export type CursorKey = keyof typeof CursorConfig;