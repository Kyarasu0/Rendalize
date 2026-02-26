import { useEffect, useState } from "react";
import { parseMarkdown } from "../../Utils/parseMarkdown";
import styles from "./MarkdownEngine.module.css";
import type { Parsed } from "../../Utils/parseMarkdown";
// Cardの種類のimport
import { MessageCard } from "../Cards/MessageCard/MessageCard";
// Layoutの種類のimport(Layout, import, layoutRegistry)
import { Normal } from "../Layouts/Normal/Normal";
import { Aurora } from "../Layouts/Aurora/Aurora";
// Navigationの種類のimport
import { Navigation } from "../Navigation/Navigation";
// Transitionの種類のimport
import { Fade } from "../Transitions/Fade/Fade";

interface Props {
  url: string;
  mode: "slide" | "web";
}

export const MarkdownEngine = ({ url, mode }: Props) => {
  // ========== Card ==========
  // Markdownの \CardName と一致させる
  const cardRegistry: Record<string, React.ComponentType<any>> = {
    MessageCard,
  };
  // カードを「順番付き配列」で保持する
  const [cards, setCards] = useState<Parsed[]>([]);
  // ==========================

  // ========== Layout ===========
  const layoutRegistry: Record<string, React.ComponentType<any>> = {
    Normal,
    Aurora,
  };
  const [layout, setLayout] = useState<Parsed>({
    type: "Normal",
    props: { theme: "dark" },
  });
  // =============================

  // ========== Transition ===========
  const transitionRegistry: Record<string, React.ComponentType<any>> = {
    Fade,
    // slideやzoomなど将来追加可能
  };
  const [transition, setTransition] = useState<Parsed>({ type: "Fade" });
  // =================================

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

  // =========================
  // 現在表示するカード
  // =========================
  const currentCard = cards[index];
  const LayoutComponent = layoutRegistry[layout.type] ?? Normal;
  const CardComponent = currentCard ? cardRegistry[currentCard.type] ?? MessageCard : null;
  const TransitionComponent = transitionRegistry[transition.type] ?? Fade;

  return (
    <div className={styles.wrapper}>
      <LayoutComponent theme={layout.props!.theme} />

      {/* =========================
          描画切り替え
      ========================= */}
      {mode === "slide" ? (

        // スライドモード
        <div className={styles.cardWrapper}>
          <TransitionComponent key={index} trigger={index} duration={300}>
            
            {CardComponent ? (
              <CardComponent
                content={currentCard.content}
                {...(currentCard.props ?? {})}
              />
            ) : null}
          </TransitionComponent>
        </div>

      ) : (

        // Webモード（全部表示）
        cards.map((card, i) => {
          const CardComp = cardRegistry[card.type] ?? MessageCard;
          return (
            <CardComp
              key={i}
              content={card.content}
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
        />
      )}
    </div>
  );
};