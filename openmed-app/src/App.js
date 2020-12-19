import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { CSpinner } from '@coreui/react'
import { keycloak } from './api/config'
import './scss/style.scss'

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const eventLogger = (event, error) => {
  console.log('onKeycloakEvent', event, error)
}

class App extends Component {
  render() {
    return (
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{
          onLoad: 'login-required',
          checkLoginIframe: false,
        }}
        onEvent={eventLogger}
      >
        <HashRouter>
          <React.Suspense fallback={<CSpinner color="primary" />}>
            <Switch>
              <Route
                exact
                path="/login"
                name="Login Page"
                render={(props) => <Login {...props} />}
              />
              <Route
                exact
                path="/register"
                name="Register Page"
                render={(props) => <Register {...props} />}
              />
              <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
              <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
              <Route path="/" name="Home" render={(props) => <TheLayout {...props} />} />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </ReactKeycloakProvider>
    )
  }
}

export default App
