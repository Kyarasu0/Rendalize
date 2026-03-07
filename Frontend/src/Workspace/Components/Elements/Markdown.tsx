import type { ElementNode } from "../../Utils/runPipelines";
import { CardConfig } from "../../Customs/CardConfig";

interface SettingColor {
  [key: string]: string;
}

interface Props extends ElementNode {
  color?: SettingColor;
}

/**
 * マークダウン要素の描画コンポーネント
 * type: "markdown" の ElementNode を受け取って、
 * props.cardType に応じた適切なカードコンポーネントを選択して表示する
 */
export const Markdown = ({ props, content, color }: Props) => {
  // cardType を取得（デフォルトは NormalCard）
  const cardType = props?.cardType ?? "NormalCard";

  // CardConfig からコンポーネントを取得
  const config = CardConfig[cardType as keyof typeof CardConfig];
  const CardComponent = config?.component ?? CardConfig.NormalCard.component;

  // align を正規化
  const safeAlign = (value?: string): "left" | "center" | "right" => {
    if (value === "center" || value === "right") {
      return value;
    }
    return "left";
  };

  return (
    <CardComponent
      content={content ?? ""}
      bg_color={props?.bg_color}
      font_color={props?.font_color}
      align={safeAlign(props?.align)}
      color={color}
    />
  );
};
