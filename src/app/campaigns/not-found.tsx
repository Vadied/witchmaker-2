import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <main className="main">
      <FaceFrownIcon />
      <h2>404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <Link href="/campaigns">Go Back</Link>
    </main>
  );
}
