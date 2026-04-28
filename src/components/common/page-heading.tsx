'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

export default function PageHeading({
  title,
  description,
  variant = 'admin',
  backButton = false,
  actionButton,
}: {
  title: string;
  description?: string;
  variant?: 'default' | 'admin';
  backButton?: boolean;
  actionButton?: ReactNode;
}) {
  return variant === 'admin' ? (
    <div className="mb-4 ml-2 flex items-center justify-between gap-2">
      <div className="flex items-center">
        {backButton && (
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => history.back()}
          >
            <ArrowLeft className="size-4" />
          </Button>
        )}
        <div className="px-4 py-2">
          <h3 className="mb-1 text-2xl font-medium">{title}</h3>
          <p className="text-sm text-black/50">{description}</p>
        </div>
      </div>
      {actionButton && actionButton}
    </div>
  ) : (
    <div className="mb-4 flex items-center justify-between px-4 py-2">
      <div>
        <h3 className="mb-1 bg-[linear-gradient(292deg,#000_90.65%,#FFF_108.48%)] bg-clip-text text-2xl font-medium text-transparent dark:bg-[linear-gradient(292deg,#FFF_90.65%,#000_108.48%)]">
          {title}
        </h3>
        {description && (
          <p className="font-lexend text-sm font-light text-black/50 dark:text-white/50">
            {description}
          </p>
        )}
      </div>

      {actionButton && actionButton}
    </div>
  );
}
