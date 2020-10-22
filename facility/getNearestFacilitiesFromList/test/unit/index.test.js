/**
 * @jest-environment node
 */

const getClosestFacilities = require('../../index')

const facilities = require('../model/facility.json')

describe('getClosestFacilities unit tests', function () {
  it('should return the param errors', async () => {
    let params = { longitude: -75.63128 }
    await expect(getClosestFacilities.main(params)).rejects.toThrow('The input params are invalid: longitude or latitude unavailable')

    params = { latitude: 40.456221 }
    await expect(getClosestFacilities.main(params)).rejects.toThrow('The input params are invalid: longitude or latitude unavailable')

    params = null
    await expect(getClosestFacilities.main(params)).rejects.toThrow('The input params are undefined')

    params = {}
    await expect(getClosestFacilities.main(params)).rejects.toThrow('The input params are invalid: longitude or latitude unavailable')

    params = { latitude: null }
    await expect(getClosestFacilities.main(params)).rejects.toThrow('The input params are invalid: longitude or latitude unavailable')

    params = { longitude: null }
    await expect(getClosestFacilities.main(params)).rejects.toThrow('The input params are invalid: longitude or latitude unavailable')

    params = { latitude: null, longitude: null }
    await expect(getClosestFacilities.main(params)).rejects.toThrow('The input params are invalid: longitude or latitude unavailable')

    params = { latitude: 40.456221, longitude: -75.63128 }
    await expect(getClosestFacilities.main(params)).rejects.toThrow('The input params are invalid: facilities unavailable')

    params = { latitude: 40.456221, longitude: -75.63128, facilities: [] }
    await expect(getClosestFacilities.main(params)).rejects.toThrow('The input params are invalid: facilities are empty')
  })

  it('should return the nearest facility', async () => {
    let params = { latitude: 40.456221, longitude: -75.63128, facilities: facilities }
    const firstNearestFacility = await getClosestFacilities.main(params)
    expect(firstNearestFacility.payload.name).toStrictEqual('DZA Brands LLC')

    params = { latitude: 40.456221, longitude: -74.63128, facilities: facilities }
    const secondNearestFacility = await getClosestFacilities.main(params)
    expect(secondNearestFacility.payload.name).toStrictEqual('OMG Medical Group, LLC')
  })

  it('should sort an array of facilities by distance to a reference coordinate', () => {
    /**
         * geolib.orderByDistance({ latitude: 51.515, longitude: 7.453619 }, [
                { latitude: 52.516272, longitude: 13.377722 },
                { latitude: 51.518, longitude: 7.45425 },
                { latitude: 51.503333, longitude: -0.119722 },
            ]);
         */
  })
})
