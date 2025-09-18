import React from 'react';
import styled, { css } from 'styled-components';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
}) => {
  return (
    <StyledBadge variant={variant} size={size} className={className}>
      {children}
    </StyledBadge>
  );
};

const getVariantStyles = (variant: BadgeVariant) => {
  const styles = {
    default: css`
      background-color: ${({ theme }) => theme.colors.gray[100]};
      color: ${({ theme }) => theme.colors.text.secondary};
    `,
    primary: css`
      background-color: ${({ theme }) => theme.colors.primary}20;
      color: ${({ theme }) => theme.colors.primary};
    `,
    success: css`
      background-color: ${({ theme }) => theme.colors.success}20;
      color: ${({ theme }) => theme.colors.success};
    `,
    warning: css`
      background-color: ${({ theme }) => theme.colors.warning}20;
      color: ${({ theme }) => theme.colors.warning};
    `,
    error: css`
      background-color: ${({ theme }) => theme.colors.error}20;
      color: ${({ theme }) => theme.colors.error};
    `,
  };

  return styles[variant];
};

const getSizeStyles = (size: BadgeSize) => {
  const styles = {
    sm: css`
      padding: ${({ theme }) => `2px ${theme.spacing.sm}`};
      font-size: ${({ theme }) => theme.fontSize.xs};
      min-height: 20px;
    `,
    md: css`
      padding: ${({ theme }) => `4px ${theme.spacing.md}`};
      font-size: ${({ theme }) => theme.fontSize.sm};
      min-height: 24px;
    `,
    lg: css`
      padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
      font-size: ${({ theme }) => theme.fontSize.md};
      min-height: 32px;
    `,
  };

  return styles[size];
};

const StyledBadge = styled.span<{
  variant: BadgeVariant;
  size: BadgeSize;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  white-space: nowrap;

  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}
`;

export default Badge;