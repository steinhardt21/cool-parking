import { Shell } from "@/components/shell"
import { CardParkingDetails } from "@/components/card-parking-details"

export default function ParkingPageLoading() {
  return (
    <Shell>
      <h1 className="font-heading text-3xl md:text-4xl">Parkings</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-3">
        <CardParkingDetails.Skeleton />
        <CardParkingDetails.Skeleton />
        <CardParkingDetails.Skeleton />
        <CardParkingDetails.Skeleton />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-3">
        <CardParkingDetails.Skeleton />
        <CardParkingDetails.Skeleton />
      </div>
    </Shell>
  )
}