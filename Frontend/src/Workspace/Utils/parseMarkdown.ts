// Markdownをカード単位に分割する簡易パーサ
export interface ParsedCard {
    type: string;
    props?: Record<string, string>;
    content: string;
}

export interface ParsedMarkdown {
    meta: Record<string, string>;
    cards: ParsedCard[];
}

export const parseMarkdown = (raw: string): ParsedMarkdown => {
    // "---"でカードとして区切って無効な要素を潰す
    const sections = raw.split('---').map(s => s.trim()).filter(Boolean);

    let meta: Record<string, string> = {};
    let cards: ParsedCard[] = [];

    sections.forEach((section, idx) => {
        // "\n"でカードとして区切って無効な要素を潰す
        const lines = section.split('\n').map(l => l.trim()).filter(Boolean);

        // 最初のセクションかつ全行が":"を含んでいるかを検査
        if (idx === 0 && lines.every(l => l.includes(':'))) {
            lines.forEach(line => {
                const [key, value] = line.split(':');
                if (key && value) meta[key.trim()] = value.trim();
            });
        } else {
            // カード名が \CardName 形式で書かれているか確認
            let type = "MessageCard"; // デフォルト名
            let props: Record<string, string> = {};
            let contentStart = 0;

            if (lines[0].startsWith('\\')) {
                const parts = lines[0].slice(1).trim().split(/\s+/);

                // カードの種類チェック
                type = parts[0];
                const args = parts.slice(1);

                // カードの引数チェック
                if (args.length > 0) {
                    args.forEach(arg => {
                        const [key, value] = arg.split('=');

                        if (value !== undefined) {
                            props[key] = value;
                        } else {
                            props["align"] = key;
                        }
                    });
                }
                contentStart = 1;
            }

            cards.push({
                type,
                props,
                content: lines.slice(contentStart).join('\n')
            });
        }
    });

    return { meta, cards };
};