import { describe, it, expect, vi } from 'vitest'
import { getParkingsAvailability, getParkingDetails } from './data-parking'
import { ParkingSchema } from '../lib/validations/parking'
import type { ReturnValue } from '@/types'
import type { Parking } from './data-parking'

vi.mock('@/env', () => ({
  env: {
    API_PARKING_STATIONS: 'http://mock-api.com/parking-stations',
    PARKING_AREA: 'mockCity'
  }
}))

const validParking = {
  id: '1',  // ID should be a string
  name: 'Parking 1',
  availablecapacity: 50,
  totalcapacity: 100,
  isopennow: 1,
  type: 'carPark',
  geopoint: { lat: 52.5200, lon: 13.4050 },
  lastupdate: '2024-07-12T00:00:00Z',
  location: {
    address: '123 Main St',
    city: 'Mock City',
    country: 'Mock Country',
    lat: 52.5200,
    lon: 13.4050
  }
}

const parsedParking = ParkingSchema.parse(validParking)

describe('getParkingsAvailability', () => {
  it('should return data when API call is successful and data is valid', async () => {
    const mockResponse = {
      results: [validParking]
    }

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    ) as any

    const result: ReturnValue<Parking[]> = await getParkingsAvailability('mockCity')

    if ('data' in result) {
      expect(result.data).toEqual([parsedParking])
    } else {
      throw new Error('Expected data but received error')
    }
  })

  it('should return an empty array when no data is available', async () => {
    const mockResponse = {
      results: []
    }

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    ) as any

    const result: ReturnValue<Parking[]> = await getParkingsAvailability('mockCity')

    if ('data' in result) {
      expect(result.data).toEqual([])
    } else {
      throw new Error('Expected data but received error')
    }
  })

  it('should return an error when API call fails', async () => {
    global.fetch = vi.fn(() => Promise.reject('API error')) as any

    const result: ReturnValue<Parking[]> = await getParkingsAvailability('mockCity')

    if ('error' in result) {
      expect(result.error).toBe('Error in downloading parkings availability')
    } else {
      throw new Error('Expected error but received data')
    }
  })

  it('should handle invalid data gracefully', async () => {
    const mockResponse = {
      results: [
        { ...validParking, id: 1 } // Invalid id type (should be string)
      ]
    }

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    ) as any

    const result: ReturnValue<Parking[]> = await getParkingsAvailability('mockCity')

    if ('data' in result) {
      expect(result.data).toEqual([])
    } else {
      throw new Error('Expected data but received error')
    }
  })
})

describe('getParkingDetails', () => {
  it('should return data when API call is successful and data is valid', async () => {
    const mockResponse = {
      results: [validParking]
    }

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    ) as any

    const result: ReturnValue<Parking | null> = await getParkingDetails('Parking 1', 'mockCity')

    if ('data' in result) {
      expect(result.data).toEqual(parsedParking)
    } else {
      throw new Error('Expected data but received error')
    }
  })

  it('should return null when no data is available', async () => {
    const mockResponse = {
      results: []
    }

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    ) as any

    const result: ReturnValue<Parking | null> = await getParkingDetails('Parking 1', 'mockCity')

    if ('data' in result) {
      expect(result.data).toBeNull()
    } else {
      throw new Error('Expected data but received error')
    }
  })

  it('should return an error when API call fails', async () => {
    global.fetch = vi.fn(() => Promise.reject('API error')) as any

    const result: ReturnValue<Parking | null> = await getParkingDetails('Parking 1', 'mockCity')

    if ('error' in result) {
      expect(result.error).toBe('Error in downloading parkings availability')
    } else {
      throw new Error('Expected error but received data')
    }
  })

  it('should handle invalid data gracefully', async () => {
    const mockResponse = {
      results: [
        { ...validParking, id: 1 } // Invalid id type (should be string)
      ]
    }

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    ) as any

    const result: ReturnValue<Parking | null> = await getParkingDetails('Parking 1', 'mockCity')

    if ('error' in result) {
      expect(result).not.toContain('data')
    } else {
      throw new Error('Expected data but received error')
    }
  })
})
