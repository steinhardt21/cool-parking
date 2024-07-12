import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-fit flex-col items-center justify-between sm:p-24">
      <div className="container max-w-[65rem] flex flex-col items-center gap-4 text-center">
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Bikes and Parkings
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Discover the real time availability of your sharing bikes and parkings spots
        </p>
      </div>
    </main>
  );
}
