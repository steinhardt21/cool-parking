import { z } from "zod"

import type { ReturnValue } from "@/types"
import { ParkingSchema } from "../lib/validations/parking"
import { env } from "@/env"

export type Parking = z.infer<typeof ParkingSchema>

type ParkingOptions = {
  availabilityMoreThenHalf?: boolean,
  typeCarPark?: boolean,
  orderByAvailableCapacityDesc?: boolean,
  excludeClosedParking?: boolean
}

const options = {
  availabilityMoreThenHalf: 'availablecapacity%20%3E%3D%20totalcapacity%2F2',
  typeCarPark: 'type%20%3D%20%22carPark%22',
  orderBy: 'order_by=availablecapacity%20DESC',
  excludeClosedParking: 'exclude=isopennow%3A0'
}

export async function getParkingsAvailability(city: string = env.PARKING_AREA, options?: ParkingOptions): Promise<ReturnValue<Parking[]>> {
  try {
    const filteredAvailableCapacity = options !== undefined ? getFilterForApi(options) : ''
    const resultFetch = await fetch(`${env.API_PARKING_STATIONS}/${city}/records?${filteredAvailableCapacity}&limit=100`, { cache: "no-cache", next: { tags: [city] }})
    const dataFetched = await resultFetch.json()

    if(dataFetched?.results?.length === 0) {
      return { data: [] }
    }

    // Parsing the data received from the API
    const parkingsData: Parking[] = []
    dataFetched?.results.forEach((item: unknown) => {
      const { success, error, data } = ParkingSchema.safeParse(item)

      if(success) {
        parkingsData.push(data)
        return
      } 

      console.error(error)
    });

    return { data: parkingsData }
  } catch (error) {
    console.error(error)
    return { error: 'Error in downloading parkings availability' }
  }
}

export async function getParkingDetails(parkingName: string, city: string = env.PARKING_AREA): Promise<ReturnValue<Parking | null>> {
  try {
    const filterParkingName = getFilterParkingName(parkingName)
    const resultFetch = await fetch(`${env.API_PARKING_STATIONS}/${city}/records?${filterParkingName}&limit=100`, { cache: "no-cache", next: { tags: [city] }})
    const dataFetched = await resultFetch.json()

    if(dataFetched?.results?.length === 0) {
      return { data: null }
    }

    const { success, error, data } = ParkingSchema.safeParse(dataFetched?.results[0])

    if(!success) {
      throw new Error(error?.message)
    }
    
    return { data }
  } catch (error) {
    console.error(error)
    return { error: 'Error in downloading parkings availability' }
  }
}


function getFilterForApi(optionsSelected: ParkingOptions) {
  const wherefilters = []
  const filters = []

  if(optionsSelected.availabilityMoreThenHalf) wherefilters.push(options.availabilityMoreThenHalf)
  if(optionsSelected.typeCarPark) wherefilters.push(options.typeCarPark)

  if(wherefilters.length > 0) filters.push(`where=${wherefilters.join('%20and%20')}`)

  if(optionsSelected.orderByAvailableCapacityDesc) filters.push(options.orderBy)
  if(optionsSelected.excludeClosedParking) filters.push(options.excludeClosedParking)

  return filters.join('&')
}

function getFilterParkingName(city: string) {
  return `where=name%3D%22${city.replace(/ /g, '%20')}%22`;
}