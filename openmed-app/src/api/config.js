import Keycloak from 'keycloak-js'
import axios from 'axios'

// API server for the actions based on OpenWhisk
const apiServer = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
})

// KEYCLOAK
const keycloak = Keycloak({
  realm: 'OpenMED',
  url: process.env.REACT_APP_KEYCLOAK,
  'ssl-required': 'external',
  resource: 'openmed-app',
  'public-client': true,
  'confidential-port': 0,
  clientId: 'openmed-app',
})

export { apiServer, keycloak }
