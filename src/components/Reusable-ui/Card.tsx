import React from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
  fullHeight?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  shadow = 'md',
  hover = false,
  className,
  fullHeight = false,
}) => {
  return (
    <StyledCard
      padding={padding}
      shadow={shadow}
      hover={hover}
      className={className}
      fullHeight={fullHeight}
    >
      {children}
    </StyledCard>
  );
};

const getPaddingStyles = (padding: CardProps['padding']) => {
  const styles = {
    none: css`
      padding: 0;
    `,
    sm: css`
      padding: ${({ theme }) => theme.spacing.md};
    `,
    md: css`
      padding: ${({ theme }) => theme.spacing.lg};
    `,
    lg: css`
      padding: ${({ theme }) => theme.spacing.xl};
    `,
  };

  return styles[padding as keyof typeof styles];
};

const getShadowStyles = (shadow: CardProps['shadow']) => {
  const styles = {
    none: css`
      box-shadow: none;
    `,
    sm: css`
      box-shadow: ${({ theme }) => theme.shadows.sm};
    `,
    md: css`
      box-shadow: ${({ theme }) => theme.shadows.md};
    `,
    lg: css`
      box-shadow: ${({ theme }) => theme.shadows.lg};
    `,
  };

  return styles[shadow as keyof typeof styles];
};

const StyledCard = styled.div<{
  padding: CardProps['padding'];
  shadow: CardProps['shadow'];
  hover: boolean;
  fullHeight: boolean;
}>`
  background-color: #f8fafe;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: all ${({ theme }) => theme.transitions.normal};
  display: flex;
  flex-direction: column;
  ${({ fullHeight }) => fullHeight && 'height: 100%;'}

  ${({ padding }) => getPaddingStyles(padding)}
  ${({ shadow }) => getShadowStyles(shadow)}

  ${({ hover }) =>
    hover &&
    css`
      &:hover {
        transform: translateY(-2px);
        box-shadow: ${({ theme }) => theme.shadows.lg};
      }
    `}
`;

export default Card;