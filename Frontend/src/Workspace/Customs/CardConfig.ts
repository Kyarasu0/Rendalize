import { MessageCard } from "../Components/Cards/MessageCard/MessageCard";

export const CardConfig = {
  MessageCard: {
    component: MessageCard,
    label: "Message",
  },
} as const;

export type CardKey = keyof typeof CardConfig;