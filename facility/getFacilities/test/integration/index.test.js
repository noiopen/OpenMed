/**
 * @jest-environment node
 */
const getFacilities = require('../../src/index')

describe('getFacilities integration tests', function () {
  it('should return a facility list', async () => {
    const data = await getFacilities.main()
    expect(data.rows).toBeDefined()
    expect(data.totalRows).toBeDefined()
    expect(Array.isArray(data.rows)).toBe(true)
    expect(data.rows.length).toBeGreaterThan(0)
    expect(data.totalRows).toBeGreaterThan(0)
  }, 10000)

  it('should return the the facility with the specified id', async () => {
    
    // throw an error with a not existing param id
    const notIdValue = '123456789'
    let params = { id: notIdValue }
    await expect(getFacilities.main(params)).rejects.toThrow(
      `The param value ${notIdValue} is not a valid id value`
    )

    // get the facility
    params = { id: '0859cbae93b207dc8a591e3ae0389cf6' }
    const data = await getFacilities.main(params)
    console.log(data)
  })

  it.skip('should return the geo coordinates from the facility address', async () => {})

  it.skip('should return the nearest facility ', async () => {})
})
