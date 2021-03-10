/**
 * @jest-environment node
 */
const getFacilities = require('../../src/index')

describe('getFacilities integration tests', function () {
  it('should return an array of facilities', async () => {
    const facilitiesList = await getFacilities.main()
    expect(Array.isArray(facilitiesList.facilities)).toBe(true)
  }, 10000)
})
