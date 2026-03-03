import { NormalTitle } from "../Components/Titles/NormalTitle/NormalTitle";
import { NoteMarkerTitle } from "../Components/Titles/NoteMarkerTitle/NoteMarkerTitle";

export const TitleConfig = {
  NormalTitle: {
    component: NormalTitle,
    label: "Normal",
  },
  NoteMarkerTitle: {
    component: NoteMarkerTitle,
    label: "NoteMarker",
  },
  // 今後自由に追加可能
} as const;

export type TitleKey = keyof typeof TitleConfig;