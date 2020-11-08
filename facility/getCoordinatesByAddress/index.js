/**
 *
 * @param {*} params
 */
async function getCoordinatesByAddress (params) {
  const dotenv = require('dotenv')
  const fetch = require('node-fetch')

  dotenv.config()

  // check params
  if (!params) {
    throw Error('The input params are undefined')
  }
  if (!params.address) {
    throw Error('The input params are invalid: address unavailable')
  }

  const endpoint = process.env.gmaps_endpoint
  const apiKey = process.env.gmaps_api_key

  // call Google Maps
  const geocodingResponse = await fetch(endpoint +
    '?address=' + encodeURI(params.address) +
    '&key=' + apiKey +
    '&region=it')

  const outcome = await geocodingResponse.json()
  const firstResult = outcome.results[0]

  // return coordinates
  return {
    status: outcome.status,
    payload: {
      lat: firstResult.geometry.location.lat,
      lon: firstResult.geometry.location.lng,
      address: firstResult.formatted_address
    }
  }
}

exports.main = getCoordinatesByAddress
