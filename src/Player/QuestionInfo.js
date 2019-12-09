import React, { useState } from 'react';
import styled from 'styled-components';
import { MdSdStorage } from 'react-icons/md';
import useDbValue from '../Data/useDbValue';

const Wrapper = styled.div``;

const InfoIconWrapper = styled.div`
  z-index: 20;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px;
`;

const InfoIcon = styled(MdSdStorage)`
  color: ${props => props.theme.turquoise};
  font-size: 40px;
`;

const InfoWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const QuestionNumber = styled.div`
  color: ${props => props.theme.midnightBlue};
  font-size: 15px;
`;

const QuestionCategory = styled.div`
  font-size: 35px;
  color: ${props => props.theme.turquoise};
`;

const catgories = [
  'Aardrijkskunde',
  'Amusement',
  'Geschiedenis',
  'Kunst & Literatuur',
  'Wetenschap & Natuur',
  'Sport & Ontspanning',
];

const QuestionInfo = () => {
  const [infoVisible, setInfoVisible] = useState(false);
  const currentQuestion = useDbValue('currentQuestion');

  return (
    <Wrapper>
      {infoVisible && (
        <InfoWrapper>
          <QuestionNumber>Vraag {currentQuestion}</QuestionNumber>
          <QuestionCategory>{catgories[currentQuestion - 1]}</QuestionCategory>
        </InfoWrapper>
      )}
      <InfoIconWrapper>
        <InfoIcon
          onTouchStart={() => setInfoVisible(true)}
          onTouchEnd={() => setInfoVisible(false)}
        />
      </InfoIconWrapper>
    </Wrapper>
  );
};

export default QuestionInfo;
