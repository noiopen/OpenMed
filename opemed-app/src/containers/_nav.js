export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    _tag: 'CSidebarNavDivider',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Ambulatori'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Trova ambulatorio',
    to: '/facilities',
    icon: 'cil-map',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Terapisti'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Help terapista',
    to: '/practitioners/help',
    icon: 'cil-life-ring',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Agenda'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Gestione appuntamenti',
    to: '/agenda',
    icon: 'cil-calendar',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Altro'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Richiesta informazioni',
    to: '/info',
    icon: 'cil-info',
  },
  {
    _tag: 'CSidebarNavDivider',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Extras'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Pages',
    route: '/pages',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Login',
        to: '/login',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Register',
        to: '/register',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 404',
        to: '/404',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2',
  },
]
