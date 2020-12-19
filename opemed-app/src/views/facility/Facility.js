/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { getFacilities } from '../../api/facility'
import { useLocation } from 'react-router-dom'
import { CSpinner, CCard, CCardHeader, CCardBody } from '@coreui/react'

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
    return (
      <CCard>
        <CCardHeader>{facility.name}</CCardHeader>
        <CCardBody>
          <p>Domain: {facility.domain_identifier}</p>
          <p>
            Address:
            {' ' +
              facility.address.street +
              ', ' +
              facility.address.zip +
              ' ' +
              facility.address.town +
              ', ' +
              facility.address.state +
              ' (' +
              facility.address.stateCode +
              ')'}
          </p>
          <p>Email: {facility.email}</p>
        </CCardBody>
      </CCard>
    )
  } else {
    return <CSpinner color="primary" />
  }
}

export default Facility
