import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import MainCard from '../../ui-component/cards/MainCard';
import ButtonLink from '../../ui-component/ButtonLink';
import axios from '../../apis';
import useAxios from '../../hooks/useAxios';
import MuiTypography from '@material-ui/core/Typography';
import { RoundaboutLeft } from '@mui/icons-material';
import DataTable from '../../ui-component/dataTable/DataTable';
import { COLUMNS_TABLE } from '../../constants/dataTable';

const buttonsActions = { edit: true, remove: true, detail: true };
const Rutas = () => {
    const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios();
    useEffect(() => {
        axiosFetchGet({
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
                <DataTable
                    columns={COLUMNS_TABLE.rutas}
                    rows={resGet}
                    error={errorGet}
                    loading={loadingGet}
                    numeration
                    btnActions={buttonsActions}
                    orderByDefault="nombre"
                />
            </Grid>
        </MainCard>
    );
};

export default Rutas;
