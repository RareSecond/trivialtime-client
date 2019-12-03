import styled from 'styled-components';

const Box = styled.div`
  width: 100%;
  padding: ${props => props.padding || 20}px;
  background-color: ${props => props.theme.clouds};
  border-radius: 15px;
  box-shadow: 0px 2px 10px rgba(100, 100, 100, 0.7);
`;

export default Box;
