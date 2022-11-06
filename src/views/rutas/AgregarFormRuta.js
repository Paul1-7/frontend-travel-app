import { Box, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import MainCard from '../../ui-component/cards/MainCard';
import Itinerario from '../../ui-component/Itinerario';
import MuiTypography from '@material-ui/core/Typography';
import useAxios from '../../hooks/useAxios';
import axios from '../../apis';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@material-ui/lab';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import schema from '../../schemas';
import Input from '../../ui-component/forms/container/Input';
import { ITEMS_RADIO_GROUP } from '../../constants/inputs';
import RadioGroup from '../../ui-component/forms/container/RadioGroup';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useHistory } from 'react-router';
import useMapBox from '../../hooks/useMapBox';

const intialFormRutas = {
    titulo: '',
    descripcion: '',
    dias: '',
    horarios: '',
    duracion: '',
    precio: '',
    estado: '1',
    itinerarios: [
        {
            idLugar: '0',
            descripcion: '',
            horaInicio: '',
            horaFin: ''
        }
    ]
};

const AgregarFormRuta = () => {
    const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();
    const { mapRef, generateMarkers, deleteMarkers } = useMapBox({ initialMarker: false });

    const history = useHistory();
    const methods = useForm({
        resolver: yupResolver(schema.rutas),
        defaultValues: intialFormRutas,
        mode: 'all',
        criteriaMode: 'all',
        shouldFocusError: true
    });

    const onSubmit = (data) => {
        axiosFetchPost({
            axiosInstance: axios,
            method: 'post',
            url: '/api/v1/rutas',
            requestConfig: {
                ...data
            }
        });
    };

    useEffect(() => {
        let message = !Array.isArray(resPost) && !errorPost ? resPost?.message : null;

        if (message) {
            Report.success('Exito', message, 'Okey', () => {
                history.push('/rutas');
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resPost, errorPost]);

    return (
        <MainCard>
            <MuiTypography variant="h2" gutterBottom>
                Nueva ruta
            </MuiTypography>
            <Box sx={{ width: '100%', height: 400, marginBottom: '2rem' }} ref={mapRef}></Box>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Grid wrap="wrap" container spacing={2}>
                        <Input label="Titulo" name="titulo" />
                        <Input label="Descripción" name="descripcion" />
                        <Input label="Dias" name="dias" />
                        <Input label="Horarios" name="horarios" />
                        <Input label="Duracion" name="duracion" />
                        <Input label="Precio" name="precio" />
                        <RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
                    </Grid>
                    <Itinerario generateMarkers={generateMarkers} deleteMarkers={deleteMarkers} />
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
                    se guardo con exito
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

export default AgregarFormRuta;
