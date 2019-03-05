import React from 'react';
import styled from 'styled-components';
import BlockTitle from '../BlockTitle';
import BlockContent from '../BlockContent';
import BlockWrapper from '../BlockWrapper';
import ContentText from '../ContentText';
import useDbValue from '../useDbValue';

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
