import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

import { CardBikeStation } from "@/components/card-bike-stations"
import { Shell } from "@/components/shell";
import { revalidateAllStations } from "@/lib/actions";
import { RevalidateDataButton } from "@/components/revalidate-data-button";
import { env } from "@/env";
import type { BikeStation } from "@/types";

export default async function BikesPage() {
  const urls = JSON.parse(env.URLS_BIKE_STATIONS) as BikeStation[];

  return (
    <Shell>
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-heading text-3xl md:text-4xl">Bikes</h1>
        <RevalidateDataButton refresh={revalidateAllStations} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3">
        {urls.map(station => 
          <ErrorBoundary key={station.resource} fallback={CardBikeStation.Error()}>
            <Suspense fallback={CardBikeStation.Skeleton()}> 
              <CardBikeStation station={station} />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </Shell>
  )
}