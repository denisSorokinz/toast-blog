import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <Heading>Welcome to Blog!</Heading>
      <h2 className="prose text-lg text-gray-700">
        See posts at{" "}
        <Link href="/blog" className="underline underline-offset-8">
          Content Page
        </Link>
      </h2>
    </div>
  );
}
