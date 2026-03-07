// \ListCardのような形式をバラすための構造体
export interface Parsed {
    type?: string | null;
    props?: Record<string, string>;
    content?: string | null;
    setting?: Record<string, string>;
}

export interface MainParsed {
    cards: Parsed[];
    pageTitle?: Parsed;
}

// マークダウンを構造分析するための構造体
export interface ParsedMarkdown {
    meta: Record<string, string>;
    contents: MainParsed[];
}

// ==========================================================
//         parseMarkdown(マークダウンファイルの内容)
// ==========================================================
export const parseMarkdown = (raw: string): ParsedMarkdown => {
    console.log("マークダウンの中身: ", raw);

    // =============================================
    // "===" でページとして区切る(MainCardを配列化)
    // =============================================
    const mainCardContents = raw.split('===').map(p => p.trim()).filter(Boolean);

    let meta: Record<string, string> = {};
    let mainParsedContents: MainParsed[] = [];

    mainCardContents.forEach((page) => {

        // 1ページをまとめる配列を用意
        let subCardArray: Parsed[] = [];

        // =============================
        // "#+ title" 検出
        // =============================
        let titleContent: string | null = null;
        let titleProps: Record<string, string> = {};
        // 1ページずつの各行をばらす
        const mainCardLines = page.split('\n').map(l => l.trim()).filter(Boolean);
        // タイトル行を除外したmainCardLineの配列
        let pageContentArray: string[] = [];
        let pageContent: string = "";

        mainCardLines.forEach((line)=>{
            // 最初に"#+ "から始まる行を検出
            if (line.startsWith('#+ ')) {
                // "#+"の記号と前後の空白を削除
                const rawTitle = line.slice(2).trim();
                // タイトル内容と引数部分取得 ["Title", "align=left", ...]
                const parts = rawTitle.split(/\s+/);

                // 内容の初期値
                let content = "";

                // 引数部分のみ取得
                parts.forEach(p => {
                    if (p.includes("=")) {
                        // "="で区切ってObjに分解
                        const [key, value] = p.split("=");
                        titleProps[key] = value;
                    } else {
                        // すでに文字があれば空白を足して追加(content = "Hello" + (" " + "World"))
                        // 文字が何も無ければ空白を足さずに追加(content = "" + ("" + "Hello"))
                        content += (content ? " " : "") + p;
                    }
                });

                // titleContentにcontent部分を代入
                titleContent = content;
            } else pageContentArray.push(line);
        })
        // titleContent: stringにはタイトルの内容
        // titleProps: {key: string, value: string}にはタイトルの引数
        // pageContent: stringにはタイトルを省いた部分全部
        pageContent = pageContentArray.join('\n');
        console.log("タイトル以外の内容: ", pageContent);

        // =============================
        //         meta情報を分解
        // =============================
        // meta情報(書いている内容がすべて:を含んでいる)をObj化
        if (mainCardLines.every(l => l.includes(':'))) {
            mainCardLines.forEach(line => {
                const [key, value] = line.split(':');
                if (key && value) meta[key.trim()] = value.trim();
            });

            // meta部分をスキップ
            return;
        }

        // =============================
        // "---" でサブカードとして区切る
        // =============================
        const subCardContents = pageContent.split('---').map(s => s.trim()).filter(Boolean);

        subCardContents.forEach(section => {

            // 1ページずつの各行をばらす
            const subCardLines = section.split('\n').map(l => l.trim()).filter(Boolean);
            let command: string | null = null;
            let commandProps: Record<string, string> = {};
            // タイトル行を除外したsubCardLineの配列
            let cardContentArray: string[] = [];
            let cardContent: string = "";

            // =============================
            // "\ListCard" 検出
            // =============================
            subCardLines.forEach((line)=>{
                // 最初に"\"から始まる行を検出
                if (line.startsWith('\\')) {
                    // "\"の記号と前後の空白を削除
                    const rawCommand = line.slice(1).trim();
                    // タイトル内容と引数部分取得 ["ListCard", "align=left", ...]
                    const parts = rawCommand.split(/\s+/);

                    // 内容の初期値
                    let content = "";

                    // 引数部分のみ取得
                    parts.forEach(p => {
                        if (p.includes("=")) {
                            // "="で区切ってObjに分解
                            const [key, value] = p.split("=");
                            commandProps[key] = value;
                        } else {
                            // すでに文字があれば空白を足して追加(content = "Hello" + (" " + "World"))
                            // 文字が何も無ければ空白を足さずに追加(content = "" + ("" + "Hello"))
                            content += (content ? " " : "") + p;
                        }
                    });

                    // commandにcontent部分を代入
                    command = content;
                } else cardContentArray.push(line);
            })
            // command: stringにはカード選択コマンドの内容
            // commandProps: {key: string, value: string}にはカード選択コマンドの引数
            // cardContent: stringにはカード選択コマンドを省いた部分全部
            cardContent = cardContentArray.join('\n');

            // subCardを解析したところでsubCardArrayに追加
            subCardArray.push({ type: command, props: commandProps, content: cardContent });
        });
        // subカード内容とタイトルをまとめてpush
        mainParsedContents.push({
            cards: subCardArray,
            pageTitle: {
                props: titleProps,
                content: titleContent
            }
        });
    });
    return { meta, contents: mainParsedContents };
};