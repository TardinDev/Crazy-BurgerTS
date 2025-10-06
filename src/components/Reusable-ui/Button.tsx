import React from 'react';
import styled, { css } from 'styled-components';
import LoadingSpinner from './LoadingSpinner';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isFullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      isFullWidth={isFullWidth}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="small" color={variant === 'primary' ? 'white' : '#eb8317'} />
          <span style={{ marginLeft: '8px' }}>Chargement...</span>
        </>
      ) : (
        <>
          {leftIcon && <IconWrapper position="left">{leftIcon}</IconWrapper>}
          {children}
          {rightIcon && <IconWrapper position="right">{rightIcon}</IconWrapper>}
        </>
      )}
    </StyledButton>
  );
};

const getVariantStyles = (variant: ButtonVariant) => {
  const styles = {
    primary: css`
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.text.white};
      border: 2px solid ${({ theme }) => theme.colors.primary};

      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.primaryDark};
        border-color: ${({ theme }) => theme.colors.primaryDark};
      }
    `,
    secondary: css`
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.text.white};
      border: 2px solid ${({ theme }) => theme.colors.secondary};

      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.gray[700]};
        border-color: ${({ theme }) => theme.colors.gray[700]};
      }
    `,
    outline: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.primary};
      border: 2px solid ${({ theme }) => theme.colors.primary};

      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.text.white};
      }
    `,
    ghost: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.text.primary};
      border: 2px solid transparent;

      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.background.muted};
      }
    `,
    danger: css`
      background-color: ${({ theme }) => theme.colors.error};
      color: ${({ theme }) => theme.colors.text.white};
      border: 2px solid ${({ theme }) => theme.colors.error};

      &:hover:not(:disabled) {
        background-color: #dc2626;
        border-color: #dc2626;
      }
    `,
  };

  return styles[variant];
};

const getSizeStyles = (size: ButtonSize) => {
  const styles = {
    sm: css`
      padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
      font-size: ${({ theme }) => theme.fontSize.sm};
      min-height: 24px;
    `,
    md: css`
      padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
      font-size: ${({ theme }) => theme.fontSize.md};
      min-height: 44px;
    `,
    lg: css`
      padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
      font-size: ${({ theme }) => theme.fontSize.lg};
      min-height: 52px;
    `,
  };

  return styles[size];
};

const StyledButton = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  isFullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  text-decoration: none;
  font-family: inherit;
  user-select: none;
  white-space: nowrap;

  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}

  ${({ isFullWidth }) =>
    isFullWidth &&
    css`
      width: 100%;
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

const IconWrapper = styled.span<{ position: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  ${({ position }) =>
    position === 'left'
      ? css`
          margin-right: -4px;
        `
      : css`
          margin-left: -4px;
        `}
`;

export default Button;