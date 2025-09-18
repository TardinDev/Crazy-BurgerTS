import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = '#eb8317',
  text,
}) => {
  const spinnerSize = {
    small: '20px',
    medium: '40px',
    large: '60px',
  }[size];

  return (
    <Container>
      <Spinner size={spinnerSize} color={color} />
      {text && <LoadingText>{text}</LoadingText>}
    </Container>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Spinner = styled.div<{ size: string; color: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border: 3px solid #f3f3f3;
  border-top: 3px solid ${({ color }) => color};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0;
`;

// Composant pour les états de chargement de page
export const PageLoader: React.FC = () => (
  <PageLoaderContainer>
    <LoadingSpinner size="large" text="Chargement..." />
  </PageLoaderContainer>
);

const PageLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  width: 100%;
`;

// Composant pour les boutons avec état de chargement
interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  onClick,
  disabled,
  variant = 'primary',
}) => (
  <Button
    onClick={onClick}
    disabled={disabled || isLoading}
    variant={variant}
  >
    {isLoading ? (
      <>
        <LoadingSpinner size="small" color="white" />
        <span style={{ marginLeft: '8px' }}>Chargement...</span>
      </>
    ) : (
      children
    )}
  </Button>
);

const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;

  background-color: ${({ variant }) =>
    variant === 'primary' ? '#eb8317' : '#f8f9fa'};
  color: ${({ variant }) => (variant === 'primary' ? 'white' : '#333')};

  &:hover:not(:disabled) {
    background-color: ${({ variant }) =>
      variant === 'primary' ? '#d4741a' : '#e9ecef'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default LoadingSpinner;