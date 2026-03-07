// ============================================
//              ElementConfig
// ============================================
// ElementNodeの type から対応するコンポーネントを取得するConfig
// type: "image" → Image.tsx
// type: "markdown" → Markdown.tsx
// type: "list" → ListElement.tsx
// type: "title" → TitleElement.tsx
// type: "normal" → NormalElement.tsx
// type: "projects" → ProjectsListElement.tsx
// type: "timeline" → TimelineElement.tsx
// type: "stack" → StackElement.tsx
// type: "stepcircle" → StepCircleElement.tsx
// ============================================

import type { ElementNode } from "../Utils/runPipelines";
import { Image } from "../Components/Elements/Image";
import { Markdown } from "../Components/Elements/Markdown";
import { ListElement } from "../Components/Elements/ListElement";
import { TitleElement } from "../Components/Elements/TitleElement";
import { NormalElement } from "../Components/Elements/NormalElement";
import { ProjectsListElement } from "../Components/Elements/ProjectsListElement";
import { TimelineElement } from "../Components/Elements/TimelineElement";
import { StackElement } from "../Components/Elements/StackElement";
import { StepCircleElement } from "../Components/Elements/StepCircleElement";

export interface ElementComponent {
  component: (props: ElementNode & { color?: any }) => React.ReactNode;
}

// ============================================
// ElementConfig
// ============================================
// Element type → コンポーネント
// ============================================

export const ElementConfig = {
  image: {
    component: Image,
  },
  markdown: {
    component: Markdown,
  },
  list: {
    component: ListElement,
  },
  title: {
    component: TitleElement,
  },
  normal: {
    component: NormalElement,
  },
  projects: {
    component: ProjectsListElement,
  },
  timeline: {
    component: TimelineElement,
  },
  stack: {
    component: StackElement,
  },
  stepcircle: {
    component: StepCircleElement,
  },
} as const;

// ============================================
// Element type の型
// ============================================

export type ElementType = keyof typeof ElementConfig;
