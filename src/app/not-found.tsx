// FIXME: Nice of you to include a 404 page!
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className={buttonVariants({ variant: "default" })} href="/">
        Return Home
      </Link>
    </div>
  );
}
