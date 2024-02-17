"use client";

import { Suspense, useEffect } from "react"; // Import useEffect from React
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router"; // Use useRouter from next/router instead of next/navigation
import { trpc } from "@/app/_trpc/client";

function Page() {
  const router = useRouter();

  useEffect(() => {
    // Use useEffect here
    const searchParams = new URLSearchParams(router.asPath);
    const origin = searchParams.get("origin");

    trpc.authCallback.useQuery(undefined, {
      onSuccess: ({ success }) => {
        if (success) {
          router.push(origin ? `${origin}` : "/dashboard");
        }
      },
      onError: (err) => {
        if (err.data?.code === "UNAUTHORIZED") {
          router.push("/sign-in");
        }
      },
      // retry: true,
      // retryDelay: 500
    });
  }, []);

  return (
    <Suspense fallback={<Loader2 />}>
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
          <h3 className="font-semibold text-xl">Setting up your account...</h3>
          <p className="text-sm text-zinc-500">You will be redirected soon</p>
        </div>
      </div>
    </Suspense>
  );
}

export default Page;
