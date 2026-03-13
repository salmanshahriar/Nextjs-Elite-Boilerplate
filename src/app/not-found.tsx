"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-foreground mb-2 text-6xl font-bold">404</h1>
        <p className="text-muted-foreground mb-8 text-xl">Page not found</p>
        <p className="text-muted-foreground mb-8 max-w-md text-base">
          The page you're looking for doesn't exist.
        </p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
