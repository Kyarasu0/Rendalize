import { NormalCard } from "../Components/Cards/NormalCard/NormalCard";
import { ProjectsListCard } from "../Components/Cards/ProjectsListCard/ProjectsListCard";
import { TimelineCard } from "../Components/Cards/TimelineCard/TimelineCard";
// import { ListCard } from "../Components/Cards/ListCard/ListCard";
// import { MediaCard } from "../Components/Cards/MediaCard/MediaCard";
// import { LineGraphCard } from "../Components/Cards/LineGraphCard/LineGraphCard";
// import { StackCard } from "../Components/Cards/StackCard/StackCard";
// import { StepCircleCard } from "../Components/Cards/StepCircleCard/StepCircleCard";
// import { FlipCard } from "../Components/Cards/FlipCard/FlipCard";
// import { TitleCard } from "../Components/Cards/TitleCard/TitleCard";

export const CardConfig = {
  NormalCard: {
    component: NormalCard,
    label: "Normal",
  },
  ProjectsListCard: { 
    component: ProjectsListCard,
    label: "ProjectsList"
  },
  TimelineCard: { 
    component: TimelineCard,
    label: "Timeline"
  },
  // ListCard: { 
  //   component: ListCard,
  //   label: "List" 
  // },
  // MediaCard: { 
  //   component: MediaCard,
  //   label: "Media"
  // },
  // LineGraphCard: { 
  //   component: LineGraphCard,
  //   label: "LineGraph"
  // },
  // StackCard: { 
  //   component: StackCard,
  //   label: "Stack"
  // },
  // StepCircleCard: { 
  //   component: StepCircleCard,
  //   label: "StepCircle"
  // },
  // FlipCard: { 
  //   component: FlipCard,
  //   label: "Flip"
  // },
  // TitleCard: { 
  //   component: TitleCard,
  //   label: "Title"
  // },
} as const;


export type CardKey = keyof typeof CardConfig;