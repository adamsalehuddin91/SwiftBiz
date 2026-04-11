export default function WisdomCard({ wisdom, visible }) {
  if (!wisdom) return null;

  return (
    <div
      className={`glass rounded-2xl px-8 py-10 mx-4 max-w-sm w-full transition-opacity duration-500 ${
        visible ? 'fade-in opacity-100' : 'opacity-0'
      }`}
    >
      {/* Category badge */}
      <span className="inline-block text-xs font-medium tracking-widest uppercase text-amber-400 border border-amber-400/30 rounded-full px-3 py-1 mb-6">
        {wisdom.category}
      </span>

      {/* Quote */}
      <p className="font-playfair italic text-white/90 text-xl leading-relaxed mb-6">
        "{wisdom.content}"
      </p>

      {/* Source */}
      <p className="text-white/40 text-sm">— {wisdom.source}</p>
    </div>
  );
}
