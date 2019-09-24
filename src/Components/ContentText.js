import styled from 'styled-components';

const ContentText = styled.div`
  font-size: 7vh;
  color: ${props => props.theme.wetAsphalt};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

export default ContentText;
