import React from 'react';
import styled from 'styled-components';

interface InputProps {
  type?: 'text' | 'number' | 'url' | 'email';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  required = false,
  disabled = false,
}) => {
  return (
    <InputContainer>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        hasIcon={!!icon}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 10px;
  z-index: 1;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{ hasIcon: boolean }>`
  width: 100%;
  padding: 12px ${({ hasIcon }) => (hasIcon ? '45px' : '12px')} 12px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #eb8317;
    box-shadow: 0 0 0 2px rgba(235, 131, 23, 0.2);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export default Input;