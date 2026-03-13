"use client";

import type React from "react";
import Link from "next/link";

const GlobalError = ({ reset }: { reset: () => void }) => {
  return (
    <html lang="en">
      <body>
        <div className="bg-background flex min-h-screen items-center justify-center px-4">
          <div className="max-w-md space-y-4 text-center">
            <h1 className="text-2xl font-semibold">Something went wrong</h1>
            <p className="text-muted-foreground text-sm">
              An unexpected error occurred. You can try again or go back to the dashboard.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => reset()}
                className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium"
              >
                Try again
              </button>
              <Link
                href="/"
                className="text-foreground rounded-md border px-4 py-2 text-sm font-medium"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
