// Markdownをカード単位に分割する簡易パーサ
export interface ParsedMarkdown {
    meta: Record<string, string>;
    cards: string[];
}

export const parseMarkdown = (raw: string): ParsedMarkdown => {
    // "---"でカードとして区切って無効な要素を潰す
    const sections = raw.split('---').map(s => s.trim()).filter(Boolean);

    let meta: Record<string, string> = {};
    let cards: string[] = [];

    // 最初がメタ情報かどうか判定
    if (sections[0].includes(':')) {
            sections[0].split('\n').forEach(line => {
                // キーと値に分解
                const [key, value] = line.split(':');
                // オブジェクトとして登録し直す
                if (key && value) meta[key.trim()] = value.trim();
            });
            // 最初の1セクション以外はすべてそれぞれカードに入れる
            cards = sections.slice(1);
        } else {
            // 何もなければすべてのページをそれぞれカードに入れる
            cards = sections;
        }

    return { meta, cards };
};