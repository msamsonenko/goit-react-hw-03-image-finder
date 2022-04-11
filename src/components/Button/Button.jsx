import { LoadMoreBtn } from './Button.styled';
import PropTypes from 'prop-types';
const Button = ({ btnText, onSubmit }) => {
  return (
    <LoadMoreBtn type="button" onClick={() => onSubmit()}>
      {btnText}
    </LoadMoreBtn>
  );
};
Button.propTypes = {
  btnText: PropTypes.string,
  onSubmit: PropTypes.func,
};
export default Button;
