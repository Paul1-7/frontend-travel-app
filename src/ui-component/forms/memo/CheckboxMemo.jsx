import { memo, useState } from 'react'
import PropTypes from 'prop-types'

import { Controller } from 'react-hook-form'
import { objectByString } from '@/utils/dataHandler'
import {
  Checkbox,
  FormControl,
  FormGroup,
  FormLabel,
  useTheme,
  FormControlLabel,
  FormHelperText
} from '@material-ui/core'

const CheckboxMemo = memo(
  ({
    name,
    isArray,
    label = '',
    methods,
    vertical = false,
    items = [],
    disabled = false,
    ...others
  }) => {
    const error = methods.formState.errors
    const theme = useTheme()
    const SECONDARY_COLOR = theme.palette.secondary.main
    const [checkedValues, setCheckedValues] = useState([])
    // console.log(`items ${name}`, items);
    const errorValue = isArray ? objectByString(error, name) : error[name]

    const handleSelect = (checkedName) => {
      const newNames = checkedValues?.includes(checkedName)
        ? checkedValues?.filter((name) => name !== checkedName)
        : [...(checkedValues ?? []), checkedName]
      setCheckedValues(newNames)

      return newNames
    }

    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => (
          <>
            <FormControl component="fieldset" variant="standard" {...others}>
              {label && (
                <FormLabel component="legend" color="secondary">
                  {label}
                </FormLabel>
              )}
              <FormGroup sx={vertical ? { flexDirection: 'row' } : {}}>
                {items.map((item, index) => {
                  const [id, nombre] = Object.values(item)
                  // if ('idHorarioAux' in item) {
                  //     item.idHorario = item.idHorarioAux;
                  //     item.checkedDia = handleSelect(item[0])
                  // }
                  // console.log(`check ${name}`, field.value?.[index]);
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={checkedValues.includes(id)}
                          onChange={() => field.onChange(handleSelect(id))}
                          // onChange={field.onChange}
                          size="small"
                          disabled={disabled}
                          // value={field.value}
                          sx={{
                            color: SECONDARY_COLOR,
                            '&.Mui-checked': {
                              color: SECONDARY_COLOR
                            }
                          }}
                        />
                      }
                      label={nombre}
                    />
                  )
                })}
              </FormGroup>
            </FormControl>
            <FormHelperText
              error={!!errorValue}
              color="error"
              sx={{ position: 'relative', top: '-10px' }}
            >
              {errorValue?.message ?? ' '}
            </FormHelperText>
          </>
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

export default CheckboxMemo

CheckboxMemo.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  items: PropTypes.array.isRequired,
  methods: PropTypes.object,
  others: PropTypes.object,
  isArray: PropTypes.bool,
  vertical: PropTypes.bool,
  disabled: PropTypes.bool
}
