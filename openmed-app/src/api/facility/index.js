import { apiServer } from '../../api/config'

async function getNearestFacility(latitude, longitude) {
  return await apiServer
    .get('/v1/facilities?latitude=' + latitude + '&longitude=' + longitude)
    .then((res) => Promise.resolve(res.data.payload))
}

/**
 *
 * @param {*} params
 */
function prepareParams(id, latitude, longitude) {
  if (id) {
    return `?id=${id}`
  }
  if (latitude && longitude) {
    return ''
  }
  return ''
}

async function getFacilities(facilityId, latitude, longitude) {
  const parsedParams = prepareParams(facilityId, latitude, longitude)
  return await apiServer
    .get(`/v1/facilities${parsedParams}`)
    .then((res) => Promise.resolve(res.data.payload))
}

async function getCoordinatesByAddress(address) {
  console.log(encodeURIComponent(address))
  return await apiServer
    .get('/v1/facilities/coordinatesByAddress?address=' + encodeURIComponent(address))
    .then((res) => Promise.resolve(res.data.payload))
}

export { getNearestFacility, getFacilities, getCoordinatesByAddress }
