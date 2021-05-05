import { apiServer } from '../../api/config'

/**
 *
 * @param {*} params
 */
function prepareParams(params) {
  if (params) {
    if (params.id) {
      return `?id=${params.id}`
    }
    if (params.latitude && params.longitude) {
      return `?latitude=${params.latitude}&longitude=${params.longitude}`
    }
  }
  return ''
}

/**
 *
 * @param {*} params
 * @returns
 */
async function getFacilities(params) {
  const parsedParams = prepareParams(params)
  return await apiServer
    .get(`/v1/facilities${parsedParams}`)
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

export { getFacilities, getCoordinatesByAddress }
