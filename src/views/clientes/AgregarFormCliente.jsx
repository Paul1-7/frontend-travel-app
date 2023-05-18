import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import MainCard from '../../ui-component/cards/MainCard';
import MuiTypography from '@material-ui/core/Typography';
import useAxios from '../../hooks/useAxios';
import axios from '../../apis';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@material-ui/lab';
import { FormProvider, useForm } from 'react-hook-form';
import schema from '../../schemas';
import Input from '../../ui-component/forms/container/Input';
import { ITEMS_RADIO_GROUP } from '../../constants/inputs';
import RadioGroup from '../../ui-component/forms/container/RadioGroup';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useHistory } from 'react-router';

const initialForm = {
    nombre: '',
    apellido: '',
    ci: '',
    telefono: '',
    estado: '1'
};

const AgregarFormClinte = () => {
    const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();
    const history = useHistory();

    const methods = useForm({
        resolver: yupResolver(schema.clientes),
        defaultValues: initialForm,
        mode: 'all',
        criteriaMode: 'all'
    });

    useEffect(() => {
        let message = !Array.isArray(resPost) && !errorPost ? resPost?.message : null;

        if (message) {
            Report.success('Exito', message, 'Okey', () => {
                history.push('/clientes');
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resPost, errorPost]);

    const onSubmit = (data) => {
        axiosFetchPost({
            axiosInstance: axios,
            method: 'post',
            url: '/api/v1/clientes',
            requestConfig: {
                ...data
            }
        });
    };

    return (
        <MainCard>
            <MuiTypography variant="h2" gutterBottom>
                Nuevo cliente
            </MuiTypography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Grid wrap="wrap" container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Input label="Nombre" name="nombre" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input label="Apellido" name="apellido" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input label="Carnet de identidad" name="ci" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input label="Teléfono" name="telefono" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
                        </Grid>
                    </Grid>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <LoadingButton
                            type="submit"
                            loading={loadingPost}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            color="secondary"
                            variant="outlined"
                        >
                            Guardar
                        </LoadingButton>
                    </div>
                </form>
            </FormProvider>
            {/* {!loadingPost && !errorPost && !Array.isArray(resPost) && (
                <Alert severity="success" sx={{ position: 'absolute', zIndex: 9999 }} variant="filled">
                    {resPost?.message}
                </Alert>
            )}
            {!loadingPost && errorPost && Array.isArray(resPost) && (
                <Alert severity="error" sx={{ position: 'absolute', zIndex: 9999 }} variant="filled">
                    ocurrio un error
                </Alert>
            )} */}
        </MainCard>
    );
};

export default AgregarFormClinte;
