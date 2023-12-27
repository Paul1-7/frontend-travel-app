const BASE_DEV = import.meta.env.VITE_API_URL_BASE_DEV
const BASE_PROD = import.meta.env.VITE_API_URL_BASE_PROD

const config = {
  // basename: only at build time to set, and don't add '/' at end off BASENAME for breadcrumbs, also don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: '',
  defaultPath: '/administracion/rutas',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  BASE_URL: import.meta.env.PROD ? BASE_PROD : BASE_DEV,
  MAPBOX_ACCESS_TOKEN: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
  MAPBOX_URL_BASE: import.meta.env.VITE_MAPBOX_URL_BASE
}

export default config
