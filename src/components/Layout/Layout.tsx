import React from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
  padding?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  padding = '2rem 4.5rem',
}) => {
  return (
    <LayoutContainer padding={padding}>
      {children}
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div<{ padding: string }>`
  background: ${({ theme }) => theme.colors.primary};
  height: 100vh;
  padding: ${({ padding }) => padding};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  transition: background ${({ theme }) => theme.transitions.normal};

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export default Layout;