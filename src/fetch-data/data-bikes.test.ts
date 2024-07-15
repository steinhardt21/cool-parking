import { describe, it, expect, vi } from 'vitest';
import { getBikesAvailableFromStation } from './data-bikes';
import type { ReturnValue } from '@/types';
import type { BikeStation } from './data-bikes';

vi.mock('@/env', () => ({
  env: {
    API_BIKE_STATIONS: 'http://mock-api.com/bike-stations'
  }
}));

describe('getBikesAvailableFromStation', () => {
  const mockStation = '123';

  it('should return data when API call is successful and data is valid', async () => {
    const mockResponse = {
      results: [
        {
          id: 1,
          name: 'Station 1',
          last_seen: '2024-07-12T00:00:00Z',
          bikes_in_use: 3,
          bikes_available: 5,
          longitude: '12.345678',
          latitude: '98.765432',
          geopoint: {
            lat: 98.765432,
            lon: 12.345678
          },
          type: 'station'
        }
      ]
    };

    // FIXME: instead of mocking fetch, have a look at the 'msw' library 
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    ) as any;

    const result: ReturnValue<BikeStation> = await getBikesAvailableFromStation(mockStation);
    
    if ('data' in result) {
      expect(result.data).toEqual(mockResponse.results[0]);
    } else {
      throw new Error('Expected data but received error');
    }
  });

  it('should return an error when API call fails', async () => {
    global.fetch = vi.fn(() => Promise.reject('API error')) as any;

    const result: ReturnValue<BikeStation> = await getBikesAvailableFromStation(mockStation);

    if ('error' in result) {
      expect(result.error).toBe('Error in downloading bikes available from station');
    } else {
      throw new Error('Expected error but received data');
    }
  });

  it('should return an error when data is invalid', async () => {
    const mockResponse = {
      results: [
        {
          id: 'invalid_id', 
          name: 'Station 1',
          last_seen: '2024-07-12T00:00:00Z',
          bikes_in_use: 3,
          bikes_available: 5,
          longitude: '12.345678',
          latitude: '98.765432',
          geopoint: {
            lat: 98.765432,
            lon: 12.345678
          },
          type: 'station'
        }
      ]
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    ) as any;

    const result: ReturnValue<BikeStation> = await getBikesAvailableFromStation(mockStation);

    if ('error' in result) {
      expect(result.error).toBe('Error in downloading bikes available from station');
    } else {
      throw new Error('Expected error but received data');
    }
  });
});
