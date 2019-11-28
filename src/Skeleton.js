import React from 'react';
import styled from 'styled-components';
import Theme from './Theme';

const Wrapper = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  font-family: 'Viga';
  background-image: url('http://4.bp.blogspot.com/-6VN3qOYDjiI/VlCHGFnrH0I/AAAAAAAAFRg/OBJ2r-RwJPA/w768-h1024-c/abstract-blue-purple-texture-lockscreen-android-wallpaper.jpg');
  background-size: cover;
`;

const Menu = styled.div`
  height: 100%;
  width: 300px;
  background-color: ${props => props.theme.midnightBlue};
  padding: 20px 40px;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const Title = styled.h1`
  font-family: 'Titan One';
  color: ${props => props.theme.clouds};
  text-transform: uppercase;
  font-size: 3em;
  text-align: center;
  line-height: 0.8;
`;

const TitleTime = styled.span`
  font-size: 1.7em;
`;

const Footer = styled.div`
  text-align: center;
  color: ${props => props.theme.silver};
  font-family: 'Viga';
  font-size: 0.8em;
`;

const Skeleton = ({ children }) => {
  return (
    <Theme>
      <Wrapper>
        <Menu>
          <Title>
            Trivial <TitleTime>Time</TitleTime>
          </Title>
          <Footer>Created by Jasper Dansercoer</Footer>
        </Menu>
        {children}
      </Wrapper>
    </Theme>
  );
};

export default Skeleton;
