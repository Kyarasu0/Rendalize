import type { ElementNode } from "../../Utils/runPipelines";

interface TimelineEvent {
  year: string;
  label: string;
  color?: string;
}

interface Props extends ElementNode {
  color?: Record<string, string>;
}

/**
 * タイムライン要素の描画コンポーネント
 * type: "timeline" の ElementNode を受け取ってタイムライン形式で表示する
 */
export const TimelineElement = ({ props, content }: Props) => {
  // content を JSON パースして events 配列に変換
  let events: TimelineEvent[] = [];
  try {
    events = JSON.parse(content);
  } catch (e) {
    console.warn("Timeline JSON parse failed:", e);
  }

  const bg_color = props?.bg_color ?? "rgba(255,255,255,0.03)";

  return (
    <div style={{
      backgroundColor: bg_color,
      padding: '2rem',
      borderRadius: '8px'
    }}>
      <div style={{
        position: 'relative',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        {/* タイムラインの縦線 */}
        <div style={{
          position: 'absolute',
          left: '20px',
          top: '0',
          bottom: '0',
          width: '2px',
          backgroundColor: 'rgba(255,255,255,0.3)'
        }} />

        {events.map((item, i) => {
          const dotColor = item.color || "#3b82f6";

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '2rem',
                position: 'relative'
              }}
            >
              {/* ドット */}
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: dotColor,
                  marginRight: '1rem',
                  flexShrink: 0,
                  zIndex: 1
                }}
              />

              {/* コンテンツ */}
              <div>
                <div
                  style={{
                    color: dotColor,
                    fontWeight: 'bold',
                    marginBottom: '0.25rem'
                  }}
                >
                  {item.year}
                </div>
                <div style={{ color: 'inherit' }}>
                  {item.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};