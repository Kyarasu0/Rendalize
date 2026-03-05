import type { Parsed } from "../Utils/parseMarkdown";

/**
 * NormalCard 用の pipeline
 *
 * 役割
 * - props を安全な形に整形する
 * - 不正な値を除去する
 * - デフォルト値を補完する
 */
export const normalCardPipeline = (card: Parsed): Parsed => {

  // ====================================
  // NormalCard 以外は処理しない
  // ====================================
  if (card.type !== "NormalCard") return card;

  // props が undefined の可能性があるので空オブジェクトで補完
  const props = card.props ?? {};



  // ====================================
  // align の正規化
  // ====================================
  // 許可する値
  // left / center / right
  // それ以外は left にする

  let align: "left" | "center" | "right" = "left";

  if (props.align === "center" || props.align === "right") {
    align = props.align;
  }



  // ====================================
  // width の正規化
  // ====================================
  // Markdownでは
  //
  // width=50
  //
  // のように書けるようにする
  // → 50% に変換

  let width: string | undefined = props.width;
  if (width) {

    // 50 → 50%
    if (/^\d+$/.test(width)) {
      width = `${width}%`;
    }

    // 50% → そのまま
    else if (/^\d+%$/.test(width)) {
      width = width;
    }

    // 不正値 → 削除
    else {
      width = undefined;
    }

  }



  // ====================================
  // その他 props
  // ====================================
  // 指定されている場合のみ残す

  const bg_color = props.bg_color ?? undefined;
  const font_color = props.font_color ?? undefined;
  const media = props.media ?? undefined;



  // ====================================
  // props を整理して返す
  // ====================================

  const newProps: Record<string, string> = {
    ...props,
    align
  };

  // width が存在する場合のみ追加
  if (width) {
    newProps.width = width;
  }

  if (bg_color) {
    newProps.bg_color = bg_color;
  }

  if (font_color) {
    newProps.font_color = font_color;
  }

  if (media) {
    newProps.media = media;
  }



  // ====================================
  // 新しいカードを返す
  // ====================================

  return {
    ...card,
    props: newProps
  };

};