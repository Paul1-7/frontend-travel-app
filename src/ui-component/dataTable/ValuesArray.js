import { TableCell } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';

const ValuesArray = ({ value, align }) => (
    <TableCell align={align}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {value.map((item, index) => (
                <div key={index}>
                    <Label color="info">{item}</Label>
                </div>
            ))}
        </div>
    </TableCell>
);

export default ValuesArray;

ValuesArray.propTypes = {
    value: PropTypes.array,
    align: PropTypes.string
};
