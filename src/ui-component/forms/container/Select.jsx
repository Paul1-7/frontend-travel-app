import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { SelectMemo } from '../memo'

function Select({
  name,
  isArray,
  propsContainer = {},
  onChange,
  label,
  items,
  ...others
}) {
  const methods = useFormContext()
  return (
    <SelectMemo
      name={name}
      label={label}
      isArray={isArray}
      methods={methods}
      items={items}
      onChange={onChange}
      propsContainer={propsContainer}
      {...others}
    />
  )
}

export default Select

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  others: PropTypes.object,
  isArray: PropTypes.bool,
  onChange: PropTypes.func,
  propsContainer: PropTypes.object
}
