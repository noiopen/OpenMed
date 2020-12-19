import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Facilities = React.lazy(() => import('./views/facility/Facilities'))
const Facility = React.lazy(() => import('./views/facility/Facility'))
const AskInfo = React.lazy(() => import('./views/info/AskInfo'))
const AskHelp = React.lazy(() => import('./views/practitioners/AskHelp'))
const Agenda = React.lazy(() => import('./views/agenda/Agenda'))
const Users = React.lazy(() => import('./views/users/Users'))
const User = React.lazy(() => import('./views/users/User'))

const routes = [
  { path: '/', exact: true, name: 'Home', private: false },
  {
    path: '/facilities',
    exact: true,
    name: 'Trova ambulatorio',
    component: Facilities,
    private: true,
  },
  {
    path: '/facilities/:id',
    exact: true,
    name: 'Ambulatorio',
    component: Facility,
    private: true,
  },
  {
    path: '/agenda',
    exact: true,
    name: 'Gestione Appuntamenti',
    component: Agenda,
    private: true,
  },
  {
    path: '/practitioners/help',
    exact: true,
    name: 'Help terapista',
    component: AskHelp,
    private: true,
  },
  {
    path: '/info',
    exact: true,
    name: 'Richiesta informazioni',
    component: AskInfo,
    private: true,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    private: false,
  },
  {
    path: '/users',
    exact: true,
    name: 'Users',
    component: Users,
    private: false,
  },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
]

export default routes
