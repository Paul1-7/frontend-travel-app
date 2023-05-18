import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import CheckboxMemo from '../memo/CheckboxMemo';

const Checkbox = ({ name, isArray, label, disabled, items, ...others }) => {
    const methods = useFormContext();
    return <CheckboxMemo name={name} label={label} methods={methods} {...others} items={items} isArray={isArray} disabled={disabled} />;
};

export default Checkbox;

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    others: PropTypes.object,
    isArray: PropTypes.bool,
    disabled: PropTypes.bool
};
