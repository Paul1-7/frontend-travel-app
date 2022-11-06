import { useTheme } from '@material-ui/core';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Map } from 'mapbox-gl';
import { Marker } from 'mapbox-gl';
import { useRef } from 'react';

const useMapBox = (options) => {
    const { initialMarker = true } = options || {};

    const theme = useTheme();
    const SECONDARY_MAIN = theme.palette.secondary.main;
    const [location, setLocation] = useState(null);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const mapRef = useRef(null);

    useLayoutEffect(() => {
        if (!mapRef.current) return;
        const center = [-64.728096, -21.521383];
        setMap(
            new Map({
                container: mapRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center,
                zoom: 12
            })
        );
        setLocation(center);
    }, [mapRef]);

    useEffect(() => {
        if (!map || !initialMarker) return;
        const marker = new Marker({ color: SECONDARY_MAIN });
        marker.setDraggable(true);
        marker.setLngLat(location).addTo(map);
        setMarkers([marker]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const getLngLatMarker = (index) => {
        if (markers.length === 0) return null;

        return markers[index].getLngLat();
    };

    const generateMarkers = (array, options = {}) => {
        const newMarkers = array.map((marker) => new Marker({ color: SECONDARY_MAIN, ...options }).setLngLat(marker).addTo(map));

        setMarkers(newMarkers);
    };

    const deleteMarkers = () => {
        if (initialMarker) setMarkers(markers[0]);

        markers.forEach((marker) => marker.remove());

        setMarkers([]);
    };

    return { mapRef, getLngLatMarker, map, setMarkers, generateMarkers, deleteMarkers };
};

export default useMapBox;
