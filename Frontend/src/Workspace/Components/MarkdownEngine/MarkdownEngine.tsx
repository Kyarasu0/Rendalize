import { useEffect, useState } from "react";
// 型のインストール
import type { Parsed } from "../../Utils/parseMarkdown";
import type { MainParsed } from "../../Utils/parseMarkdown";
import type { SettingKey } from "../../Customs/SettingConfig";
import type { PipelineKey } from "../../Customs/PipelineConfig";
// Utilsインストール
import { parseMarkdown } from "../../Utils/parseMarkdown";
import { runPipelines } from "../../Utils/runPipelines";
// CSSの読み込み
import styles from "./MarkdownEngine.module.css";
// UI
import { Navigation } from "../Navigation/Navigation";
// Config
import { LayoutConfig } from "../../Customs/LayoutConfig";
import { TransitionConfig } from "../../Customs/TransitionConfig";
import { CursorConfig } from "../../Customs/CursorConfig";
import { TitleConfig } from "../../Customs/TitleConfig";
import { SettingConfig } from "../../Customs/SettingConfig";
import { PipelineConfig } from "../../Customs/PipelineConfig";
import { CardConfig } from "../../Customs/CardConfig";

interface Props {
  url: string;
  mode: "slide" | "web";
}

interface MarkdownMeta {
  layout?: string;
  transition?: string;
  cursor?: string;
  font?: string;
  setting?: string;
}

export const MarkdownEngine = ({ url, mode }: Props) => {

  // ===============================
  // State
  // ===============================
  const [layout, setLayout] = useState<Parsed>({
    type: "Normal",
    props: { theme: "dark" },
  });

  const [setting, setSetting] = useState(
    SettingConfig.ForWhiteSetting.setting
  );

  const [transition, setTransition] = useState<Parsed>({
    type: "Fade",
  });

  // ページとページタイトルのペア取得
  const [contents, setContents] = useState<MainParsed[]>([]);

  const [metaCursorOptions, setMetaCursorOptions] = useState<string[]>([]);
  const [activeCursor, setActiveCursor] = useState<string | null>(null);

  const [index, setIndex] = useState(0);
  const [globalFont, setGlobalFont] = useState<string>();


  // ======================================================
  // Markdown構造化後の読み込み処理
  // ======================================================

  useEffect(() => {
    loadMarkdown();
  }, [url]);

  const loadMarkdown = async () => {

    // URLからマークダウンファイルの内容を構造化して取得
    const res = await fetch(url);
    const raw = await res.text();
    const parsed = parseMarkdown(raw);

    // meta設定
    applyMetaSettings(parsed.meta);

    // ページとタイトルの取得
    setContents(parsed.contents);

    // スライド位置リセット
    setIndex(0);

  };


  // ======================================================
  // meta設定の処理
  // ======================================================

  const applyMetaSettings = (meta: MarkdownMeta) => {

    // Layout
    if (meta.layout) {
      const [type, theme] = meta.layout.split(" ");
      setLayout({
        type,
        props: { theme },
      });
    }

    // Transition
    if (meta.transition) {
      const [type, theme] = meta.transition.split(" ");
      setTransition({
        type,
        props: { theme },
      });
    }

    // Cursor
    if (meta.cursor) {
      const cursors = meta.cursor.split(" ").slice(0, 3);
      setMetaCursorOptions(cursors);
      setActiveCursor(cursors[0] ?? null);
    } else {
      setMetaCursorOptions([]);
      setActiveCursor(null);
    }

    // Font
    if (meta.font) {
      const fonts = meta.font.split(/\s+/);
      setGlobalFont(fonts.join(", "));
    }

    // Setting
    // meta.settingという項目が用意されているか、meta.settingがSettingConfig内に設定されているか
    if (meta.setting && meta.setting in SettingConfig) {
      const config = SettingConfig[meta.setting as SettingKey];

      if (config) {
        setSetting(config.setting);
        console.log("setting config: ", config.setting);
      }
    }
  };


  // ======================================================
  // キーボード操作
  // ======================================================

  useEffect(() => {

    const handler = (e: KeyboardEvent) => {

      if (mode !== "slide") return;

      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();

    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);

  }, [mode, contents.length, index]);


  // ======================================================
  // ページ移動
  // ======================================================

  const nextPage = () => {
    if (index >= contents.length - 1) return;
    setIndex(i => i + 1);
  };

  const prevPage = () => {
    if (index <= 0) return;
    setIndex(i => i - 1);
  };


  // ======================================================
  // Cursor制御
  // ======================================================

  useEffect(() => {

    document.body.style.cursor = activeCursor ? "none" : "auto";

    return () => {
      document.body.style.cursor = "auto";
    };

  }, [activeCursor]);


  // ======================================================
  // Page描画
  // ======================================================

  const renderPage = (page: MainParsed) => {

    // カードとタイトルの設定
    const cards = page.cards;
    const title = page.pageTitle;

    // subカードの枚数
    const subCount = cards.length;

    // 指定されたタイトルコンポーネントの指定
    const TitleComponent = title
      ? TitleConfig[setting.title as keyof typeof TitleConfig]?.component
      : null;

    // ======================
    // Pipeline設定取得
    // ======================
    // パイプライン名を示す文字列を実際の関数に変換
    const pipelinePairs = setting.pipelines.map(p => ({
      pipeline: PipelineConfig[p.pipeline as PipelineKey],
      matchType: p.matchType,
      render: p.render
    }))

    return (
      
      <div className={styles.MainCard}>

        {/* ======================
            Page Title
        ====================== */}

        {/* title.contentが存在し、TitleComponentが存在したらコンポーネントを表示 */}
        {title?.content && TitleComponent && (
          <TitleComponent
            {...title.props}
            content={title.content}
          />
        )}


        {/* ======================
            Sub Cards
        ====================== */}

        <div className={styles.SubCards}>

          {cards.map((card, i) => {
            // card.content をパイプラインで処理
            const elements = runPipelines(card.content ?? "", pipelinePairs);

            const width =
              card.props?.width ??
              (subCount > 0 ? `${100 / subCount}%` : "100%");

            // CardConfig からコンポーネントを取得
            const CardComponent =
              CardConfig[card.type as keyof typeof CardConfig]?.component ??
              CardConfig.NormalCard.component;

            return (
              <CardComponent
                key={i}
                elements={elements}
                {...card.props}
                color={setting.color}
                style={{ flex: `0 1 ${width}`, gap: "20px" }}
              />
            );

          })}

        </div>

      </div>

    );

  };


  // ======================================================
  // Configからコンポーネント取得
  // ======================================================

  const LayoutComponent =
    LayoutConfig[layout.type as keyof typeof LayoutConfig]?.component ??
    LayoutConfig.Normal.component;

  const TransitionComponent =
    TransitionConfig[transition.type as keyof typeof TransitionConfig]?.component ??
    TransitionConfig.Fade.component;


  // ======================================================
  // 現在ページ
  // ======================================================

  const currentPage = contents[index];
  if (!currentPage) return null;


  // ======================================================
  // Render
  // ======================================================

  return (

    <div
      className={styles.wrapper}
      style={{
        fontFamily: globalFont,
        fontSize: setting.body.fontSize
      }}
    >

      {/* ======================
          Layout
      ====================== */}

      <LayoutComponent theme={layout.props?.theme} />


      {/* ======================
          Cursor
      ====================== */}

      {activeCursor && (() => {

        const config =
          CursorConfig[activeCursor as keyof typeof CursorConfig];

        if (!config) return null;

        const Cursor = config.component;

        return <Cursor />;

      })()}


      {/* ======================
          Page Rendering
      ====================== */}

      {mode === "slide" ? (

        <div className={styles.cardWrapper}>

          <TransitionComponent key={index} trigger={index} duration={300}>
            {renderPage(currentPage)}
          </TransitionComponent>

        </div>

      ) : (

        contents.map((page, i) => (
          <div key={i}>
            {renderPage(page)}
          </div>
        ))

      )}


      {/* ======================
          Navigation
      ====================== */}

      {mode === "slide" && contents.length > 1 && (

        <Navigation
          onNext={nextPage}
          onPrev={prevPage}
          onCursorChange={setActiveCursor}
          cursorOptions={metaCursorOptions}
          isBlack={setting.theme === "black"}
        />

      )}

    </div>

  );

};