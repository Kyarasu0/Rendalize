// 色合いのインポート
import { COLORS } from "../Colors/EasterEggHackathon"

export const EasterEggHackathon = {
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
    fontSize: "25px",
  },
  p: {
    margin: 0,
  },
  pipelines: [
    {
      matchType: "list",
      pipeline: "listPipeline",
      render: "CheckList"
    },
    {
      matchType: "image",
      pipeline: "imagePipeline",
      render: "Image"
    },
    {
      matchType: "stack",
      pipeline: "stackPipeline",
      render: "Stack"
    },
    {
      matchType: "icon",
      pipeline: "iconPipeline",
      render: "ColorIcon"
    }
  ]
};