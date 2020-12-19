import React, { useEffect, useState } from 'react'
import { getFacilities, getNearestFacility, getCoordinatesByAddress } from '../../api/facility'
import {
  CSpinner,
  CListGroup,
  CListGroupItem,
  CLink,
  CForm,
  CFormGroup,
  CInputGroup,
  CInput,
  CInputGroupAppend,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Facilities = () => {
  const [address, setAddress] = useState('')
  const [facilities, setFacilities] = useState([])

  useEffect(() => {
    async function fetchFacilities() {
      const response = await getFacilities()
      const facilities = await response
      setFacilities(facilities)
    }

    fetchFacilities()
  }, [])

  async function getNearestFacilityByAddress() {
    setFacilities([])
    const coordsResponse = await getCoordinatesByAddress(address)
    const coordinates = await coordsResponse
    setAddress(coordinates.address)

    const facilityResponse = await getNearestFacility(coordinates.lat, coordinates.lon)
    const facility = await facilityResponse
    setFacilities([facility])
  }

  return (
    <div>
      <CForm
        onSubmit={(e) => {
          e.preventDefault()
          getNearestFacilityByAddress()
        }}
      >
        <CFormGroup>
          <CInputGroup className={'mb-3 px-0 col-6'}>
            <CInput
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="street-address"
              placeholder="Cerca per indirizzo"
            />
            <CInputGroupAppend>
              <CButton color="primary" type="submit" disabled={facilities.length === 0}>
                {facilities.length === 0 ? (
                  <CSpinner color="white" size="sm" />
                ) : (
                  <CIcon name="cil-arrow-right" />
                )}
              </CButton>
            </CInputGroupAppend>
          </CInputGroup>
        </CFormGroup>
      </CForm>
      {facilities.length === 0 ? (
        <CSpinner color="primary" />
      ) : (
        <CListGroup>
          {facilities.map((facility, idx) => (
            <CListGroupItem key={idx}>
              <CLink
                to={{
                  pathname: '/facilities/' + facility.id,
                  facility: facility,
                }}
              >
                {facility.name}
              </CLink>
            </CListGroupItem>
          ))}
        </CListGroup>
      )}
    </div>
  )
}

export default Facilities
