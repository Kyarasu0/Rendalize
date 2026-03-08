import { Image } from "../Components/Elements/Image/Image";
import { CheckList } from "../Components/Elements/CheckList/CheckList";
import { Stack } from "../Components/Elements/Stack/Stack";

export const ElementConfig = {
  Image: { component: Image },
  CheckList: { component: CheckList },
  Stack: { component: Stack },
} as const;

export type ElementType = keyof typeof ElementConfig;
