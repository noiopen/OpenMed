/**
 *
 * @param {*} params
 */
async function getClosestFacilities(params) {
  // https://www.npmjs.com/package/geolib
  const geolib = require('geolib')

  // check params
  if (!params) {
    throw Error('The input params are undefined')
  }
  if (!params.longitude || !params.latitude) {
    throw Error('The input params are invalid: longitude or latitude unavailable')
  }
  if (!params.facilities) {
    throw Error('The input params are invalid: facilities unavailable')
  }
  if (!Array.isArray(params.facilities) || !params.facilities.length) {
    throw Error('The input params are invalid: facilities are empty')
  }

  // get facilities
  const facilities = params.facilities

  // get lat and long
  const long = params.longitude
  const lat = params.latitude

  // get closest facilities
  const nearestFacility = geolib.findNearest({ latitude: lat, longitude: long }, facilities)

  // return closest facility
  return {
    payload: nearestFacility,
  }
}

exports.main = getClosestFacilities
