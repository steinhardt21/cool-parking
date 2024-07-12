export type ResponseBikeApi = {
  total_count: number,
  results: {
    last_seen: string,
    id: number,
    name: string,
    bikes_in_use: number,
    bikes_available: number,
    longitude: string,
    latitude: string,
    geopoint: {
      lon: number,
      lat: number
    },
    type: string
  }[]
}

export type ResponseParkingApi = {
  total_count: number,
  results: {
    name: string,
    lastupdate: string,
    totalcapacity: number,
    availablecapacity: number,
    occupation: number,
    type: string,
    description: string,
    id: string,
    openingtimesdescription: string,
    isopennow: number,
    temporaryclosed: number,
    operatorinformation: string,
    freeparking: number,
    urllinkaddress: string,
    occupancytrend: string,
    locationanddimension: string,
    location: {
      lon: number,
      lat: number
    },
    text: string,
    categorie: string,
    dashboard: string
  }[]
}
