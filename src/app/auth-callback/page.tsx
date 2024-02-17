"use client";

import { Suspense, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router"; // Import useRouter from next/router

function Page() {
  const router = useRouter();

  useEffect(() => {
    // Ensure we're on the client side before using the router
    if (router.asPath) {
      // Dynamic import trpc module to prevent SSR/SSG
      import("@/app/_trpc/client").then(({ trpc }) => {
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
      });
    }
  }, [router.asPath]); // Ensure useEffect runs only when `router.asPath` changes

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
