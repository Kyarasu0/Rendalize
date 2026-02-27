import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  MousePointer2, 
  X, 
  Type, 
  Crosshair,
  Image as ImageIcon
} from "lucide-react";

// カーソルの設定モック
const CursorConfig = {
  pointer: { label: "Pointer", icon: <MousePointer2 size={16} /> },
  crosshair: { label: "Crosshair", icon: <Crosshair size={16} /> },
  text: { label: "Text", icon: <Type size={16} /> },
};

// ナビゲーションコンポーネント
const Navigation = ({ onNext, onPrev, onCursorChange, cursorOptions }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCursor, setActiveCursor] = useState(null);

  const handleSelect = (type) => {
    const newCursor = type === "none" ? null : type;
    setActiveCursor(newCursor);
    onCursorChange(newCursor);
  };

  return (
    <div 
      className="fixed top-6 right-6 flex items-center p-1.5 bg-white/10 backdrop-blur-md border border-white/30 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] text-white drop-shadow-sm transition-all duration-500 ease-in-out z-50 hover:bg-white/20"
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* 戻る・次へボタン */}
      <div className="flex items-center gap-1">
        <button 
          onClick={onPrev}
          className="p-2.5 rounded-full hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={onNext}
          className="p-2.5 rounded-full hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* 区切り線 */}
      <div className="w-px h-6 bg-white/30 mx-2 rounded-full"></div>

      {/* カーソル設定エリア（伸縮する部分） */}
      <div 
        className="flex items-center"
        onMouseEnter={() => setIsExpanded(true)}
      >
        <button 
          className={`p-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${
            isExpanded ? "bg-white/20" : "hover:bg-white/20 hover:scale-110"
          }`}
          title="Cursor settings"
        >
          {activeCursor && CursorConfig[activeCursor] ? (
            CursorConfig[activeCursor].icon
          ) : (
            <MousePointer2 size={20} />
          )}
        </button>

        {/* 展開されるメニュー */}
        <div 
          className={`flex items-center gap-1 overflow-hidden transition-all duration-500 ease-out origin-left ${
            isExpanded ? "max-w-[400px] opacity-100 ml-1 translate-x-0" : "max-w-0 opacity-0 ml-0 -translate-x-4"
          }`}
        >
          {cursorOptions.map((key) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300 active:scale-95 ${
                activeCursor === key 
                  ? "bg-white/40 shadow-inner" 
                  : "hover:bg-white/20"
              }`}
            >
              {CursorConfig[key].icon}
              {CursorConfig[key].label}
            </button>
          ))}
          
          <button
            onClick={() => handleSelect("none")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300 active:scale-95 ${
              activeCursor === null 
                ? "bg-white/40 shadow-inner" 
                : "hover:bg-white/20"
            }`}
          >
            <X size={16} />
            None
          </button>
        </div>
      </div>
    </div>
  );
};


// プレビュー・テスト用のメインアプリケーション
export default function App() {
  const [bgClass, setBgClass] = useState("bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500");
  const [cursor, setCursor] = useState("default");

  const backgrounds = [
    { label: "カラフル", value: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" },
    { label: "真っ白", value: "bg-white" },
    { label: "真っ黒", value: "bg-gray-900" },
    { label: "明るい写真風", value: "bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop')] bg-cover bg-center" },
    { label: "暗い写真風", value: "bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop')] bg-cover bg-center" },
  ];

  const handleCursorChange = (newCursor) => {
    switch(newCursor) {
      case "pointer": setCursor("pointer"); break;
      case "crosshair": setCursor("crosshair"); break;
      case "text": setCursor("text"); break;
      default: setCursor("default"); break;
    }
  };

  return (
    <div 
      className={`min-h-screen w-full transition-all duration-700 ease-in-out flex flex-col items-center justify-center ${bgClass}`}
      style={{ cursor: cursor }}
    >
      <Navigation 
        onNext={() => console.log("Next clicked")}
        onPrev={() => console.log("Prev clicked")}
        onCursorChange={handleCursorChange}
        cursorOptions={["pointer", "crosshair", "text"]}
      />

      {/* テスト用の背景切り替えパネル（画面中央） */}
      <div className="p-8 rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl text-center max-w-lg mx-auto transform transition-all">
        <h1 className="text-3xl font-bold text-white drop-shadow-md mb-6 tracking-wide">
          Glassmorphism UI
        </h1>
        <p className="text-white/90 drop-shadow-sm mb-8 text-sm">
          右上の操作パネルにマウスを乗せると、スムーズに横に伸びてメニューが展開します。背景色を変えても視認性が保たれるかテストできます。
        </p>
        
        <div className="flex flex-wrap justify-center gap-3">
          {backgrounds.map((bg) => (
            <button
              key={bg.label}
              onClick={() => setBgClass(bg.value)}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 drop-shadow-sm text-sm font-medium"
            >
              <ImageIcon size={16} />
              {bg.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}