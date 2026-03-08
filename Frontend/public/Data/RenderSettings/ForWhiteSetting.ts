// 色合いのインポート
import { COLORS } from "../Colors/ForWhiteBg"

export const ForWhiteSetting = {
  theme: "white",
  color: COLORS,
  title: "NoteMarkerTitle",
  h1: {
    fontSize: "3rem",
    fontWeight: 700,
    margin: 0,
  },
  h2: {
    fontSize: "1.5rem",
    fontWeight: 600,
    margin: 0,
  },
  h3: {
    fontSize: "1.0rem",
    fontWeight: 600,
    margin: 0,
  },
  body: {
    fontSize: "18px",
  },
  p: {
    margin: 0,
  },
  pipelines: [
    {
      pipeline: "listPipeline",
      render: "CheckList"
    },
    {
      pipeline: "imagePipeline",
      render: "Image"
    },
    {
      pipeline: "stackPipeline",
      render: "Stack"
    }
  ]
};