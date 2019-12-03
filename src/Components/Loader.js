import React from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  display: inline-block;
  transform: translateZ(1px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px;
`;

const pulse = keyframes`
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(26, 188, 156, 0.7);
    }

    70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(26, 188, 156, 0);
    }

    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(26, 188, 156, 0);
    }
`;

const Inner = styled.div`
  display: inline-block;
  margin: 8px;
  border-radius: 50%;
  animation: ${pulse} 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
`;

const Logo = styled.svg`
  width: 75px;
  height: 75px;
  fill: ${props => props.theme.turquoise};
`;

const Loader = ({ type }) => {
  return (
    <Wrapper>
      <Inner>
        {type === 'quizmaster' && (
          <Microphone />
        )}
        {type === 'players' && (
          <Players />
        )}
      </Inner>
    </Wrapper>
  );
};

export default Loader;
