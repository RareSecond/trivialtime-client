import React from 'react';
import styled from 'styled-components';
import BlockTitle from '../Components/BlockTitle';
import BlockContent from '../Components/BlockContent';
import BlockWrapper from '../Components/BlockWrapper';
import ContentText from '../Components/ContentText';
import useDbValue from '../Data/useDbValue';

const Wrapper = styled(BlockWrapper)`
  grid-column: 6 / span 1;
  grid-row: 1 / span 1;
`;

const CurrentQuestion = () => {
  const currentQuestion = useDbValue('currentQuestion');
  return (
    <Wrapper>
      <BlockTitle>Current Question</BlockTitle>
      <BlockContent center>
        <ContentText>
          {currentQuestion}
          /6
        </ContentText>
      </BlockContent>
    </Wrapper>
  );
};

export default CurrentQuestion;
