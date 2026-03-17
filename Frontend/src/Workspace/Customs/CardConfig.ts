import { NormalCard } from "../Components/Cards/NormalCard/NormalCard";
import { ProjectsListCard } from "../Components/Cards/ProjectsListCard/ProjectsListCard";
import { TimelineCard } from "../Components/Cards/TimelineCard/TimelineCard";
import { EggListCard } from "../Components/Cards/EggListCard/EggListCard";

export const CardConfig = {
  NormalCard: { component: NormalCard },
  ProjectsListCard: { component: ProjectsListCard },
  TimelineCard: { component: TimelineCard },
  EggListCard: { component: EggListCard }
} as const;

export type CardKey = keyof typeof CardConfig;