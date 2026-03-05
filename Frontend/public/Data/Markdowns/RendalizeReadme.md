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

1. 構造化
src/Workspace/Utils/parseMarkdownでファイルの内容をcardやmetaに構造化
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
2. Setting読み込み
Settingファイルを読み込むことによってパイプラインの配置と文字の大きさや色の情報を把握する
public/Data/RenderSettings/内のtsファイルには文字の大きさやパイプラインの配置、色合いなどの以下項目が乗っている
色合いの組み合わせはpublic/Data/Colors内のtsファイルに乗っている(red: #...みたいなもの)
- Layout(背景や色合いを定義)
- Transition(スライドモードの)
- Cursor(Webモード及びスライドモードでのカーソルのレパートリー)
- Titles(スライドモードにおいて、1スライドを表す左上に表示されるタイトル)
パイプラインとはparseMarkdown(raw)を描画の解釈をしながら通すものを指す(例えばパイプライン1ではリストを検知して予め用意したList.tsxにそって表示するといったような処理)
3. 実際にパイプラインを通して変換、描画

# プロンプトメモ
## パイプラインの概念について
パイプラインなのですがなぜパイプラインと言うかと言うと
まず# , ## , ### から始まるものを見つけて.tsxに従って文字の大きさやデザイン、padding操作をする。
次に- を見つけたら別のtsxに従ってリストのデザインやアニメーションを描画する...
みたいに1パイプラインが1種類のマークダウンをそれぞれ変化するようにし、その組み合わせをSettingsで指定するという感じのことがしたい(それを以下パイプラインの配置という)

# ファイル関係について
MarkdownEngineがマークダウンファイルとそのmetaのsettingファイルを読む。
