import { Link } from 'next-view-transitions'

import type { Parking } from '@/fetch-data/data-parking'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { RadialChart } from "./radial-chart-parking"
import { Skeleton } from './ui/skeleton'

export function CardParkingDetails(props: Parking) {
  const { name, availablecapacity, totalcapacity } = props
  const availableSpotsLabel = `Parking availability: ${availablecapacity} out of ${totalcapacity} spots available.`

  return (
    <Card>
      <CardHeader>
        <CardTitle 
          role="heading" 
          style={{ viewTransitionName: `title-${convertSpacesToDashes(name)}`}}
          aria-label={`${name} parking details`} 
          tabIndex={0} 
          className="font-light text-lg w-fit"
        >
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div tabIndex={0} role="img" aria-label={availableSpotsLabel}>
          <RadialChart availableSpots={availablecapacity} totalSpots={totalcapacity} />
        </div>
        <Link prefetch href={`/parkings/${convertSpacesToDashes(name)}`} aria-label={`See ${name} parking details`}>See parking details →</Link>
      </CardContent>
    </Card>
  )
}

function convertSpacesToDashes(inputString: string): string {
  return inputString.replace(/\s+/g, '---');
}

CardParkingDetails.Skeleton = function CardParkingDetailsSkeleton() {
  return (
    <div className="p-4 border rounded-md">
      <div className="h-60 space-y-3 divide-border-200 divide-y rounded-md">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}