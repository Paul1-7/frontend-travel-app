import { Box, Grid } from '@material-ui/core'
import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import MainCard from '../../ui-component/cards/MainCard'
import Itinerario from '../../ui-component/Itinerario'
import MuiTypography from '@material-ui/core/Typography'
import useAxios from '../../hooks/useAxios'
import axios from '../../apis'
import SaveIcon from '@mui/icons-material/Save'
import { LoadingButton } from '@material-ui/lab'
import { FormProvider, useForm } from 'react-hook-form'
import schema from '../../schemas'
import Input from '../../ui-component/forms/container/Input'
import { ITEMS_RADIO_GROUP } from '../../constants/inputs'
import RadioGroup from '../../ui-component/forms/container/RadioGroup'
import { Report } from 'notiflix/build/notiflix-report-aio'
import { useHistory } from 'react-router'
import useMapBox from '../../hooks/useMapBox'
import HorariosRutas from './HorariosRutas'

const intialFormRutas = {
  titulo: '',
  descripcion: '',
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
  ],
  horarios: []
}

const AgregarFormRuta = () => {
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios()

  const { mapRef, generateMarkers, deleteMarkers } = useMapBox({
    initialMarker: false
  })

  const history = useHistory()
  const methods = useForm({
    resolver: yupResolver(schema.rutas),
    defaultValues: intialFormRutas,
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: true,
    reValidateMode: 'onChange'
  })
  //  methods.formState.isValid
  // console.log('TCL: AgregarFormRuta -> methods err', methods.formState.errors);
  // console.log('TCL: AgregarFormRuta -> methods watc', methods.watch());

  const onSubmit = (data) => {
    const horarios = data.horarios
      .filter(({ checkedDia }) => checkedDia.length)
      .map(({ idDia, idHorario }) => ({
        idDia: idDia[0],
        idHorario
      }))
    const newData = { ...data, horarios }
    console.log({ newData })
    axiosFetchPost({
      axiosInstance: axios,
      method: 'post',
      url: '/api/v1/rutas',
      requestConfig: {
        ...newData
      }
    })
  }

  useEffect(() => {
    let message =
      !Array.isArray(resPost) && !errorPost ? resPost?.message : null

    if (message) {
      Report.success('Exito', message, 'Okey', () => {
        history.push('/rutas')
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resPost, errorPost])

  return (
    <MainCard>
      <MuiTypography variant="h2" gutterBottom>
        Nueva ruta
      </MuiTypography>
      <Box
        sx={{ width: '100%', height: 400, marginBottom: '2rem' }}
        ref={mapRef}
      ></Box>

      <>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid wrap="wrap" container spacing={2}>
              <Grid item lg={12}>
                <MuiTypography variant="h3" gutterBottom>
                  Datos de la ruta
                </MuiTypography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Input label="Titulo" name="titulo" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input label="Descripción" name="descripcion" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input label="Duracion" name="duracion" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input label="Precio" name="precio" />
              </Grid>
              <Grid item xs={12} md={6}>
                <RadioGroup
                  name="estado"
                  label="Estado"
                  items={ITEMS_RADIO_GROUP}
                />
              </Grid>
              <Grid item lg={12}>
                <MuiTypography variant="h3" gutterBottom>
                  Horarios
                </MuiTypography>
              </Grid>
              <Grid item lg={12}>
                <HorariosRutas />
              </Grid>
            </Grid>
            <Itinerario
              generateMarkers={generateMarkers}
              deleteMarkers={deleteMarkers}
            />
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
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
      </>
    </MainCard>
  )
}

export default AgregarFormRuta
