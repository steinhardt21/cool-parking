'use server'

import { revalidatePath, revalidateTag } from "next/cache"
import { getBikesAvailableFromStation } from "@/fetch-data/data-bikes"
import { getParkingsAvailability } from "@/fetch-data/data-parking"

export async function revalidateStation(station: string, lastTimeUpdated: string) {
  const data = await getBikesAvailableFromStation(station)

  if('error' in data) {
    throw new Error(data.error)
  }

  const { last_seen } = data.data

  if(lastTimeUpdated === last_seen) return

  revalidateTag(station)
}

export async function revalidateParkings(city: string) {
  const data = await getParkingsAvailability(city)

  if('error' in data) {
    throw new Error(data.error)
  }

  revalidateTag(city)
}

export async function revalidateAllStations() {
  revalidatePath('/bikes')
}