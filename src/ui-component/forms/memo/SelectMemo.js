import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import { objectByString } from '../../../utils/dataHandler';

const SelectMemo = memo(
    ({ name, label, isArray, methods, onChange, items, ...others }) => {
        const error = methods.formState.errors;

        const errorValue = isArray ? objectByString(error, name) : error[name];

        return (
            <Controller
                name={name}
                control={methods.control}
                render={({ field }) => (
                    <FormControl fullWidth size="small">
                        <InputLabel id={name} color="secondary">
                            {label}
                        </InputLabel>
                        <Select
                            labelId={name}
                            {...field}
                            label={label}
                            onChange={(value) => {
                                field.onChange(value);
                                onChange?.(value.target);
                            }}
                            color="secondary"
                            value={field.value}
                            {...others}
                        >
                            <MenuItem value="0" color="secondary">
                                Ninguno
                            </MenuItem>
                            {items.map((item, index) => (
                                <MenuItem key={index} value={item.id} color="secondary">
                                    {item.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText error={!errorValue} color="error">
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

export default SelectMemo;

SelectMemo.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    methods: PropTypes.object,
    others: PropTypes.object,
    isArray: PropTypes.bool
};
