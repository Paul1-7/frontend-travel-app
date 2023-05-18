import { memo } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import { objectByString } from '@/utils/dataHandler'
import { TextField } from '@material-ui/core'

const InputMemo = memo(
  ({ name, isArray = false, label, methods, ...others }) => {
    const error = methods.formState.errors

    const errorValue = isArray ? objectByString(error, name) : error[name]

    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            label={label}
            value={field.value}
            onChange={field.onChange}
            color="secondary"
            error={!!errorValue}
            helperText={errorValue?.message ?? ' '}
            fullWidth
            size="small"
            {...others}
            {...field}
          />
        )}
      />
    )
  },
  (prevProps, nextProps) =>
    prevProps.methods.formState.isDirty ===
      nextProps.methods.formState.isDirty &&
    prevProps.methods.formState.errors !== nextProps.methods.formState.errors &&
    prevProps.methods.formState.submitCount ===
      nextProps.methods.formState.submitCount
)

export default InputMemo

InputMemo.propTypes = {
  name: PropTypes.string.isRequired,
  isArray: PropTypes.bool,
  label: PropTypes.string.isRequired,
  others: PropTypes.node,
  methods: PropTypes.object
}
