/**
 * @jest-environment node
 */

const facilitiesData = require('../../../models/facility.json')

const facilityModule = require('../../src/index')

describe('Unit tests', function () {
  it('should get the nearest facilities', () => {
    // get the nearest facilities
    const latitude = '38.6111'
    const longitude = '-90.3225'
    const facilities = facilityModule.findNearest(latitude, longitude, facilitiesData)

    // check data
    expect(facilities).toBeDefined()
    expect(facilities.id).toStrictEqual(10)
    expect(facilities.name).toStrictEqual('Alcon Laboratories, Inc.')
    expect(facilities.address.street).toStrictEqual('7 Di Loreto Park')
    expect(facilities.address.town).toStrictEqual('Saint Louis')
    expect(facilities.address.state).toStrictEqual('Missouri')
    expect(facilities.address.county).toStrictEqual('MO')
    expect(facilities.address.postalCode).toStrictEqual('63143')
  })

  it('should order the facilities from the nearest', () => {
    const latitude = '38.6111'
    const longitude = '-90.3225'
    const facilities = facilityModule.orderByDistance(latitude, longitude, facilitiesData)

    // check data
    expect(facilities).toBeDefined()
    expect(Array.isArray(facilities)).toBeTruthy()

    const firstFacility = facilities[0]
    expect(firstFacility.id).toStrictEqual(10)
    expect(firstFacility.name).toStrictEqual('Alcon Laboratories, Inc.')
    expect(firstFacility.address.street).toStrictEqual('7 Di Loreto Park')
    expect(firstFacility.address.town).toStrictEqual('Saint Louis')
    expect(firstFacility.address.state).toStrictEqual('Missouri')
    expect(firstFacility.address.county).toStrictEqual('MO')
    expect(firstFacility.address.postalCode).toStrictEqual('63143')

    expect(facilities[1].id).toStrictEqual(8)
    expect(facilities[2].id).toStrictEqual(6)
    expect(facilities[3].id).toStrictEqual(7)
    expect(facilities[4].id).toStrictEqual(9)
    expect(facilities[5].id).toStrictEqual(1)
    expect(facilities[6].id).toStrictEqual(5)
    expect(facilities[7].id).toStrictEqual(2)
    expect(facilities[8].id).toStrictEqual(3)
    expect(facilities[9].id).toStrictEqual(4)
  })
})
