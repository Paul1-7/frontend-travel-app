import { useTheme } from '@material-ui/core'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Map, Popup } from 'mapbox-gl'
import { Marker } from 'mapbox-gl'
import { useRef } from 'react'
import { LngLatBounds } from 'mapbox-gl'
import useAxios from './useAxios'
import { directionMapBox } from '../apis'

const ID_SOURCE = `mapbox-source-${new Date()}`

const sourceData = (coordinates) => ({
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates
        }
      }
    ]
  }
})

const LAYER = {
  id: ID_SOURCE,
  type: 'line',
  source: ID_SOURCE,
  layout: {
    'line-cap': 'round',
    'line-join': 'round'
  },
  paint: {
    'line-color': 'violet',
    'line-width': 3
  }
}

const getStringMarker = (data) => {
  let stringMarkers = ''
  for (const element of data) {
    stringMarkers += `${element.getLngLat().toArray().join(',')};`
  }

  return stringMarkers.substring(0, stringMarkers.length - 1)
}

const useMapBox = ({ initialMarker = true }) => {
  const [resGet, , , axiosFetchGet] = useAxios()
  const [mapLoaded, setMapLoaded] = useState(false)

  const center = [-64.728096, -21.521383]
  const theme = useTheme()
  const SECONDARY_MAIN = theme.palette.secondary.main
  const [location, setLocation] = useState(null)
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const mapRef = useRef(null)

  const getDirections = (markers) => {
    axiosFetchGet({
      axiosInstance: directionMapBox,
      method: 'GET',
      url: `/driving/${markers}`
    })
  }

  useLayoutEffect(() => {
    if (!mapRef.current) return

    const mapInstance = new Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom: 12,
      preserveDrawingBuffer: true
    })

    mapInstance.on('load', () => {
      setMap(mapInstance)
      setMapLoaded(true)
    })
    setLocation(center)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef])

  useEffect(() => {
    if (!map || Array.isArray(resGet)) return
    const { coordinates } = resGet.routes[0].geometry

    const bounds = coordinates.reduce(function (bounds, coord) {
      return bounds.extend(coord)
    }, new LngLatBounds(coordinates[0], coordinates[0]))

    map.fitBounds(bounds, {
      padding: 50,
      easing(t) {
        return t * (2 - t)
      }
    })

    map.addSource(ID_SOURCE, sourceData(coordinates))
    map.addLayer(LAYER)
  }, [resGet])

  useEffect(() => {
    if (!map || !initialMarker || !mapLoaded) return
    const marker = new Marker({ color: SECONDARY_MAIN })
    marker.setDraggable(true)
    marker.setLngLat(location).addTo(map)
    setMarkers([marker])
  }, [location, mapLoaded])

  const getLngLatMarker = (index) => {
    if (markers.length === 0) return null

    return markers[index].getLngLat()
  }

  const generateMarkers = (array) => {
    if (!mapLoaded) return

    const newMarkers = array.map(({ lngLat, label, ...other }) =>
      new Marker({ color: SECONDARY_MAIN, ...other })
        .setLngLat(lngLat)
        .setPopup(new Popup({ offset: 15 }).setHTML(`<h4>${label}</h4>`))
        .addTo(map)
    )

    setMarkers(newMarkers)

    if (newMarkers.length <= 1) return
    const stringMarkers = getStringMarker(newMarkers)

    getDirections(stringMarkers)
  }

  const deleteMarkers = () => {
    if (initialMarker) setMarkers(markers[0])
    markers.forEach((marker) => marker.remove())
    setMarkers([])

    if (!map?.getLayer(ID_SOURCE)) return
    map.removeLayer(ID_SOURCE)
    map.removeSource(ID_SOURCE)
  }

  return {
    mapRef,
    getLngLatMarker,
    map,
    setMarkers,
    generateMarkers,
    deleteMarkers,
    mapLoaded
  }
}

export default useMapBox
