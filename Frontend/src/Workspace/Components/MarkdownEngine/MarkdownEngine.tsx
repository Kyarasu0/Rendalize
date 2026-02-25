import { useEffect, useState } from "react";
import { parseMarkdown } from "../../Utils/parseMarkdown";
import { Card } from "../Card/Card";
import { Layout } from "../Layout/Layout";
import { Navigation } from "../Navigation/Navigation";
import styles from "./MarkdownEngine.module.css";

// Propsとしての定義
interface Props {
  url: string;
  mode: "slide" | "web";
}

export const MarkdownEngine = ({ url, mode }: Props) => {
    // カード配列
    const [cards, setCards] = useState<string[]>([]);
    // ページ番号
    const [index, setIndex] = useState(0);

    // URLからParamを取得し、parseMarkdownに受け渡し
    useEffect(() => {
    fetch(url)
        .then(res => res.text())
        .then(raw => {
        const parsed = parseMarkdown(raw);
        setCards(parsed.cards);
        });
    }, [url]);

    // キーボード操作
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") setIndex(i => Math.min(i + 1, cards.length - 1));
            if (e.key === "ArrowLeft") setIndex(i => Math.max(i - 1, 0));
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [cards.length]);

    return (
    <div className={styles.wrapper}>
        <Layout theme="dark" />

        {mode === "slide" ? (
            <Card content={cards[index]} />
        ) : (
            cards.map((c, i) => <Card key={i} content={c} />)
        )}

        {mode === "slide" && (
            <Navigation
                onNext={() => setIndex(i => Math.min(i + 1, cards.length - 1))}
                onPrev={() => setIndex(i => Math.max(i - 1, 0))}
            />
        )}
    </div>
    );
};