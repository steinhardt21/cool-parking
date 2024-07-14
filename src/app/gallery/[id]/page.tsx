import Image from "next/image";
import { Shell } from "@/components/shell";
import imagesDemo from "@/assets/images.json";

type ParkingsGalleryProps = {
  params: { id: string },
}

export default function ParkingsGalleryPage(props: ParkingsGalleryProps) {
  const { id } = props.params
  const srcImage = imagesDemo.demo.find(image => image.name === id)!.src
  const details = imagesDemo.demo.find(image => image.name === id)!.details

  return (
    <Shell>
      <h1 tabIndex={0} className="font-heading text-3xl md:text-4xl">{details.title}</h1>
      <div className='flex flex-col sm:flex-row w-full'>
        <section className='flex flex-col gap-3' aria-label="Parking details">
          <div aria-labelledby="descriptionHeading">
            <h2 className='font-heading text-lg'>Description</h2>
            <p>{details.description}</p>
          </div>
          <div>
            <h2 className='font-heading text-lg'>Location</h2>
            <p>{details.location}</p>
          </div>
          <div>
            <h2 className='font-heading text-lg'>Parking spot availability</h2>
            <ul>
              <li>Price: {details.price}</li>
              <li>Rating: {details.rating}</li>
            </ul>
          </div>
        </section>
        <Image className="w-fit rounded-md" style={{ viewTransitionName: `image-${id}`}} src={srcImage} alt="parking lot" width={800} height={200} />
      </div>
    </Shell>
  )
}