import React, { useEffect } from 'react'
import { TheContent, TheSidebar, TheFooter, TheHeader } from './index'
import { useKeycloak } from '@react-keycloak/web'
import { apiServer } from '../api/config'

const TheLayout = () => {
  const { keycloak } = useKeycloak()

  useEffect(() => {
    apiServer.interceptors.request.use(
      function (config) {
        if (keycloak.tokenParsed) {
          config.headers.Authorization = 'Bearer ' + keycloak.token
        }
        return config
      },

      function (error) {
        return Promise.reject(error)
      }
    )
  }, [keycloak])

  return (
    <div>
      <div className="c-app c-default-layout">
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <TheContent />
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  )
}

export default TheLayout
