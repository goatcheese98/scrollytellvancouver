'use client';

import React from "react";
import { Compare } from "@/components/ui/compare";
import { LinkPreview } from "@/components/ui/link-preview";
import { ExternalLink, Calendar, TrendingUp } from "lucide-react";

export const CompareDemo = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground tracking-tight">Pho Goodness, Vancouver</h3>
      </div>

      {/* Compare Interface */}
      <div className="p-3 border rounded-xl bg-card border-border w-full max-w-[660px] mx-auto">
        <Compare
          firstImage="/images/menu-2015.svg"
          secondImage="/images/menu-2025.svg"
          firstImageClassName="object-contain object-center"
          secondImageClassname="object-contain object-center"
          className="h-[560px] w-full md:h-[700px] md:w-full"
          slideMode="hover"
          showHandlebar={true}
          autoplay={false}
        />
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
