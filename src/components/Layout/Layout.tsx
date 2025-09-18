import React from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
  padding?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  backgroundColor = '#eb8317',
  padding = '2rem 4.5rem',
}) => {
  return (
    <LayoutContainer backgroundColor={backgroundColor} padding={padding}>
      {children}
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div<{ backgroundColor: string; padding: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: 100vh;
  padding: ${({ padding }) => padding};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
`;

export default Layout;