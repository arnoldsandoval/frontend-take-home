"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { RefreshCw, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const handleRetry = () => {
    /**
     * @important clear SWR cache to force fresh fetch
     */
    mutate(() => true, undefined, { revalidate: false });
    reset();
    router.refresh();
  };

  return (
    <div className="max-w-4xl mx-auto gap-y-4 gap-x-4 grid p-6 w-full border rounded-lg shadow-sm grid-cols-[auto_1fr] grid-rows-[repeat(3,auto)]">
      <div className="col-start-1 row-start-1 row-span-3">
        <TriangleAlert className="size-5" />
      </div>
      <div className="col-start-2 grid gap-3 text-center sm:text-left">
        <Heading level={1} visualLevel={4}>
          An error has occured
        </Heading>
        <Text className="mt-0! text-sm">
          We apologize for the inconvenience. Please try again later.
        </Text>
      </div>
      <div className="flex gap-2 col-start-2 row-start-2">
        <Button variant="outline" size="sm" asChild>
          <Link
            href={`mailto:arnold@arnie.io?subject=Help%20me%20Arnie!?&body=I%20am%20having%20trouble%20with%20the%20following%20error%3A%0A%0A${encodeURIComponent(
              error.message
            )}`}
            target="_blank"
          >
            Contact support
          </Link>
        </Button>

        <Button onClick={handleRetry} variant="default" size="sm">
          <RefreshCw className="size-3" />
          Try again
        </Button>
      </div>
      <details className="col-start-2 row-start-3">
        <summary className="text-xs font-medium text-neutral-500">
          Error details
        </summary>
        <pre className="text-sm mt-4">{error.message}</pre>
      </details>
    </div>
  );
}
