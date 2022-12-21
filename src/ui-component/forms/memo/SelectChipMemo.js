import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, InputLabel, Select, Box, Chip, MenuItem, OutlinedInput, useTheme } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { objectByString } from '../../../utils/dataHandler';

const SelectChipMemo = memo(
    ({ name, label, methods, isArray, items, ...others }) => {
        const error = methods.formState.errors;
        const theme = useTheme();
        const SECONDARY_COLOR = theme.palette.secondary.light;

        const errorValue = isArray ? objectByString(error, name) : error[name];

        const handleChange = (event, field) => {
            const {
                target: { value }
            } = event;

            field.onChange(value);
        };

        const itemName = (value) => {
            const found = items.find((item) => item.id === value);
            return found.nombre;
        };

        return (
            <Controller
                name={name}
                control={methods.control}
                render={({ field }) => (
                    <FormControl sx={{ width: '100%' }} size="small">
                        <InputLabel id={name} color="secondary">
                            {label}
                        </InputLabel>
                        <Select
                            multiple
                            labelId={name}
                            {...field}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            color="secondary"
                            onChange={(event) => handleChange(event, field)}
                            value={field.value}
                            size="small"
                            {...others}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={itemName(value)} color="secondary" size="small" />
                                    ))}
                                </Box>
                            )}
                        >
                            {items.map((item) => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id}
                                    color="secondary"
                                    sx={{
                                        '&.Mui-selected': {
                                            backgroundColor: SECONDARY_COLOR
                                        },
                                        '&.Mui-selected:hover': {
                                            backgroundColor: SECONDARY_COLOR
                                        }
                                    }}
                                >
                                    {item.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText error={!!errorValue} color="error">
                            {errorValue?.message}
                        </FormHelperText>
                    </FormControl>
                )}
            />
        );
    },
    (prevProps, nextProps) =>
        prevProps.methods.formState.isDirty === nextProps.methods.formState.isDirty &&
        prevProps.methods.formState.errors !== nextProps.methods.formState.errors &&
        prevProps.methods.formState.submitCount === nextProps.methods.formState.submitCount
);

export default SelectChipMemo;

SelectChipMemo.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    methods: PropTypes.object,
    others: PropTypes.object,
    isArray: PropTypes.bool
};
