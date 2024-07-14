import Image from "next/image";
import { Shell } from "@/components/shell";
import imagesDemo from "@/assets/images.json";
import { Link } from "next-view-transitions";

export default function ParkingsGalleryPage() {
  return (
    <Shell>
      <h1 tabIndex={0} className="font-heading text-3xl md:text-4xl">Parkings gallery</h1>
      <section className="grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
          {imagesDemo.demo.map(image => (
            <Link prefetch key={image.id} href={`/gallery/${image.name}`}>
              <Image style={{ viewTransitionName: `image-${image.name}`}} src={image.src} alt="parking lot" width={500} height={500} />
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  )
}