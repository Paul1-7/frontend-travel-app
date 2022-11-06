import { Button, FormControl, Grid, IconButton } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import SubCard from './cards/SubCard';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { gridSpacing } from '../store/constant';
import MuiTypography from '@material-ui/core/Typography';
import Select from './forms/container/Select';
import Input from './forms/container/Input';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
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
        .map(({ id, nombre, punto }) => ({ id, nombre, lng: punto[0].lng, lat: punto[0].lat }));
    return { data: newData };
};

const Itinerario = ({ generateMarkers, deleteMarkers }) => {
    const [resGet, , loadingGet, axiosFetchGet] = useAxios(customData);
    const { control } = useFormContext();
    const idLugaresRef = useRef([]);
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'itinerarios'
    });

    const watch = useWatch({ name: 'itinerarios' });

    useEffect(() => {
        const idLugares = watch.map((item) => item.idLugar);
        let count = 1;
        // idLugaresRef.current = [];

        idLugares.forEach((id) => {
            if (!idLugaresRef.current.includes(id) && id !== '0') idLugaresRef.current = [...idLugaresRef.current, id];
            else count++;
        });
        console.log('TCL: ', count);
        if (count !== idLugaresRef.current.length || idLugares.includes('0')) return;

        console.log('entro');
        const data = resGet.filter(({ id }) => idLugares.includes(id)).map(({ lng, lat }) => [lng, lat]);
        deleteMarkers();
        generateMarkers(data);
    }, [watch]);

    useEffect(() => {
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
                                    onClick={() => remove(index)}
                                    sx={{ position: 'absolute', top: '-25px', zIndex: 1000 }}
                                >
                                    <HighlightOffIcon fontSize="large" />
                                </IconButton>
                            </div>
                            <SubCard sx={{ position: 'relative' }}>
                                <FormControl disabled={loadingGet} sx={{ width: '100%' }}>
                                    <Grid container sx={{ display: 'grid' }} spacing={gridSpacing}>
                                        <Grid item xs={12} wrap="wrap" container spacing={gridSpacing}>
                                            <Select name={`itinerarios.${index}.idLugar`} label="Lugar" isArray items={resGet} />
                                            <Input label="Descripcion" name={`itinerarios.${index}.descripcion`} isArray />
                                            <Input label="Hora de inicio" name={`itinerarios.${index}.horaInicio`} isArray />
                                            <Input label="Hora fin" name={`itinerarios.${index}.horaFin`} isArray />
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
