import { Button, FormControl, Grid, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SubCard from './cards/SubCard';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { gridSpacing } from '../store/constant';
import MuiTypography from '@material-ui/core/Typography';
import Select from './forms/container/Select';
import Input from './forms/container/Input';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Add } from '@material-ui/icons';
import useAxios from '../hooks/useAxios';
import axios from '../apis';

const initialForm = {
    idLugar: '0',
    descripcion: '',
    horaInicio: '',
    horaFin: ''
};

const customData = ({ data }) => {
    const newData = data
        .filter(({ estado }) => estado === 1)
        .map(({ id, nombre, punto, estado }) => ({ id, nombre, lng: punto[0].lng, lat: punto[0].lat, estado }));
    return { data: newData };
};

const Itinerario = ({ generateMarkers, deleteMarkers }) => {
    const [resGet, , loadingGet, axiosFetchGet] = useAxios(customData);
    const { control } = useFormContext();
    const [idLugares, setIdLugares] = useState([]);
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'itinerarios'
    });
    const getIdLugares = (data) => {
        setIdLugares([data, ...idLugares]);
    };

    const removeLugares = (index) => {
        const data = idLugares.filter(({ name }) => !name.includes(index));

        setIdLugares(data);
    };

    const getIdLugaresUnicos = () => {
        return idLugares.filter(({ name }, index, a) => a.findIndex((e) => name === e.name) === index).map(({ value }) => value);
    };

    useEffect(() => {
        const idLugaresUnicos = getIdLugaresUnicos();

        const lugaresUnicos = resGet.filter((item) => idLugaresUnicos.includes(item.id));

        const markers = lugaresUnicos.map(({ lng, lat, nombre }) => ({ lngLat: [lng, lat], label: nombre }));

        deleteMarkers();
        generateMarkers(markers);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idLugares]);

    useEffect(() => {
        console.log('eneees');
        axiosFetchGet({
            axiosInstance: axios,
            method: 'GET',
            url: '/api/v1/lugares'
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Grid item container alignItems="center" spacing={2}>
                <Grid item>
                    <MuiTypography variant="h3" gutterBottom>
                        Itinerarios
                    </MuiTypography>
                </Grid>
                <Grid item>
                    <Button aria-label="add" startIcon={<Add />} color="secondary" onClick={() => append(initialForm)}>
                        Agregar
                    </Button>
                </Grid>
            </Grid>
            <Grid item container sx={{ display: 'grid' }}>
                {fields.map((item, index) => {
                    return (
                        <div style={{ position: 'relative', marginBottom: '32px' }} key={item.id}>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <IconButton
                                    color="secondary"
                                    aria-label="remove an item"
                                    onClick={() => {
                                        remove(index);
                                        removeLugares(index);
                                    }}
                                    sx={{ position: 'absolute', top: '-25px', zIndex: 1000 }}
                                >
                                    <HighlightOffIcon fontSize="large" />
                                </IconButton>
                            </div>
                            <SubCard sx={{ position: 'relative' }}>
                                <FormControl disabled={loadingGet} sx={{ width: '100%' }}>
                                    <Grid container sx={{ display: 'grid' }} spacing={gridSpacing}>
                                        <Grid item xs={12} wrap="wrap" container spacing={gridSpacing}>
                                            <Grid item xs={12} md={6}>
                                                <Select
                                                    name={`itinerarios.${index}.idLugar`}
                                                    label="Lugar"
                                                    isArray
                                                    items={resGet}
                                                    onChange={getIdLugares}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Input label="Descripcion" name={`itinerarios.${index}.descripcion`} isArray />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Input label="Hora de inicio" name={`itinerarios.${index}.horaInicio`} isArray />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Input label="Hora fin" name={`itinerarios.${index}.horaFin`} isArray />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </SubCard>
                        </div>
                    );
                })}
            </Grid>
        </>
    );
};

export default Itinerario;
