import { Image } from "../Components/Elements/Image/Image";
import { CheckList } from "../Components/Elements/CheckList/CheckList";
import { Stack } from "../Components/Elements/Stack/Stack";
import { ColorIcon } from "../Components/Elements/ColorIcon/ColorIcon";
import { JumpChatStack } from "../Components/Elements/JumpChatStack/JumpChatStack";

export const ElementConfig = {
  Image: { component: Image },
  CheckList: { component: CheckList },
  Stack: { component: Stack },
  JumpChatStack: { component: JumpChatStack },
  ColorIcon: { component: ColorIcon },
} as const;

export type ElementType = keyof typeof ElementConfig;
