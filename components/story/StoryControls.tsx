'use client';

import { useEffect, useState, useSyncExternalStore, type MouseEvent } from 'react';
import { chapters, chapterFromHash, type ChapterId } from '@/lib/story';

/** Native anchors still navigate before hydration or if this enhancement fails. */
export function focusFragment(event: MouseEvent<HTMLAnchorElement>) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const hash = event.currentTarget.hash;
  const target = document.getElementById(hash.slice(1));
  if (!target) return;
  // Focus within this activation. A delayed frame could steal focus from the next control.
  // Leave default anchor history/scroll behavior intact.
  target.focus({ preventScroll: true });
}

const reducedQuery = '(prefers-reduced-motion: reduce)';
const subscribeReduced = (notify: () => void) => {
  const media = window.matchMedia(reducedQuery);
  media.addEventListener('change', notify);
  return () => media.removeEventListener('change', notify);
};
export function StoryControls() {
  const [requested, setRequested] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => true);
  const motion = requested && !reduced;
  useEffect(() => { document.documentElement.dataset.motion = motion ? 'on' : 'off'; }, [motion]);
  return <div className="story-controls">
    <button type="button" disabled={reduced} aria-pressed={motion} aria-describedby="motion-help" onClick={() => setRequested(!requested)}>Motion {motion ? 'on' : 'off'}</button>
    <span id="motion-help" className="control-note">{reduced ? 'Static reading · motion disabled' : 'Optional chart transitions'}</span>
  </div>;
}

export function ChapterNav({ mobile = false }: { mobile?: boolean }) {
  const [active, setActive] = useState<ChapterId>('familiar-meal');
  useEffect(() => {
    const sync = () => { const chapter = chapterFromHash(window.location.hash); if (chapter) setActive(chapter); };
    sync(); window.addEventListener('hashchange', sync); window.addEventListener('popstate', sync);
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const visible = [...chapters].reverse().find(chapter => {
          const heading = document.getElementById(chapter.id);
          return heading && heading.getBoundingClientRect().top <= window.innerHeight * .3;
        });
        setActive(visible?.id ?? 'familiar-meal');
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('hashchange', sync); window.removeEventListener('popstate', sync); };
  }, []);
  const links = <nav aria-label="Chapters"><ol>{chapters.map((chapter, index) => <li key={chapter.id}>
    <a href={`#${chapter.id}`} aria-current={active === chapter.id ? 'location' : undefined} onClick={focusFragment}><span className="quantity">{String(index + 1).padStart(2, '0')}</span><span>{chapter.title}</span>{active === chapter.id && <span className="sr-only"> (current chapter)</span>}</a>
  </li>)}</ol></nav>;
  return mobile ? <details className="chapter-mobile"><summary>In this story · 5 chapters</summary>{links}</details> : <aside className="chapter-desktop"><p>In this story</p>{links}</aside>;
}

export function ContinueLink({ id, children }: { id: string; children: React.ReactNode }) {
  return <a className="continue-link" href={`#${id}`} onClick={focusFragment}>{children} <span aria-hidden="true">→</span></a>;
}
