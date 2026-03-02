import { NormalCard } from "../Components/Cards/NormalCard/NormalCard";
import { ListCard } from "../Components/Cards/ListCard/ListCard";
import { MediaCard } from "../Components/Cards/MediaCard/MediaCard";
import { TimelineCard } from "../Components/Cards/TimelineCard/TimelineCard";
import { LineGraphCard } from "../Components/Cards/LineGraphCard/LineGraphCard";
import { StackCard } from "../Components/Cards/StackCard/StackCard";
import { StepCircleCard } from "../Components/Cards/StepCircleCard/StepCircleCard";
import { FlipCard } from "../Components/Cards/FlipCard/FlipCard";

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
  LineGraphCard: { 
    component: LineGraphCard,
    label: "LineGraph"
  },
  StackCard: { 
    component: StackCard,
    label: "Stack"
  },
  StepCircleCard: { 
    component: StepCircleCard,
    label: "StepCircle"
  },
  FlipCard: { 
    component: FlipCard,
    label: "Flip"
  },
} as const;


export type CardKey = keyof typeof CardConfig;