// Markdownをカード単位に分割する簡易パーサ
export interface Parsed {
    type: string;
    props?: Record<string, string>;
    content?: string;
}

export interface ParsedMarkdown {
    meta: Record<string, string>;
    pages: Parsed[][];
}

export const parseMarkdown = (raw: string): ParsedMarkdown => {

    // =============================
    // "===" でページとして区切る
    // =============================
    const pageSections = raw.split('===').map(p => p.trim()).filter(Boolean);

    let meta: Record<string, string> = {};
    let pages: Parsed[][] = [];

    pageSections.forEach((page, pageIndex) => {

        // =============================
        // "---" でサブカードとして区切る
        // =============================
        const sections = page.split('---').map(s => s.trim()).filter(Boolean);

        // 最初のページの最初のセクションをmetaとして扱う
        if (pageIndex === 0) {
            const possibleMeta = sections[0]
                .split('\n')
                .map(l => l.trim())
                .filter(Boolean);

            if (possibleMeta.every(l => l.includes(':'))) {
                possibleMeta.forEach(line => {
                    const [key, value] = line.split(':');
                    if (key && value) meta[key.trim()] = value.trim();
                });

                // meta部分を除去
                sections.shift();
            }
        }

        const subCards: Parsed[] = [];

        sections.forEach(section => {

            const lines = section.split('\n').map(l => l.trim()).filter(Boolean);

            let type = "MessageCard"; // デフォルト
            let props: Record<string, string> = {};
            let contentStart = 0;

            // Cardタイプの選別
            if (lines[0]?.startsWith('\\')) {
                const parts = lines[0].slice(1).trim().split(/\s+/);
                type = parts[0];
                const args = parts.slice(1);

                // 引数処理
                args.forEach(arg => {
                    const [key, value] = arg.split('=');
                    if (value !== undefined) {
                        props[key] = value;
                    } else {
                        props["align"] = key;
                    }
                });

                contentStart = 1;
            }

            subCards.push({
                type,
                props,
                content: lines.slice(contentStart).join('\n')
            });
        });

        if (subCards.length > 0) {
            pages.push(subCards);
        }
    });

    return { meta, pages };
};