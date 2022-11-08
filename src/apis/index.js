import axios from 'axios';
import configData from '../config';

const { BASE_URL, MAPBOX_URL_BASE, MAPBOX_ACCESS_TOKEN } = configData;

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

export const directionMapBox = axios.create({
    baseURL: MAPBOX_URL_BASE,
    params: {
        geometries: 'geojson',
        alternatives: false,
        language: 'es',
        overview: 'simplified',
        steps: false,
        access_token: MAPBOX_ACCESS_TOKEN
    }
});
