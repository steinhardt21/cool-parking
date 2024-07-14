import Link from 'next/link'
import { getParkingDetails } from '@/fetch-data/data-parking'
import { Shell } from '@/components/shell'
import { buttonVariants } from '@/components/ui/button'
import { cn, getGoogleMapsLink } from '@/lib/utils'
import { CopyButton } from '@/components/copy-button'

export type ParkingPageProps = {
  params: { id: string },
}

export default async function ParkingPage(props: ParkingPageProps) {
  const { id } = props.params
  const parkingName = removeThreeDashes(id)

  const data = await getParkingDetails(parkingName)

  if('error' in data) {
    throw new Error(data.error)
  }
  
  if(!data.data) {
    return (
      <Shell>
        <h1 className="font-heading text-3xl md:text-4xl">No data available at the moment!</h1>
      </Shell>
    )
  }

  const {
    name,
    description,
    categorie,
    totalcapacity,
    availablecapacity,
    location: { lat, lon}
  } = data.data

  const takenSpotsPercentage = Math.round((totalcapacity - availablecapacity) / totalcapacity * 100)
  const googleMapsLink = getGoogleMapsLink(lat, lon)

  return (
    <Shell>
      <h1 
        className="font-heading text-3xl md:text- w-fit"
        style={{ viewTransitionName: `title-${id}` }}
      >
        {name}
      </h1>
      <section className='flex flex-col gap-3' aria-label="Parking details">
        <div aria-labelledby="descriptionHeading">
          <h2 className='font-heading text-lg'>Description</h2>
          <p>{description}</p>
        </div>
        <div>
          <h2 className='font-heading text-lg'>Category</h2>
          <p>{categorie}</p>
        </div>
        <div>
          <h2 className='font-heading text-lg'>Parking spot availability</h2>
          <ul>
            <li>Total spots: {totalcapacity}</li>
            <li>Available spots: {availablecapacity}</li>
            <li>Taken spots: {takenSpotsPercentage}%</li>
          </ul>
        </div>
      </section>
      <div className='flex flex-col sm:flex-row gap-3'>
        <Link
          href={googleMapsLink}
          target='_blank'
          aria-label="See parking location on Google Maps"
          className={cn(
            buttonVariants({ variant: "default" }),
            'w-fit'
          )}
        >
          See on Google Maps
        </Link>
        <CopyButton 
          className={buttonVariants({ variant: "secondary" })} 
          text={googleMapsLink} 
          toastMessage='Google Map link copied'
          aria-label="Copy Google Map link to clipboard"
        >
          Copy Google Map
        </CopyButton>
      </div>
    </Shell>
  )
}

function removeThreeDashes(inputString: string): string {
  return inputString.replace(/---/g, ' ');
}