import PropTypes from 'prop-types'
import { Box, Button, Grid, Modal, Stack, Typography } from '@mui/material'
import { Save } from '@mui/icons-material'
import { Form, Select } from '@/ui-component'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
}

const PlacesScheduleForm = ({
  isOpen,
  onClose,
  isLoading,
  places,
  methods,
  onSubmit,
  isUpdateEvent,
  openDialog
}) => {
  return (
    <Modal open={isOpen}>
      <Form methods={methods} onSubmit={onSubmit}>
        <Box sx={{ ...style, width: 400 }}>
          <Typography textAlign={'center'} variant="h5" mb={2}>
            {isUpdateEvent ? 'Modificar horario' : 'Agregar nuevo horario'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Select
                label="seleccione un lugar"
                name="idLugar"
                items={places}
              />
            </Grid>
          </Grid>
          {isUpdateEvent && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                openDialog()
                onClose()
              }}
              sx={{ mb: 4, mt: 1 }}
            >
              Eliminar horario
            </Button>
          )}
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="outlined" color="error" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              loadingPosition="start"
              startIcon={<Save />}
              color="secondary"
              variant="outlined"
            >
              Guardar
            </Button>
          </Stack>
        </Box>
      </Form>
    </Modal>
  )
}

PlacesScheduleForm.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  isLoading: PropTypes.bool,
  places: PropTypes.array,
  methods: PropTypes.object,
  onSubmit: PropTypes.func,
  isUpdateEvent: PropTypes.bool,
  openDialog: PropTypes.func
}

export default PlacesScheduleForm
