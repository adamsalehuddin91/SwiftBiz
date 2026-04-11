import { useState, useEffect, useCallback } from 'react';
import WisdomCard from './components/WisdomCard';
import BookmarkDrawer, { toggleBookmark, isBookmarked } from './components/BookmarkDrawer';
import { shareWisdom } from './components/ShareEngine';
import './index.css';

const FALLBACK = {
  id: 0,
  content: 'Sesungguhnya bersama kesulitan ada kemudahan.',
  source: 'Al-Quran (94:6)',
  category: 'Sabar',
  language: 'ms',
  tags: null,
};

export default function App() {
  const [wisdom, setWisdom] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchWisdom = useCallback(async () => {
    setVisible(false);
    setLoading(true);
    try {
      const res = await fetch('/api/v1/wisdom/random');
      if (!res.ok) throw new Error();
      const { data } = await res.json();
      setTimeout(() => {
        setWisdom(data);
        setBookmarked(isBookmarked(data.id));
        setVisible(true);
      }, 300);
    } catch {
      setTimeout(() => {
        setWisdom(FALLBACK);
        setBookmarked(false);
        setVisible(true);
      }, 300);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWisdom();
  }, [fetchWisdom]);

  function handleBookmark() {
    if (!wisdom) return;
    const saved = toggleBookmark(wisdom);
    setBookmarked(saved);
  }

  return (
    <div className="min-h-svh flex flex-col items-center justify-between py-12 px-4 select-none" style={{ backgroundColor: '#0a0c10' }}>
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-sm">
        <span style={{ color: '#f59e0b' }} className="font-medium tracking-widest text-lg">Qalbu</span>
        <button
          onClick={() => setDrawerOpen(true)}
          className="transition-colors"
          style={{ color: 'rgba(255,255,255,0.4)' }}
          aria-label="Bookmarks"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
          </svg>
        </button>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center w-full">
        {loading && !wisdom ? (
          <div className="w-8 h-8 rounded-full animate-spin" style={{ border: '2px solid rgba(245,158,11,0.3)', borderTopColor: '#f59e0b' }} />
        ) : (
          <WisdomCard wisdom={wisdom} visible={visible} />
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <div className="flex gap-4 justify-center">
          {/* Bookmark */}
          <button
            onClick={handleBookmark}
            className="glass rounded-full p-3 transition-colors"
            style={{ color: bookmarked ? '#f59e0b' : 'rgba(255,255,255,0.4)' }}
            aria-label="Bookmark"
          >
            <svg className="w-5 h-5" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>

          {/* Share */}
          <button
            onClick={() => wisdom && shareWisdom(wisdom)}
            className="glass rounded-full p-3 transition-colors"
            style={{ color: 'rgba(255,255,255,0.4)' }}
            aria-label="Share"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
          </button>
        </div>

        {/* TERUSKAN */}
        <button
          onClick={fetchWisdom}
          disabled={loading}
          className="w-full glass rounded-2xl py-4 font-medium tracking-widest uppercase text-sm transition-all active:scale-95 disabled:opacity-40"
          style={{ color: '#f59e0b' }}
        >
          {loading ? '...' : 'Teruskan'}
        </button>
      </div>

      <BookmarkDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
