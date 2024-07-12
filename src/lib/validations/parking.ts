import * as z from 'zod'

export const ParkingSchema = z.object({
  name: z.string(),
  lastupdate: z.string().nullish(),
  totalcapacity: z.number(),
  availablecapacity: z.number(),
  occupation: z.number().nullish(),
  type: z.string().nullish(),
  description: z.string().nullish(),
  id: z.string().nullish(),
  openingtimesdescription: z.string().nullish(),
  isopennow: z.number().nullish(),
  temporaryclosed: z.number().nullish(),
  operatorinformation: z.string().nullish(),
  freeparking: z.number().nullish(),
  urllinkaddress: z.string().nullish(),
  occupancytrend: z.string().nullish(),
  locationanddimension: z.string().nullish(),
  location: z.object({
    lon: z.number(),
    lat: z.number()
  }),
  text: z.string().nullish(),
  categorie: z.string().nullish(),
  dashboard: z.string().nullish()  
})
