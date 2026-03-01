import { NormalCard } from "../Components/Cards/NormalCard/NormalCard";
import { ListCard } from "../Components/Cards/ListCard/ListCard";
import { MediaCard } from "../Components/Cards/MediaCard/MediaCard";
import { TimelineCard } from "../Components/Cards/TimelineCard/TimelineCard";

export const CardConfig = {
  NormalCard: {
    component: NormalCard,
    label: "Normal",
  },
  ListCard: { 
    component: ListCard,
    label: "List" 
  },
  MediaCard: { 
    component: MediaCard,
    label: "Media"
  },
  TimelineCard: { 
    component: TimelineCard,
    label: "Timeline"
  },
} as const;

export type CardKey = keyof typeof CardConfig;