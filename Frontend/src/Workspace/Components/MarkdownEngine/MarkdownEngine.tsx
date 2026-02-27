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
  // カードを「順番付き配列」で保持する
  const [cards, setCards] = useState<Parsed[]>([]);
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
  // 現在有効なカーソル
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

        setCards(parsed.cards);
        setLayout({
          type: parsed.meta.layout.split(" ")[0],
          props: { theme: parsed.meta.layout.split(" ")[1] },
        });
        setTransition({ 
          type: parsed.meta.transition.split(" ")[0],
          props: { theme: parsed.meta.transition.split(" ")[1] },
        });
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
  }, [cards, index, mode]);

  // =========================
  // カード切り替え
  // =========================
  const handleNext = () => {
    if (index >= cards.length - 1) return;
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
  // 現在表示するカード
  // =========================
  const currentCard = cards[index];
  if (!currentCard) return null;
  
  const CardComponent = CardConfig[currentCard.type as keyof typeof CardConfig]?.component ?? CardConfig.MessageCard.component;
  const LayoutComponent = LayoutConfig[layout.type as keyof typeof LayoutConfig]?.component ?? LayoutConfig.Normal.component;
  const TransitionComponent = TransitionConfig[transition.type as keyof typeof TransitionConfig]?.component ?? TransitionConfig.Fade.component;

  return (
    <div className={styles.wrapper}>
      {/* ===== Layout描画追加 ===== */}
      <LayoutComponent theme={layout.props!.theme} />
      {/* ========================== */}

      {/* ===== Cursor描画追加 ===== */}
      {activeCursor && (() => {
        const config = CursorConfig[activeCursor as keyof typeof CursorConfig];
        if (!config) return null;
        const CursorComp = config.component;
        return <CursorComp />;
      })()}
      {/* ========================== */}

      {/* =========================
          描画切り替え
      ========================= */}
      {mode === "slide" ? (

        // スライドモード
        <div className={styles.cardWrapper}>
          <TransitionComponent key={index} trigger={index} duration={300}>
            
            {CardComponent ? (
              <CardComponent
                content={currentCard.content ?? ""}
                {...(currentCard.props ?? {})}
              />
            ) : null}
          </TransitionComponent>
        </div>

      ) : (

        // Webモード（全部表示）
        cards.map((card, i) => {
          const CardComp =
            CardConfig[card.type as keyof typeof CardConfig]?.component
            ?? CardConfig.MessageCard.component;

          return (
            <CardComp
              key={i}
              content={card.content ?? ""}
              {...(card.props ?? {})}
            />
          );
        })
      )}

      {/* =========================
          ナビゲーション（スライド時のみ）
      ========================= */}
      {mode === "slide" && cards.length > 1 && (
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