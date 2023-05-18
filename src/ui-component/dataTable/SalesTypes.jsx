import { TableCell } from '@material-ui/core';
import PropTypes from 'prop-types';
import Label from '../Label';
import { TABLE_STATES } from '../../constants/dataTable';

const PaymentsMethods = ({ value, align }) => {
    const label = TABLE_STATES.salesTypes[value];
    return (
        <TableCell align={align}>
            <Label color={label.variant}>{label.name}</Label>
        </TableCell>
    );
};

export default PaymentsMethods;

PaymentsMethods.propTypes = {
    value: PropTypes.number,
    align: PropTypes.string
};
