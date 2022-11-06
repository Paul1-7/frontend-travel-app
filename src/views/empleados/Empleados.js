import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import MainCard from '../../ui-component/cards/MainCard';
import Table from '../../ui-component/Table';
import ButtonLink from '../../ui-component/ButtonLink';
import axios from '../../apis';
import useAxios from '../../hooks/useAxios';
import MuiTypography from '@material-ui/core/Typography';
import { IconUser } from '@tabler/icons';

const columnsData = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'apellido', headerName: 'Apellido', flex: 1 },
    { field: 'ci', headerName: 'Carnet de identidad', flex: 1 },
    { field: 'roles', headerName: 'Roles', flex: 1 },
    { field: 'estado', headerName: 'Estado', flex: 1 }
];

const getNombreRoles = (roles) => {
    return roles.map(({ nombre }) => nombre).toString();
};

const datosPersonalidados = ({ data }) => {
    const newData = data.map((item) => ({ ...item, roles: getNombreRoles(item.roles) }));
    return { data: newData };
};

const Empleados = () => {
    const [response, error, loading, axiosFetch] = useAxios(datosPersonalidados);

    useEffect(() => {
        axiosFetch({
            axiosInstance: axios,
            method: 'GET',
            url: '/api/v1/empleados'
        });
        //eslint-disable-next-line
    }, []);

    return (
        <MainCard>
            <MuiTypography variant="h1" gutterBottom>
                Empleados
            </MuiTypography>
            <Grid container spacing={2} sx={{ display: 'grid' }}>
                <Grid item xs={12}>
                    alguna descripcion
                </Grid>
                <Grid item container direction="row-reverse">
                    <ButtonLink to="/empleados/nuevo" endIcon={<IconUser />}>
                        Nuevo empleado
                    </ButtonLink>
                </Grid>
                <Grid item xs={12}>
                    <Table rowsData={response} columnsData={columnsData} errors={error} loading={loading} />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Empleados;
