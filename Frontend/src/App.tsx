import { MarkdownEngine } from "./Workspace/Components/MarkdownEngine/MarkdownEngine";

function App() {
  // ? 以降を取得する
  const params = new URLSearchParams(window.location.search);

  // fileの項目を取得する
  const file = params.get("file") || "sample.md";
  // modeの項目を取得する
  const mode = params.get("mode") == "slide" ? "slide" : "web";

  return (
    // MarkdownEngineに渡す
    <MarkdownEngine
      url={`/Data/${file}`}
      mode={mode}
    />
  );
}

export default App;