'use client';

import React from 'react';
import { LinkPreview } from '@/components/ui/link-preview';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface CompactSourceProps {
  url: string;
  domain: string;
  title: string;
  description: string;
  label?: string;
}

export const CompactSource: React.FC<CompactSourceProps> = ({
  url,
  domain,
  title,
  description,
  label = "Source"
}) => {
  // Use Google's favicon service to get the site's favicon
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  
  return (
    <LinkPreview
      url={url}
      preview={{
        title,
        description,
        domain
      }}
      inline={true}
    >
      <span className="group inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50 hover:bg-muted border border-border hover:border-muted-foreground/30 transition-all cursor-pointer">
        <span className="relative h-3 w-3 flex-shrink-0 inline-flex items-center justify-center">
          <Image
            src={faviconUrl}
            alt={`${domain} favicon`}
            width={12}
            height={12}
            className="rounded-sm"
            unoptimized
          />
        </span>
        <span className="text-[10px] text-muted-foreground group-hover:text-foreground font-medium">
          {label}
        </span>
        <ExternalLink className="h-2.5 w-2.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors flex-shrink-0" />
      </span>
    </LinkPreview>
  );
};

