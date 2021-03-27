/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CSpinner, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import { getFacilities } from '../../api/facility'

/**
 *
 */

const Facility = (props) => {
  const [facility, setFacility] = useState(props.history.location.facility)
  const location = useLocation()

  useEffect(() => {
    async function fetchFacility() {
      if (!location.facility) {
        const response = await getFacilities()
        const facilities = await response
        const facilityId = parseInt(
          props.match.params.id.substring(0, props.match.params.id.indexOf('&'))
        )
        const facility = facilities.filter((facility) => facility.id === facilityId)[0]
        setFacility(facility)
      }
    }

    fetchFacility()
  }, [props])

  if (facility) {
    const latitude = facility.latitude
    const longitude = facility.longitude
    const point = [latitude, longitude]
    const address = facility.address.street
    const town = facility.address.town
    const postalcode = facility.address.postalcode
    const county = facility.address.county
    const state = facility.address.state
    const country = facility.address.country
    const zoom = 13

    return (
      <div>
        <CCard>
          <CCardHeader>{facility.name}</CCardHeader>
          <CCardBody>
            <p>Domain: {facility.domain_identifier}</p>
            <p>Address: {`${address}, ${postalcode} ${town}, ${county} ${state} (${country})`}</p>
            <p>Email: {facility.email}</p>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody>
            <MapContainer center={point} zoom={zoom} style={{ zIndex: 0 }}>
              <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={point} key={facility.id}>
                <Popup>
                  <span>
                    ADDRESS: {address}, {town} - {postalcode}
                  </span>
                  <br />
                  {/* <span>BATTALION: {battalion}</span> */}
                  <br />
                </Popup>
              </Marker>
            </MapContainer>
          </CCardBody>
        </CCard>
      </div>
    )
  } else {
    return <CSpinner color="primary" />
  }
}

export default Facility
