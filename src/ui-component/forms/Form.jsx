import PropTypes from 'prop-types'
import { FormProvider } from 'react-hook-form'

function Form({ methods, onSubmit, children, ...props }) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  )
}

Form.propTypes = {
  methods: PropTypes.object,
  onSubmit: PropTypes.func,
  children: PropTypes.node
}

export default Form
