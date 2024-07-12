import { z } from "zod"

import type { ReturnValue } from "@/types"
import { BikeStationSchema } from "../lib/validations/bike"
import { env } from "@/env"

export type BikeStation = z.infer<typeof BikeStationSchema>

export async function getBikesAvailableFromStation(station: string): Promise<ReturnValue<BikeStation>> {
  try {
    const resultFetch = await fetch(`${env.API_BIKE_STATIONS}/${station}/records?limit=20`, { cache: "no-cache", next: { tags: [station] }})
    const dataFetched = await resultFetch.json()

    // Parsing the data received from the API
    const { success, error, data } = BikeStationSchema.safeParse(dataFetched?.results[0])

    if(!success) {
      throw new Error(error?.message)
    }
    
    return { data }
  } catch (error) {
    console.error(error)
    return { error: 'Error in downloading bikes available from station' }
  }
}