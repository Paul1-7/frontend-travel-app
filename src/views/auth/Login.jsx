import { bgLogin } from '@/assets/images'
import { ROUTES, initialFormLogin } from '@/constants'
import { useAuth } from '@/hooks'
import schema from '@/schemas'
import { sendCredencials } from '@/services'
import { Form, Input } from '@/ui-component'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Card, CardContent, Stack, Typography } from '@material-ui/core'
import { LoadingButton } from '@material-ui/lab'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  const { mutate, isLoading, data } = useMutation({
    mutationFn: (data) => {
      return sendCredencials({ data })
    }
  })

  const { login } = useAuth()

  const methods = useForm({
    resolver: yupResolver(schema.login),
    defaultValues: initialFormLogin,
    mode: 'all',
    criteriaMode: 'all'
  })

  const handleSubmit = (data) => {
    mutate(data)
  }

  useEffect(() => {
    if (!data) return

    login(data.data)
    history.push(ROUTES.routes.default)
  }, [data])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: 4,
        flexDirection: 'column',
        backgroundImage: `url(${bgLogin})`,
        objectFit: 'cover'
      }}
    >
      <Typography variant="h1" sx={{ color: 'white' }}>
        Inicio de sesión
      </Typography>
      <Card
        variant="outlined"
        sx={{
          maxWidth: '30rem',
          width: '25rem',
          backgroundColor: 'rgba(255,255,255,.7)'
        }}
      >
        <CardContent>
          <Form methods={methods} onSubmit={handleSubmit}>
            <Stack gap={2}>
              <Input name={'usuario'} label={'Usuario'} />
              <Input name={'password'} label={'Contraseña'} type={'password'} />
              <LoadingButton
                type="submit"
                loading={isLoading}
                loadingPosition="start"
                color="secondary"
                variant="outlined"
              >
                Iniciar sesión
              </LoadingButton>
            </Stack>
          </Form>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Login
