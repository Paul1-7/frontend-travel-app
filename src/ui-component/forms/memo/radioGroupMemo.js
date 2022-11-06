import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Controller } from 'react-hook-form';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';
import { objectByString } from '../../../utils/dataHandler';

const RadioGroupMemo = memo(
    ({ name, isArray, label, methods, items, ...others }) => {
        const error = methods.formState.errors;

        const errorValue = isArray ? objectByString(error, name) : error[name];
        return (
            <Grid item xs={12} md={6}>
                <Controller
                    name={name}
                    control={methods.control}
                    render={({ field }) => (
                        <FormControl>
                            <FormLabel id={name}>{label}</FormLabel>
                            <RadioGroup
                                aria-labelledby={name}
                                {...field}
                                onChange={(event, value) => field.onChange(value)}
                                value={field.value}
                                {...others}
                            >
                                {items.map((item) => (
                                    <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
                                ))}
                            </RadioGroup>
                            <FormHelperText error={errorValue} color="error">
                                {errorValue?.message}
                            </FormHelperText>
                        </FormControl>
                    )}
                />
            </Grid>
        );
    },
    (prevProps, nextProps) =>
        prevProps.methods.formState.isDirty === nextProps.methods.formState.isDirty &&
        prevProps.methods.formState.errors !== nextProps.methods.formState.errors
);

export default RadioGroupMemo;

RadioGroupMemo.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    methods: PropTypes.object,
    others: PropTypes.object,
    isArray: PropTypes.bool
};
