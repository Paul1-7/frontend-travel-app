import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import InputMemo from '../memo/InputMemo';

const Input = ({ name, isArray, label, ...others }) => {
  const methods = useFormContext();
  return <InputMemo name={name} label={label} isArray={isArray} methods={methods} {...others} />;
};

export default Input;

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  others: PropTypes.node,
  isArray: PropTypes.bool,
};
