import { memo } from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  Box,
  Chip,
  MenuItem,
  OutlinedInput
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { objectByString } from '@/utils/dataHandler'

const SelectChipMemo = memo(
  ({ name, label, methods, isArray, items, ...others }) => {
    const error = methods.formState.errors

    const errorValue = isArray ? objectByString(error, name) : error[name]

    const handleChange = (event, field) => {
      const {
        target: { value }
      } = event

      field.onChange(value)
    }

    const itemName = (value) => {
      const found = items.find((item) => {
        const valueObject = Object.values(item)
        return valueObject[0] === value
      })
      return Object.values(found)[1]
    }

    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => {
          return (
            <FormControl sx={{ width: '100%' }} size="small">
              <InputLabel id={name} color="secondary">
                {label}
              </InputLabel>
              <Select
                multiple
                labelId={name}
                {...field}
                id={`multiple-chip-${name}`}
                color="secondary"
                input={
                  <OutlinedInput id={`multiple-chip-${name}`} label={name} />
                }
                onChange={(event) => handleChange(event, field)}
                value={field.value ?? []}
                {...others}
                renderValue={(selected) => {
                  return (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={itemName(value)}
                          color="secondary"
                          size="small"
                        />
                      ))}
                    </Box>
                  )
                }}
              >
                {items.map((item) => {
                  const value = Object.values(item)
                  return (
                    <MenuItem key={value?.[0]} value={value?.[0]}>
                      {value?.[1]}
                    </MenuItem>
                  )
                })}
              </Select>
              <FormHelperText error={!!errorValue} color="error">
                {errorValue?.message ?? ' '}
              </FormHelperText>
            </FormControl>
          )
        }}
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
SelectChipMemo.displayName = 'SelectChipMemo'
export default SelectChipMemo

SelectChipMemo.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  methods: PropTypes.object,
  others: PropTypes.object,
  isArray: PropTypes.bool
}
