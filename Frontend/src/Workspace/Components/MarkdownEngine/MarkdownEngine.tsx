import { useEffect, useState } from "react";
import { parseMarkdown } from "../../Utils/parseMarkdown";
import styles from "./MarkdownEngine.module.css";
import type { Parsed } from "../../Utils/parseMarkdown";
// Navigationの種類のimport
import { Navigation } from "../Navigation/Navigation";
// ===== Customsのimport追加 =====
import { CardConfig } from "../../Customs/CardConfig";
import { LayoutConfig } from "../../Customs/LayoutConfig";
import { TransitionConfig } from "../../Customs/TransitionConfig";
import { CursorConfig } from "../../Customs/CursorConfig";

interface Props {
  url: string;
  mode: "slide" | "web";
}

export const MarkdownEngine = ({ url, mode }: Props) => {
  // ========== Card ==========
  const [pages, setPages] = useState<Parsed[][]>([]);
  // ==========================

  // ========== Layout ===========
  const [layout, setLayout] = useState<Parsed>({
    type: "Normal",
    props: { theme: "dark" },
  });
  // =============================

  // ========== Transition ===========
  const [transition, setTransition] = useState<Parsed>({ type: "Fade" });
  // =================================

  // ========== Cursor ===========
  const [metaCursorOptions, setMetaCursorOptions] = useState<string[]>([]);
  const [activeCursor, setActiveCursor] = useState<string | null>(null);
  // =============================

  // スライドモード用の現在インデックス
  const [index, setIndex] = useState(0);

  // =========================
  // Markdownをフェッチしてパース
  // =========================
  useEffect(() => {
    fetch(url)
      .then(res => res.text())
      .then(raw => {
        const parsed = parseMarkdown(raw);

        // pages[][]の取得
        setPages(parsed.pages ?? []);

        // metaから引数付きのlayoutを取得
        if (parsed.meta.layout) {
          const parts = parsed.meta.layout.split(" ");
          setLayout({
            type: parts[0],
            props: { theme: parts[1] },
          });
        }

        // metaから引数付きのtransitionを取得
        if (parsed.meta.transition) {
          const parts = parsed.meta.transition.split(" ");
          setTransition({
            type: parts[0],
            props: { theme: parts[1] },
          });
        }

        // metaから最大3個までのカーソル取得
        if (parsed.meta.cursor) {
          const cursors = parsed.meta.cursor.split(" ").slice(0, 3);
          setMetaCursorOptions(cursors);
          setActiveCursor(cursors[0] ?? null);
        } else {
          setMetaCursorOptions([]);
          setActiveCursor(null);
        }

        // URLが変わったらスライド位置もリセット
        setIndex(0);
      });
  }, [url]);

  // =========================
  // キーボード操作（スライドモード用）
  // =========================
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (mode !== "slide") return;

      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [pages, index, mode]);

  // =========================
  // カード切り替え（ページ単位）
  // =========================
  const handleNext = () => {
    if (index >= pages.length - 1) return;
    setIndex(i => i + 1);
  };

  const handlePrev = () => {
    if (index <= 0) return;
    setIndex(i => i - 1);
  };

  // ===== カーソル制御 =====
  useEffect(() => {
    if (activeCursor) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [activeCursor]);

  // =========================
  // 現在表示するページ
  // =========================
  const currentPage = pages[index];
  if (!currentPage) return null;

  const LayoutComponent =
    LayoutConfig[layout.type as keyof typeof LayoutConfig]?.component ??
    LayoutConfig.Normal.component;

  const TransitionComponent =
    TransitionConfig[transition.type as keyof typeof TransitionConfig]?.component ??
    TransitionConfig.Fade.component;

  // ===== align型ガード =====
  const safeAlign = (
    value?: string
  ): "left" | "center" | "right" | undefined => {
    if (value === "left" || value === "center" || value === "right") {
      return value;
    }
    return "left";
  };
  // =========================

  // =========================
  // ページ描画関数（サブカード横詰め）
  // =========================
  const renderPage = (page: Parsed[], pageIndex?: number) => {
    const subCount = page.length;

    return (
      <div
        key={pageIndex}
        className={styles.pageWrapper}
        style={{ display: "flex", width: "100%" }}
      >
        {page.map((card, i) => {
          const CardComp =
            CardConfig[card.type as keyof typeof CardConfig]?.component ??
            CardConfig.NormalCard.component;

          // width未指定なら均等割り
          const width = card.props?.width ?? `${100 / subCount}%`;

          return (
            <div
              key={i}
              style={{
                flex: `0 0 ${width}`,
                display: "flex",
              }}
              // className={styles.cardComp}
            >
              <CardComp
                content={card.content ?? ""}
                bg_color={card.props?.bg_color}
                font_color={card.props?.font_color}
                align={safeAlign(card.props?.align)}
                media={card.props?.media}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      {/* ===== Layout描画追加 ===== */}
      <LayoutComponent theme={layout.props?.theme} />
      {/* ========================== */}

      {/* ===== Cursor描画追加 ===== */}
      {activeCursor &&
        (() => {
          const config =
            CursorConfig[activeCursor as keyof typeof CursorConfig];
          if (!config) return null;
          const CursorComp = config.component;
          return <CursorComp />;
        })()}
      {/* ========================== */}

      {/* =========================
          描画切り替え
      ========================= */}
      {mode === "slide" ? (
        // スライドモード（1ページのみ表示）
        <div className={styles.cardWrapper}>
          <TransitionComponent key={index} trigger={index} duration={300}>
            {renderPage(currentPage)}
          </TransitionComponent>
        </div>
      ) : (
        // Webモード（全ページ縦表示）
        pages.map((page, i) => renderPage(page, i))
      )}

      {/* =========================
          ナビゲーション（スライド時のみ）
      ========================= */}
      {mode === "slide" && pages.length > 1 && (
        <Navigation
          onNext={handleNext}
          onPrev={handlePrev}
          onCursorChange={setActiveCursor}
          cursorOptions={metaCursorOptions}
        />
      )}
    </div>
  );
};