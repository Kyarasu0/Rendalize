# Rendalizeの構成について
Rendalizeには以下のようなファイルの種類が存在する
## src/Workspace/Components内
- Elements(マークダウンの各要素に対する解釈の仕方)
- Layout(背景や色合いを定義)
- Transition(スライドモードの)
- Cursor(Webモード及びスライドモードでのカーソルのレパートリー)
- Navigation(スライドモードにおいてのカーソル選択やページ遷移を操作できるリモコン部分)
- Titles(スライドモードにおいて、1スライドを表す左上に表示されるタイトル)
- MarkdownEngine(実際にマークダウンを解釈して表示する中枢プログラム)
## src/Workspace/Customs
ここには指定されたテンプレートがどのファイルにあるか(例: このLayout使いたいけどどこにある？)を示す案内役ファイルが配置されている
## src/Workspace/Utils
ここには文字列として受け取ったマークダウンファイルの中身の構造を理解してそれを返す関数が入っている

# RendalizeのRender手順について
以下のようなマークダウンファイルがあったとする
===
setting: SettingFile1
===
#+ これはタイトルです
- A
- B
- C
--- 
\MessageCard align=left
これはメッセージが表示されるカードです
===

1. src/Workspace/Utils/parseMarkdownでファイルの内容をcardやmetaに構造化
parseMarkdown(raw) = { 
    meta: {setting: SettingFile1},
    contents: [{
        cards: [{ type: ListCard, props: {align: center}, content: - A \n - B }, ...],
        pageTitle: {
            props: titleProps,
            content: titleContent
        }
    },
    ...
    ]
}