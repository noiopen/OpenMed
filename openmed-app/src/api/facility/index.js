import { apiServer } from '../../api/config'

async function getNearestFacility(latitude, longitude) {
  return await apiServer
    .get('/v1/facilities?latitude=' + latitude + '&longitude=' + longitude)
    .then((res) => Promise.resolve(res.data.payload))
}

async function getFacilities() {
  return await apiServer.get('/v1/facilities').then((res) => Promise.resolve(res.data.facilities))
}

async function getCoordinatesByAddress(address) {
  console.log(encodeURIComponent(address))
  return await apiServer
    .get('/v1/facilities/coordinatesByAddress?address=' + encodeURIComponent(address))
    .then((res) => Promise.resolve(res.data.payload))
}

export { getNearestFacility, getFacilities, getCoordinatesByAddress }
