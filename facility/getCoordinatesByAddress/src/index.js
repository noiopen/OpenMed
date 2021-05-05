const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim()

/**
 *
 * @param {*} params
 */
async function getCoordinatesByAddress(params) {


  // check params
  if (!params) {
    throw Error('The input params are undefined')
  }
  if (!params.address) {
    throw Error('The input params are invalid: address unavailable')
  }

  const addressToSearch = params.address
  const results = await geocoder.search({ q: addressToSearch })

  // for now we get the place with the greatest value in "importance" attribute
  const firstResult = results[0]

  // return coordinates
  return {
    status: 'OK',
    payload: {
      latitude: firstResult.lat,
      longitude: firstResult.lon,
      address: firstResult.display_name
    }
  }
}

// webpack
global.main = getCoordinatesByAddress

// jest
exports.main = getCoordinatesByAddress
