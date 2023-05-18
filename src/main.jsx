import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persister } from './store'
import config from './config'

// style + assets
import './assets/scss/style.scss'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <BrowserRouter basename={config.basename}>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
