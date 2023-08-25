import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { DateTimePickerMemo } from '../memo'

function DateTimePicker({ name, isArray, label, ...others }) {
  const methods = useFormContext()
  return (
    <DateTimePickerMemo
      name={name}
      isArray={isArray}
      label={label}
      methods={methods}
      {...others}
    />
  )
}

export default DateTimePicker

DateTimePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  others: PropTypes.object,
  isArray: PropTypes.bool
}
