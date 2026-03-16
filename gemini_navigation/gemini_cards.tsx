import React from 'react';
import { 
  ArrowRight, 
  Circle, 
  Layers, 
  Image as ImageIcon, 
  CheckCircle2, 
  Activity, 
  Layout, 
  FlipHorizontal 
} from 'lucide-react';

/**
 * ==========================================
 * SHARED UTILS / STYLES (Inline for Preview)
 * ==========================================
 */
const glassStyle = (bgColor = 'rgba(255, 255, 255, 0.1)') => ({
  background: bgColor === 'none' ? 'transparent' : bgColor,
  backdropFilter: bgColor === 'none' ? 'none' : 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: bgColor === 'none' ? 'none' : 'blur(20px) saturate(180%)',
  border: bgColor === 'none' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '24px',
  boxShadow: bgColor === 'none' ? 'none' : '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.4s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.4s ease',
});

/**
 * 1. Animated List Card
 * ホバー時にリストアイテムが少し右に動き、背景が光る。
 */
export const ListCard = ({ items = ["Feature One", "Feature Two", "Feature Three"], title = "Key Features" }) => {
  return (
    <div style={glassStyle('rgba(255, 255, 255, 0.05)')} className="p-8 group hover:scale-[1.02] cursor-default">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Layers className="w-5 h-5 text-blue-400" /> {title}
      </h3>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-3 transition-all duration-300 hover:translate-x-3 text-gray-200">
            <ArrowRight className="w-4 h-4 text-blue-500" />
            <span className="text-lg">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * 2. Media Card (Photo + Content)
 * 写真とテキストを美しく統合。Apple風のBentoスタイル。
 */
export const MediaCard = ({ imageUrl, title, description }) => {
  return (
    <div style={glassStyle('rgba(255, 255, 255, 0.08)')} className="overflow-hidden flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
      </div>
    </div>
  );
};

/**
 * 3. Timeline Card
 * 時系列を垂直に美しく表現。
 */
export const TimelineCard = ({ events = [] }) => {
  const defaultEvents = [
    { year: '2023', label: 'Concept Design' },
    { year: '2024', label: 'Beta Release' },
    { year: '2025', label: 'Global Scale' }
  ];
  const data = events.length ? events : defaultEvents;

  return (
    <div style={glassStyle('rgba(255, 255, 255, 0.03)')} className="p-8">
      <div className="relative space-y-8 before:absolute before:inset-0 before:left-[11px] before:w-0.5 before:bg-white/10 before:h-full">
        {data.map((item, i) => (
          <div key={i} className="relative pl-10 group">
            <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-600 border-4 border-slate-900 z-10 group-hover:scale-125 transition-transform" />
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">{item.year}</span>
            <p className="text-lg font-medium text-white">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 4. Data / Graph Card (Simplified Line Chart SVG)
 * 折れ線グラフをクリーンに表現。
 */
export const LineGraphCard = ({ title = "Growth Metrics" }) => {
  return (
    <div style={glassStyle('rgba(255, 255, 255, 0.05)')} className="p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-emerald-400" /> {title}
      </h3>
      <div className="flex-1 min-h-[150px] relative">
        <svg viewBox="0 0 100 40" className="w-full h-full drop-shadow-lg">
          <path 
            d="M0 35 Q 20 30, 30 15 T 60 10 T 100 5" 
            fill="none" 
            stroke="url(#grad)" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

/**
 * 5. Multi-Stack Card
 * Subカードの中にさらに縦に並ぶミニカード。
 */
export const StackCard = ({ cards = ["Option A", "Option B"] }) => {
  return (
    <div className="space-y-4 p-2">
      {cards.map((text, i) => (
        <div 
          key={i} 
          style={glassStyle('rgba(255, 255, 255, 0.12)')} 
          className="p-5 hover:bg-white/15 transition-colors cursor-pointer"
        >
          <p className="text-sm font-medium text-white/90">{text}</p>
        </div>
      ))}
    </div>
  );
};

/**
 * 6. Circle Steps Card
 * 番号とアイコン付きの大きな円。
 */
export const StepCircleCard = ({ steps = [{num: 1, icon: CheckCircle2, text: 'Plan'}] }) => {
  return (
    <div className="flex justify-around items-center p-8 gap-4">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center gap-3 group">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-blue-600 transition-all duration-500">
             {/* Dynamic Icon execution */}
             {React.createElement(step.icon || Circle, { className: "w-8 h-8 text-white" })}
          </div>
          <span className="text-sm font-bold text-gray-300">{step.text}</span>
        </div>
      ))}
    </div>
  );
};

/**
 * 7. Flip Card
 * 裏表が回転するカード。
 */
export const FlipCard = ({ front, back }) => {
  return (
    <div className="relative w-full h-[250px] group [perspective:1000px]">
      <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div 
          style={glassStyle('rgba(30, 41, 59, 0.8)')} 
          className="absolute inset-0 [backface-visibility:hidden] flex flex-col items-center justify-center p-6 text-center"
        >
          <FlipHorizontal className="w-8 h-8 mb-4 text-blue-400" />
          <h3 className="text-xl font-bold">{front || "Hover to Flip"}</h3>
        </div>
        {/* Back */}
        <div 
          style={glassStyle('rgba(59, 130, 246, 0.8)')} 
          className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center p-6 text-center bg-blue-600"
        >
          <p className="text-white text-lg font-medium">{back || "This is the back side content."}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * ==========================================
 * MAIN LANDING PAGE COMPONENT (App)
 * ==========================================
 */
export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans selection:bg-blue-500/30">
      {/* Header Area */}
      <header className="max-w-6xl mx-auto mb-16 space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          Bento Presentations.
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl">
          MarkDownを記述するだけで、最高品質のカード型スライドを生成。
          Apple級の滑らかな体験を、あなたのエディタから。
        </p>
      </header>

      {/* Bento Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Large Feature (List) */}
        <div className="md:col-span-2">
          <ListCard 
            title="革新的なマークダウン構文"
            items={[
              "Bento Gridレイアウトの自動生成",
              "Glassmorphism（すりガラス）エフェクト内蔵",
              "120fpsの滑らかなアニメーション",
              "あらゆるデバイスに完全レスポンシブ"
            ]}
          />
        </div>

        {/* 2. Photo Card */}
        <div className="md:col-span-1">
          <MediaCard 
            title="洗練された視覚表現"
            description="写真を指定するだけで、カード内に美しく配置。テキストとのコントラストも自動調整されます。"
          />
        </div>

        {/* 3. Timeline (Narrow) */}
        <div className="md:col-span-1">
          <TimelineCard />
        </div>

        {/* 4. Graph Card */}
        <div className="md:col-span-1">
          <LineGraphCard title="データ・ビジュアライゼーション" />
        </div>

        {/* 5. Flip Card */}
        <div className="md:col-span-1">
          <FlipCard 
             front="インタラクティブ"
             back="カードを裏返して詳細情報を表示。スペースを有効活用できます。"
          />
        </div>

        {/* 6. Step Circles (Wide) */}
        <div className="md:col-span-2">
          <div style={glassStyle('rgba(255,255,255,0.02)')} className="flex flex-col h-full justify-center">
             <StepCircleCard steps={[
               {num: 1, icon: Layout, text: 'Compose'},
               {num: 2, icon: Activity, text: 'Preview'},
               {num: 3, icon: CheckCircle2, text: 'Present'}
             ]} />
          </div>
        </div>

        {/* 7. Stack Card */}
        <div className="md:col-span-1">
           <div className="p-4">
             <h4 className="text-sm font-mono text-gray-500 mb-4 px-2 tracking-widest uppercase">Content Stacking</h4>
             <StackCard cards={[
               "カードの中にカードを配置可能",
               "情報を階層的に整理できます",
               "Apple Music風のリスト表示"
             ]} />
           </div>
        </div>

      </div>

      <footer className="max-w-6xl mx-auto mt-24 text-center text-gray-600 text-sm">
        &copy; 2025 Next-Gen Markdown Slide Engine. Built for High-Performance Teams.
      </footer>
    </div>
  );
}