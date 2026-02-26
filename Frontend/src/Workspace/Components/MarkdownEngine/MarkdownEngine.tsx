import { useEffect, useState } from "react";
import { parseMarkdown } from "../../Utils/parseMarkdown";
import styles from "./MarkdownEngine.module.css";
// Cardの種類のimport
import type { ParsedCard } from "../../Utils/parseMarkdown";
import { MessageCard } from "../Cards/MessageCard/MessageCard";
// Layoutの種類のimport(Layout, import, layoutRegistry)
import type { ParsedLayout } from "../../Utils/parseMarkdown";
import { Normal } from "../Layouts/Normal/Normal";
import { Aurora } from "../Layouts/Aurora/Aurora";
// Navigationの種類のimport
import { Navigation } from "../Navigation/Navigation";

interface Props {
  url: string;
  mode: "slide" | "web";
}

export const MarkdownEngine = ({ url, mode }: Props) => {
  // ========== Card ==========
  // Markdownの \CardName と一致させる
  const cardRegistry: Record<
    string,
    React.ComponentType<any>
  > = {
    MessageCard,
    // HeroCard,
    // QuoteCard,
  };
  // カードを「順番付き配列」で保持する
  // [{ type: "MessageCard", content: "..." }, ...]
  const [cards, setCards] = useState<ParsedCard[]>([]);

  // ========== Layout ===========
  // Markdownの \CardName と一致させる
  const layoutRegistry: Record<
    string,
    React.ComponentType<any>
  > = {
    Normal,
    Aurora
  };
  const [layout, setLayout] = useState<ParsedLayout>({ type: "Normal", props: "dark" });

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

        // cards は配列なのでそのままセットできる
        setCards(parsed.cards);
        setLayout({ type: parsed.meta.layout.split(' ')[0], props: parsed.meta.layout.split(' ')[1] });

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

      if (e.key === "ArrowRight") {
        setIndex(i => Math.min(i + 1, cards.length - 1));
      }

      if (e.key === "ArrowLeft") {
        // ← ここ前はバグってた（-0になってた）
        setIndex(i => Math.max(i - 1, 0));
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [cards, mode]);

  // =========================
  // 現在表示するカード
  // =========================
  const currentCard = cards[index];
  const LayoutComponent = layoutRegistry[layout.type] ?? Normal;

  return (
    <div className={styles.wrapper}>
      <LayoutComponent theme={layout.props}/>

      {/* =========================
          描画切り替え
      ========================= */}
      {mode === "slide" ? (

        // スライドモード
        currentCard ? (() => {
          // type に対応するコンポーネントを取得
          // 存在しなければ MessageCard を使う
          const CardComponent = cardRegistry[currentCard.type] ?? MessageCard;

          // ...obj = key1={obj.key1} key2={obj.key2} 
          return (
            <CardComponent
              content={currentCard.content}
              {...(currentCard.props ?? {})}
            />
          );
        })() : null

      ) : (

        // Webモード（全部表示）
        cards.map((card, i) => {
          const CardComponent = cardRegistry[card.type] ?? MessageCard;

          return (
            <CardComponent
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
          onNext={() =>
            setIndex(i => Math.min(i + 1, cards.length - 1))
          }
          onPrev={() =>
            setIndex(i => Math.max(i - 1, 0))
          }
        />
      )}
    </div>
  );
};