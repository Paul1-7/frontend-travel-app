import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import MainCard from '../../ui-component/cards/MainCard';
import Table from '../../ui-component/Table';
import ButtonLink from '../../ui-component/ButtonLink';
import axios from '../../apis';
import useAxios from '../../hooks/useAxios';
import MuiTypography from '@material-ui/core/Typography';
import { IconMountain } from '@tabler/icons';

const columnsData = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'direccion', headerName: 'Direccion', flex: 1 },
    { field: 'estado', headerName: 'Estado', flex: 1 }
];

const Lugares = () => {
    const [response, error, loading, axiosFetch] = useAxios();

    useEffect(() => {
        axiosFetch({
            axiosInstance: axios,
            method: 'GET',
            url: '/api/v1/lugares'
        });
        //eslint-disable-next-line
    }, []);

    return (
        <MainCard>
            <MuiTypography variant="h1" gutterBottom>
                Lugares
            </MuiTypography>
            <Grid container spacing={2} sx={{ display: 'grid' }}>
                <Grid item xs={12}>
                    alguna descripcion
                </Grid>
                <Grid item container direction="row-reverse">
                    <ButtonLink to="/lugares/nuevo" endIcon={<IconMountain />}>
                        Nuevo lugar
                    </ButtonLink>
                </Grid>
                <Grid item xs={12}>
                    <Table rowsData={response} columnsData={columnsData} errors={error} loading={loading} />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Lugares;
