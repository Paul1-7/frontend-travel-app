import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import { Controller } from 'react-hook-form';
import { FormControlLabel, FormHelperText } from '@mui/material';
import { objectByString } from '../../../utils/dataHandler';
import { Checkbox, FormControl, FormGroup, FormLabel, useTheme } from '@material-ui/core';

const CheckboxMemo = memo(
    ({ name, isArray, label = '', methods, vertical = false, items, disabled = false, ...others }) => {
        const error = methods.formState.errors;
        const theme = useTheme();
        const SECONDARY_COLOR = theme.palette.secondary.main;
        const [checkedValues, setCheckedValues] = useState([]);

        const errorValue = isArray ? objectByString(error, name) : error[name];

        const handleSelect = (checkedName) => {
            const newNames = checkedValues?.includes(checkedName)
                ? checkedValues?.filter((name) => name !== checkedName)
                : [...(checkedValues ?? []), checkedName];
            setCheckedValues(newNames);

            return newNames;
        };

        return (
            <Controller
                name={name}
                control={methods.control}
                render={({ field }) => (
                    <FormControl component="fieldset" variant="standard" {...others}>
                        {label && (
                            <FormLabel component="legend" color="secondary">
                                {label}
                            </FormLabel>
                        )}
                        <FormGroup sx={vertical ? { flexDirection: 'row' } : {}}>
                            {items.map((item) => {
                                const [id, nombre] = Object.values(item);
                                return (
                                    <FormControlLabel
                                        key={id}
                                        control={
                                            <Checkbox
                                                checked={checkedValues.includes(id)}
                                                onChange={() => field.onChange(handleSelect(id))}
                                                size="small"
                                                disabled={disabled}
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
                                );
                            })}
                            <FormHelperText error={!!errorValue} color="error">
                                {errorValue?.message}
                            </FormHelperText>
                        </FormGroup>
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

export default CheckboxMemo;

CheckboxMemo.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    methods: PropTypes.object,
    others: PropTypes.object,
    isArray: PropTypes.bool,
    vertical: PropTypes.bool,
    disabled: PropTypes.bool
};
