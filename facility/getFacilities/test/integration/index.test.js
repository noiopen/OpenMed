/**
 * @jest-environment node
 */
const getFacilities = require('../../index')

describe('getFacilities integration tests', function () {
  it('should return an array of facilities', async () => {
    const facilitiesList = await getFacilities.main()
    expect(Array.isArray(facilitiesList.payload)).toBe(true)
  })
})
