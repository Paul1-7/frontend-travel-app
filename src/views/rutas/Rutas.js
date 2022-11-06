import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import MainCard from '../../ui-component/cards/MainCard';
import Table from '../../ui-component/Table';
import ButtonLink from '../../ui-component/ButtonLink';
import axios from '../../apis';
import useAxios from '../../hooks/useAxios';
import MuiTypography from '@material-ui/core/Typography';
import { RoundaboutLeft } from '@mui/icons-material';

const columnsData = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'titulo', headerName: 'Titulo', flex: 1 },
    { field: 'descripcion', headerName: 'Descripcion', flex: 1 },
    { field: 'duracion', headerName: 'Duracion', flex: 1 },
    { field: 'dias', headerName: 'Días', flex: 1 },
    { field: 'precio', headerName: 'Precio', flex: 1 },
    { field: 'estado', headerName: 'Estado', flex: 1 }
];

const Rutas = () => {
    const [response, error, loading, axiosFetch] = useAxios();
    useEffect(() => {
        axiosFetch({
            axiosInstance: axios,
            method: 'GET',
            url: '/api/v1/rutas'
        });
        //eslint-disable-next-line
    }, []);

    return (
        <MainCard>
            <MuiTypography variant="h1" gutterBottom>
                Rutas
            </MuiTypography>
            <Grid container spacing={2} sx={{ display: 'grid' }}>
                <Grid item xs={12}>
                    alguna descripcion
                </Grid>
                <Grid item container direction="row-reverse">
                    <ButtonLink to="/rutas/nuevo" endIcon={<RoundaboutLeft />}>
                        Nueva ruta
                    </ButtonLink>
                </Grid>
                <Grid item xs={12}>
                    <Table rowsData={response} columnsData={columnsData} errors={error} loading={loading} />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Rutas;
