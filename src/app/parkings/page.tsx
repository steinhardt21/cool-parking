import { getParkingsAvailability } from "@/fetch-data/data-parking"
import { CardParkingDetails } from "@/components/card-parking-details"
import { Shell } from "@/components/shell"
import { RefreshCache } from "@/components/refresh-cache"
import { revalidateParkings } from "@/lib/actions"
import { env } from "@/env"

export default async function ParkingsPage() {
  
  const data = await getParkingsAvailability(env.PARKING_AREA, {
    availabilityMoreThenHalf: true,
    typeCarPark: true,
    orderByAvailableCapacityDesc: true,
    excludeClosedParking: true
  })

  if('error' in data) {
    throw new Error(data.error)
  }

  const parkings = data.data
  const revalidateParkingsAction = revalidateParkings.bind(null, env.PARKING_AREA)

  return (
    <Shell>
      <h1 tabIndex={0} className="font-heading text-3xl md:text-4xl">Parkings</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-3">
        {parkings.map(parking => (
          <CardParkingDetails key={parking.id} {...parking} />
        ))}
      </div>
      <RefreshCache refresh={revalidateParkingsAction}/>
    </Shell>
  )
}
