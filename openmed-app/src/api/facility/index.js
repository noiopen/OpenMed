import { apiServer } from '../../api/config'

/**
 *
 * @returns
 */
async function getFacilities() {
  return await apiServer.get(`/v1/facilities`).then((res) => Promise.resolve(res.data.payload))
}

/**
 *
 * @param {*} facilityId
 * @returns
 */
async function getFacilityByFacilityId(facilityId) {
  return await apiServer
    .get(`/v1/facilities?id=${facilityId}`)
    .then((res) => Promise.resolve(res.data.payload))
}

/**
 *
 * @param {*} latitude
 * @param {*} longitude
 * @returns
 */
async function getFacilityByCoordinates(latitude, longitude) {
  return await apiServer
    .get(`/v1/facilities?latitude=${latitude}&longitude=${longitude}`)
    .then((res) => Promise.resolve(res.data.payload))
}

/**
 *
 * @param {*} address
 * @returns
 */
async function getCoordinatesByAddress(address) {
  console.log(encodeURIComponent(address))
  return await apiServer
    .get('/v1/facilities/coordinatesByAddress?address=' + encodeURIComponent(address))
    .then((res) => Promise.resolve(res.data.payload))
}

export { getFacilities, getFacilityByFacilityId, getFacilityByCoordinates, getCoordinatesByAddress }
