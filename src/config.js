const config = {
  // basename: only at build time to set, and don't add '/' at end off BASENAME for breadcrumbs, also don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: '',
  defaultPath: '/dashboard/default',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  BASE_URL: 'http://localhost:4000',
  MAPBOX_ACCESS_TOKEN:
    'pk.eyJ1IjoicGF1bDEtNyIsImEiOiJja29vdGdlcngwY2l4MndtbHIwdXo3dmI0In0.2fx3l_hLv_ELsBjcxUNc9g',
  MAPBOX_URL_BASE: 'https://api.mapbox.com/directions/v5/mapbox'
}

export default config
