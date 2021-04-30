/**
 * @jest-environment node
 */

const facilityModule = require('../../src/index')

describe('getFacilities integration tests', function () {
  it('should return a facility list', async () => {
    const data = await facilityModule.main()
    expect(data).toBeDefined()
    expect(Array.isArray(data.rows)).toBe(true)
    expect(data.rows.length).toBeGreaterThan(0)
  })

  it('should return the the facility with the specified id', async () => {
    // throw an error with a not existing param id
    const notIdValue = '123456789'
    const params = { id: notIdValue }
    await expect(facilityModule.main(params)).rejects.toThrow(
      `The param value ${notIdValue} is not a valid id value`
    )

    // get the facility
    // const params = { id: '0859cbae93b207dc8a591e3ae0389cf6' }
    // const data = await facilityModule.main(params)
    // console.log(data)
  })

  it.skip('should return the geo coordinates from the facility address', async () => {})
})
