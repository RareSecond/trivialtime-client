import styled from 'styled-components';

const Button = styled.button`
  color: ${props => props.theme.clouds};
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 15px;
  border: none;
  opacity: ${props => (props.notIndicated ? 0.3 : 1)};
  background-color: ${props => props.theme[props.bgColor]};

  &:focus {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.4);
    outline: none;
  }
`;

export default Button;
