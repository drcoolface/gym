import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl ">Not Found</h2>
      <p>Bhetena </p>
      <Link href="/" className="text-sm">
        ghar jum{" "}
      </Link>
    </div>
  );
}
