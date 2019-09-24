import styled from 'styled-components';

const Content = styled.div`
  background-color: ${props => props.theme.clouds};
  padding: 10px 30px;
  border-radius: 10px;
  flex-grow: 1;
  display: flex;
  align-items: ${props => (!props.noCenter ? 'center' : 'flex-start')};
  justify-content: ${props => (!props.center ? 'flex-start' : 'center')};
  flex-direction: column;
  box-shadow: 7px 7px 0px #bdc3c7;
`;

export default Content;
