import React, { useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import MainCard from '../../ui-component/cards/MainCard';
import ButtonLink from '../../ui-component/ButtonLink';
import axios from '../../apis';
import useAxios from '../../hooks/useAxios';
import MuiTypography from '@material-ui/core/Typography';
import { RoundaboutLeft } from '@mui/icons-material';
import DataTable from '../../ui-component/dataTable/DataTable';
import { COLUMNS_TABLE } from '../../constants/dataTable';
import DialogConfirmation from '../../ui-component/DialogConfirmation';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import DataTableContext from '../../contexts/DataTableContext';

const buttonsActions = { edit: true, remove: true, detail: true };
const TEXTO_MODAL = '¿Esta seguro de borrar el registro seleccionado?, esta accion no se puede deshacer';

const Rutas = () => {
    const [resGet, errorGet, loadingGet, axiosFetchGet, setResGet] = useAxios();
    const { setOpenDialog, handleCloseDialog, openDialog, dataDialog } = useContext(DataTableContext);
    const [resDelete, errorDelete, loadingDelete, axiosFetchDelete, , setErrorDelete] = useAxios();
    const history = useHistory();
    const location = useLocation();

    const handleDelete = (id) => {
        axiosFetchDelete({
            axiosInstance: axios,
            method: 'DELETE',
            url: `/api/v1/rutas/${id}`
        });
    };

    useEffect(() => {
        let message;

        if (location.state?.message) {
            message = location.state.message;
            history.push(location.pathname);
        }
        if (!Array.isArray(resDelete) && !errorDelete) {
            message = resDelete?.message;
            Report.success('Exito', message, 'Okey');
            setResGet(resGet.filter((item) => item.id !== resDelete.id));
        }

        if (Array.isArray(resDelete) && errorDelete) {
            message = errorDelete.message;
            Report.failure('Fracaso', message, 'Okey');
            setErrorDelete(null);
        }

        setOpenDialog(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, resDelete, errorDelete]);

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
            <DialogConfirmation
                open={openDialog}
                setOpen={setOpenDialog}
                handleClickClose={handleCloseDialog}
                handleDelete={handleDelete}
                loading={loadingDelete}
                textContent={TEXTO_MODAL}
                id={dataDialog}
            />
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
