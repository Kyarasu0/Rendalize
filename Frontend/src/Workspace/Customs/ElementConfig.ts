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
import { Image } from "../Components/Elements/Image/Image";
import { CheckList } from "../Components/Elements/CheckList/CheckList";
import { Text } from "../Components/Elements/Text/Text";

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
  CheckList: {
    component: CheckList,
  },
  text: {
    component: Text,
  },
} as const;

// ============================================
// Element type の型
// ============================================

export type ElementType = keyof typeof ElementConfig;
