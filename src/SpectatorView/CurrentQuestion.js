import React, { useState } from 'react';
import styled from 'styled-components';
import BlockTitle from '../BlockTitle';
import BlockContent from '../BlockContent';
import BlockWrapper from '../BlockWrapper';
import ContentText from '../ContentText';
import usePusher from '../usePusher';

const Wrapper = styled(BlockWrapper)`
  grid-column: 6 / span 1;
  grid-row: 1 / span 1;
`;

const CurrentQuestion = ({ questionNumber }) => {
  const [question, setQuestion] = useState(1);

  usePusher('next-question', data => setQuestion(data.currentQuestion));
  return (
    <Wrapper>
      <BlockTitle>Current Question</BlockTitle>
      <BlockContent center>
        <ContentText>
          {question}
          /6
        </ContentText>
      </BlockContent>
    </Wrapper>
  );
};

export default CurrentQuestion;
