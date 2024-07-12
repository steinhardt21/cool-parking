import * as z from "zod"

export const BikeStationSchema = z.object({
  last_seen: z.string(),
  id: z.number(),
  name: z.string(),
  bikes_in_use: z.number(),
  bikes_available: z.number(),
  longitude: z.string(),
  latitude: z.string(),
  geopoint: z.object({
    lon: z.number(),
    lat: z.number()
  }),
  type: z.string()
})