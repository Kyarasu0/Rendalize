import type { Pipeline, ElementNode } from "../Utils/runPipelines";

/**
 * Card マークダウン要素の検出・変換パイプライン
 *
 * 役割
 * - \CardType のような記法を検出する
 * - props を安全な形に整形する
 * - 不正な値を除去する
 * - デフォルト値を補完する
 */
export const cardPipeline: Pipeline = ({ content }) => {

  // カード記法が無い場合は、コンテンツの内容によって適切な要素タイプを決定
  // \ListCard align=left のような形式を探す
  const cardMatch = content.match(/^\\(\w+)(?:\s+(.*))?$/m);

  if (!cardMatch) {
    // カード記法が無い場合、コンテンツの内容で判定
    if (content.trim().startsWith('#')) {
      // # で始まる場合はタイトル要素
      return [
        {
          type: "title",
          content
        }
      ];
    } else if (content.trim().startsWith('- ')) {
      // - で始まる場合はリスト要素
      return [
        {
          type: "list",
          content
        }
      ];
    } else {
      // それ以外は通常要素
      return [
        {
          type: "normal",
          content
        }
      ];
    }
  }

  const cardType = cardMatch[1];
  const argsStr = cardMatch[2] ?? "";

  // args を パース: align=left bg_color=#fff みたいなのを {align: "left", bg_color: "#fff"} に
  const props: Record<string, string> = {};
  const argParts = argsStr.split(/\s+/);

  argParts.forEach((part: string) => {
    if (part.includes("=")) {
      const [key, value] = part.split("=");
      if (key && value) {
        props[key] = value;
      }
    }
  });

  // ====================================
  // align の正規化
  // ====================================
  let align: "left" | "center" | "right" = "left";
  if (props.align === "center" || props.align === "right") {
    align = props.align;
  }

  // ====================================
  // width の正規化
  // ====================================
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
  const bg_color = props.bg_color ?? undefined;
  const font_color = props.font_color ?? undefined;
  const media = props.media ?? undefined;

  // ====================================
  // props を整理
  // ====================================
  const normalizedProps: Record<string, string> = {
    ...props,
    align
  };

  if (width) {
    normalizedProps.width = width;
  }

  if (bg_color) {
    normalizedProps.bg_color = bg_color;
  }

  if (font_color) {
    normalizedProps.font_color = font_color;
  }

  if (media) {
    normalizedProps.media = media;
  }

  // ====================================
  // カードタイプを要素タイプにマッピング
  // ====================================
  let elementType: string;
  switch (cardType.toLowerCase()) {
    case 'listcard':
      elementType = 'list';
      break;
    case 'titlecard':
      elementType = 'title';
      break;
    case 'normalcard':
      elementType = 'normal';
      break;
    case 'stackcard':
      elementType = 'stack';
      break;
    case 'timelinecard':
      elementType = 'timeline';
      break;
    case 'stepcirclecard':
      elementType = 'stepcircle';
      break;
    case 'projectslistcard':
      elementType = 'projects';
      break;
    default:
      elementType = 'normal'; // デフォルトは通常要素
  }

  // ====================================
  // ElementNode として返す
  // ====================================
  // カード記法より後の内容が要素の中身
  const elementContent = content.slice(cardMatch[0].length).trim();

  const result: ElementNode = {
    type: elementType,
    props: normalizedProps,
    content: elementContent
  };

  return [result];

};