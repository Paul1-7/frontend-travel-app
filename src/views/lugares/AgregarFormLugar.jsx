import { Box, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import MainCard from '../../ui-component/cards/MainCard';
import MuiTypography from '@material-ui/core/Typography';
import useAxios from '../../hooks/useAxios';
// import axios from '../../apis';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@material-ui/lab';
import { FormProvider, useForm } from 'react-hook-form';
import schema from '../../schemas';
import Input from '../../ui-component/forms/container/Input';
import { ITEMS_RADIO_GROUP } from '../../constants/inputs';
import RadioGroup from '../../ui-component/forms/container/RadioGroup';

import { Report } from 'notiflix/build/notiflix-report-aio';
import { useHistory } from 'react-router';
import useMapBox from '../../hooks/useMapBox';

const initialForm = {
    nombre: '',
    direccion: '',
    horariosAtencion: '',
    estado: '1'
};

const AgregarFormLugar = () => {
    const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();

    const { mapRef, getLngLatMarker } = useMapBox();
    const history = useHistory();

    const methods = useForm({
        resolver: yupResolver(schema.lugares),
        defaultValues: initialForm,
        mode: 'all',
        criteriaMode: 'all'
    });

    const onSubmit = (data) => {
        const newData = { lugar: data, punto: getLngLatMarker(0) };
        console.log('TCL: onSubmit -> data', newData);

        // axiosFetchPost({
        //     axiosInstance: axios,
        //     method: 'post',
        //     url: '/api/v1/lugares',
        //     requestConfig: {
        //         ...newData
        //     }
        // });
    };

    useEffect(() => {
        let message = !Array.isArray(resPost) && !errorPost ? resPost?.message : null;

        if (message) {
            Report.success('Exito', message, 'Okey', () => {
                history.push('/lugares');
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resPost, errorPost]);

    return (
        <MainCard>
            <MuiTypography variant="h2" gutterBottom>
                Nuevo lugar
            </MuiTypography>
            <Box sx={{ width: '100%', height: 400, marginBottom: '2rem' }} ref={mapRef}></Box>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Grid wrap="wrap" container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Input label="Nombre" name="nombre" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input label="Dirección" name="direccion" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input label="Horarios de atención" name="horariosAtencion" />
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
        </MainCard>
    );
};

export default AgregarFormLugar;
