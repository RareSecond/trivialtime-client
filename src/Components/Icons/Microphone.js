import React from 'react';
import styled from 'styled-components';

const Logo = styled.svg`
  width: 75px;
  height: 75px;
  fill: ${props => props.theme.turquoise};
`;

const Microphone = () => {
  return (
    <Logo viewBox="-105 0 487 487.484">
      <path d="m276.242188 202v-36c0-3.3125-2.6875-6-6-6h-46v-74c0-47.496094-38.503907-86-86-86-47.496094 0-86 38.503906-86 86v74h-46c-3.3125 0-6 2.6875-6 6v36c0 69.136719 51.101562 126.554688 117.519531 136.476562v68.320313h-29.519531c-17.390626.023437-32.285157 12.460937-35.414063 29.566406-23.0625 2.476563-40.554687 21.925781-40.585937 45.121094 0 3.3125 2.6875 6 6 6h240c3.3125 0 6-2.6875 6-6-.03125-23.195313-17.523438-42.644531-40.585938-45.121094-3.128906-17.105469-18.023438-29.542969-35.414062-29.566406h-29.519532v-68.320313c66.417969-9.921874 117.519532-67.339843 117.519532-136.476562zm-52-30h18v10h-18zm-160 0h39.375c3.316406 0 6-2.6875 6-6s-2.683594-6-6-6h-39.375v-8h39.375c3.316406 0 6-2.6875 6-6s-2.683594-6-6-6h-39.375v-8h39.375c3.316406 0 6-2.6875 6-6s-2.683594-6-6-6h-39.375v-8h39.375c3.316406 0 6-2.6875 6-6s-2.683594-6-6-6h-39.375v-8h39.375c3.316406 0 6-2.6875 6-6s-2.683594-6-6-6h-39.109376c3.113282-38.414062 35.195313-68 73.734376-68 38.539062 0 70.621093 29.585938 73.734374 68h-39.109374c-3.316407 0-6 2.6875-6 6s2.683593 6 6 6h39.375v8h-39.375c-3.316407 0-6 2.6875-6 6s2.683593 6 6 6h39.375v8h-39.375c-3.316407 0-6 2.6875-6 6s2.683593 6 6 6h39.375v8h-39.375c-3.316407 0-6 2.6875-6 6s2.683593 6 6 6h39.375v8h-39.375c-3.316407 0-6 2.6875-6 6s2.683593 6 6 6h39.375v30c0 40.867188-33.132813 74-74 74-40.871094 0-74-33.132812-74-74zm-30 0h18v10h-18zm0 22h18v8c0 47.496094 38.503906 86 86 86 47.496093 0 86-38.503906 86-86v-8h18v8c0 57.4375-46.5625 104-104 104s-104-46.5625-104-104zm184.625 254.109375c16.113281.019531 29.917968 11.53125 32.835937 27.375h-226.921875c2.917969-15.84375 16.722656-27.355469 32.835938-27.375zm-30.625-29.3125c10.671874.015625 20.058593 7.066406 23.042968 17.3125h-146.089844c2.988282-10.246094 12.375-17.296875 23.046876-17.3125zm-58.480469-12v-67.066406c2.804687.171875 5.632812.269531 8.480469.269531 2.847656 0 5.675781-.101562 8.480468-.269531v67.066406zm8.480469-78.800781c-69.554688-.078125-125.921876-56.445313-126-126v-30h10v30c0 64.066406 51.933593 116 116 116 64.066406 0 116-51.933594 116-116v-30h10v30c-.078126 69.558594-56.445313 125.925781-126 126.003906zm0 0" />
    </Logo>
  );
};

export default Microphone;