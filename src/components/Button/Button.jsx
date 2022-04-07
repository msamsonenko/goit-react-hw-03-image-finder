import { LoadMoreBtn } from './Button.styled';
const Button = ({ btnText, onSubmit }) => {
  return (
    <LoadMoreBtn type="button" onClick={() => onSubmit()}>
      {btnText}
    </LoadMoreBtn>
  );
};
export default Button;
