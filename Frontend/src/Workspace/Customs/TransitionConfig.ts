import { Fade } from "../Components/Transitions/Fade/Fade";

export const TransitionConfig = {
  Fade: {
    component: Fade,
  },
} as const;

export type TransitionKey = keyof typeof TransitionConfig;