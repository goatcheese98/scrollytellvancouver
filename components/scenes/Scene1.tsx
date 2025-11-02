'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { CompareDemo } from '@/components/ui/compare-demo';

export default function Scene1() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-slate-950 text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage: 'url(/images/menu-backdrop.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(60px)',
          transform: 'scale(1.05)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-slate-950/65 backdrop-blur-[3px]" />
      <div
        className="pointer-events-none absolute inset-0 -z-5 opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-4 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.35em] text-emerald-200 shadow-[0_0_30px_rgba(16,185,129,0.25)]"
          >
            2015 → 2025
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-5xl font-semibold leading-tight sm:text-6xl"
          >
            The Sticker Shock
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl"
          >
            Vancouver&apos;s go-to comfort bowl now costs nearly double. Explore how a simple large pho went from an easy
            weeknight staple to a luxury line item.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            visible: {
              transition: {
                delayChildren: 0.2,
                staggerChildren: 0.12,
              },
            },
          }}
          className="mt-20 flex flex-col gap-10 lg:flex-row lg:items-stretch"
        >
          <motion.div
            variants={fadeUp}
            className="order-2 grid flex-1 gap-6 text-left text-slate-200 sm:grid-cols-2 lg:order-1 lg:flex lg:flex-col lg:justify-between"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-emerald-500/10">
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/80">Increase</p>
              <p className="mt-4 text-3xl font-semibold text-emerald-100 lg:text-4xl">+88%</p>
              <p className="mt-3 text-sm text-slate-200/70">Ten-year jump in the cost of a single large pho.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-cyan-500/10">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">Dollar difference</p>
              <p className="mt-4 text-3xl font-semibold text-cyan-100 lg:text-4xl">$7.50</p>
              <p className="mt-3 text-sm text-slate-200/70">Equivalent to adding a second meal to every order.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-rose-500/10 lg:col-span-2">
              <p className="text-xs uppercase tracking-[0.35em] text-rose-200/80">Current price</p>
              <p className="mt-4 text-3xl font-semibold text-rose-100 lg:text-4xl">$16.00</p>
              <p className="mt-3 text-sm text-slate-200/70">Before tip, taxes, and delivery platform fees.</p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="order-1 flex flex-1 items-center justify-center lg:order-2"
          >
            <div className="relative w-full max-w-[640px]">
              <div className="absolute inset-0 -z-10 rounded-[36px] bg-gradient-to-br from-emerald-500/25 via-transparent to-rose-500/25 blur-3xl" />
              <div className="overflow-hidden rounded-[32px] border border-white/12 bg-white/5 p-2 shadow-[0_40px_120px_-50px_rgba(15,23,42,0.9)] backdrop-blur-3xl">
                <div className="relative rounded-[28px] border border-white/5 bg-slate-950/40">
                  <CompareDemo />
                  <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/10 shadow-[inset_0_0_45px_rgba(15,23,42,0.55)]" />
                  <div className="pointer-events-none absolute inset-0 animate-pulse rounded-[28px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.18),_rgba(255,255,255,0))]" />
                  <div className="pointer-events-none absolute inset-0 animate-[pulse_3s_ease-in-out_infinite] rounded-[28px] bg-gradient-to-r from-transparent via-white/6 to-transparent" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-300/80">
                <div className="flex items-center gap-1">
                  <span className="block h-2 w-2 rounded-full bg-white/60" />
                  Drag to compare
                </div>
                <svg className="h-4 w-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
                <div className="flex items-center gap-1">
                  <span className="block h-2 w-2 rounded-full bg-white/60" />
                  Tap &amp; hold on mobile
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
