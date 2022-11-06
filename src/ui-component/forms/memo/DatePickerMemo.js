import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Controller } from 'react-hook-form';
import { FormHelperText, Grid, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { objectByString } from '../../../utils/dataHandler';

const convertValueToEvent = (name, value) => ({
    target: {
        name,
        value
    }
});

const DatePickerMemo = memo(
    ({ name, isArray, label, methods, ...others }) => {
        const error = methods.formState.errors;

        const errorValue = isArray ? objectByString(error, name) : error[name];

        return (
            <Grid item xs={12} md={6}>
                <Controller
                    name={name}
                    control={methods.control}
                    render={({ field }) => (
                        <>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label={label}
                                    {...field}
                                    {...others}
                                    onChange={(value) => field.onChange(convertValueToEvent('fechaInicio', value))}
                                    renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                                />
                            </LocalizationProvider>
                            <FormHelperText error={errorValue} color="error">
                                {errorValue?.message}
                            </FormHelperText>
                        </>
                    )}
                />
            </Grid>
        );
    },
    (prevProps, nextProps) =>
        prevProps.methods.formState.isDirty === nextProps.methods.formState.isDirty &&
        prevProps.methods.formState.errors !== nextProps.methods.formState.errors
);

export default DatePickerMemo;

DatePickerMemo.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    methods: PropTypes.object,
    others: PropTypes.object,
    isArray: PropTypes.bool
};
