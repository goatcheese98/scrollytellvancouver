'use client';

import React from "react";
import { Compare } from "@/components/ui/compare";
import { LinkPreview } from "@/components/ui/link-preview";
import { CompactSource } from "@/components/ui/compact-source";
import { ExternalLink, Calendar, TrendingUp } from "lucide-react";

export const CompareDemo = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground tracking-tight">Pho Goodness, Vancouver</h3>
      </div>

      {/* Compare Interface - Menu Card Style */}
      <div className="relative p-6 rounded-2xl shadow-2xl w-full max-w-[660px] mx-auto border-4 border-amber-900/30 bg-amber-50/40">

        {/* Menu card texture overlay */}
        <div className="absolute inset-0 rounded-2xl bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEzOSwgNjksIDkzLCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-60 pointer-events-none"></div>

        {/* Hover prompt text at the top with glowing effect */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-40">
          <span className="text-xs font-semibold text-amber-900 pointer-events-none px-3 py-1.5 rounded-full bg-amber-100/40 backdrop-blur-sm border border-amber-900/20 shadow-lg shadow-amber-500/20 inline-block">
            ✦ Move your cursor left & right to compare
          </span>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-900/30 rounded-tl-lg"></div>
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-900/30 rounded-tr-lg"></div>
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-900/30 rounded-bl-lg"></div>
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-900/30 rounded-br-lg"></div>

        <div className="relative">
          <Compare
            firstImage="/images/menu-2015.svg"
            secondImage="/images/menu-2025.svg"
            firstImageClassName="object-contain object-center"
            secondImageClassname="object-contain object-center"
            className="h-[560px] w-full md:h-[700px] md:w-full rounded-lg"
            slideMode="hover"
            showHandlebar={true}
            autoplay={false}
          />
        </div>
      </div>

      {/* Price Increase Indicator */}
      <div className="text-center pb-2">
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="h-4 w-4 text-destructive" />
          <span className="text-sm font-semibold text-destructive">+100% price increase</span>
        </div>
      </div>

      {/* Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* 2015 Card */}
        <LinkPreview
          url="https://web.archive.org/web/20150309061033/http://www.phogoodness.com/menu.html"
          preview={{
            title: "Pho Goodness Menu - Wayback Machine (2015)",
            description: "Archived restaurant menu from March 9, 2015, showing original pho pricing at $8.00-$8.50. Captured via Internet Archive's Wayback Machine.",
            domain: "web.archive.org",
            image: "/images/Pho-Goodness-menu-2015.png"
          }}
        >
          <div className="group block p-3 rounded-lg border border-border bg-[#F4E8C1]/10 hover:bg-[#F4E8C1]/20 transition-colors cursor-pointer">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F4E8C1] border-2 border-[#8B2E1F] flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-foreground text-sm">2015 Menu</span>
                  <span className="text-[10px] text-muted-foreground/70 ml-2">1183 Davie St</span>
                </div>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-0.5" />
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="text-[11px]">March 9, 2015 · Wayback Archive</span>
            </div>
          </div>
        </LinkPreview>

        {/* 2025 Card */}
        <LinkPreview
          url="https://www.phogoodness.com/menu-west-end.html"
          preview={{
            title: "Pho Goodness West End - Current Menu (2025)",
            description: "Current restaurant menu showing pho pricing at $16.00-$17.00. West End location in Downtown Vancouver, BC.",
            domain: "phogoodness.com",
            image: "/images/Pho-Goodness-menu-2025.png"
          }}
        >
          <div className="group block p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-gray-400 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-foreground text-sm">2025 Menu</span>
                  <span className="text-[10px] text-muted-foreground/70 ml-2">1150 Davie St</span>
                </div>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-0.5" />
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="text-[11px]">Current (2025) · (604) 568-3253</span>
            </div>
          </div>
        </LinkPreview>
      </div>

      {/* Context and Attribution */}
      <div className="text-center space-y-2 pt-3">
        <p className="text-sm text-muted-foreground font-medium">The same restaurant, 10 years apart</p>
        <p className="text-[10px] text-muted-foreground/70">
          Data sourced from authentic restaurant menus for journalism purposes
        </p>
      </div>
    </div>
  );
};
