// \ListCardのような形式をバラすための構造体
export interface Parsed {
    type: string;
    props?: Record<string, string>;
    content?: string;
    settings?: string;
}

// マークダウンを構造分析するための構造体
export interface ParsedMarkdown {
    meta: Record<string, string>;
    pages: Parsed[][];
    pageTitles?: Parsed[]; // 追加
}
// ==========================================================
//         parseMarkdown(マークダウンファイルの内容)
// ==========================================================
export const parseMarkdown = (raw: string): ParsedMarkdown => {

    // =============================================
    // "===" でページとして区切る(MainCardを配列化)
    // =============================================
    const mainCardContens = raw.split('===').map(p => p.trim()).filter(Boolean);

    let meta: Record<string, string> = {};
    let pages: Parsed[][] = [];
    let pageTitles: Parsed[] = []; // 追加

    mainCardContens.forEach((page, pageIndex) => {

        // =============================
        // "> title align=left" 検出
        // =============================
        let titleType: string = "NormalTitle";
        let titleContent: string | null = null;
        let titleProps: Record<string, string> = {};

        const pageLines = page.split('\n').map(l => l.trim());
        // タイトル行を検出した場合、その行をページから除外する
        let pageContent = page;

        if (pageLines[0]?.startsWith('>')) {
            const rawTitle = pageLines[0].slice(1).trim();
            const parts = rawTitle.split(/\s+/);

            titleType = parts[0] || "NormalTitle"; // デフォルト
            let content = "";

            parts.slice(1).forEach(p => {
                if (p.includes("=")) {
                const [key, value] = p.split("=");
                titleProps[key] = value;
                } else {
                content += (content ? " " : "") + p;
                }
            });

            // contents キーが指定されている場合、それを titleContent として使用
            // ダブルクォートを除去
            if (titleProps.contents) {
                titleContent = titleProps.contents.replace(/^"|"$/g, '');
            } else {
                // contents キーがない場合は、引数後のテキストを使用
                titleContent = content;
            }
            // タイトル行をページコンテンツから除外する
            pageContent = pageLines.slice(1).join('\n');
        }

        // =============================
        // "---" でサブカードとして区切る
        // =============================
        const sections = pageContent.split('---').map(s => s.trim()).filter(Boolean);

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
            // 追加
            pageTitles.push({
                type: titleType,
                props: { ...titleProps, align: titleProps.align || "left" },
                content: titleContent ?? "",
            });
        }
    });


    return { meta, pages, pageTitles };
};