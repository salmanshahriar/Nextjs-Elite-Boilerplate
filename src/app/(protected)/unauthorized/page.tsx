"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

const Page = () => {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-destructive">Access Denied</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">You do not have permission to access this page.</p>
          <Link href="/">
            <Button className="w-full">Go Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
