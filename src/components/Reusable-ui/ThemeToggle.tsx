import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme} isDarkMode={isDarkMode}>
      <IconWrapper
        as={motion.div}
        initial={false}
        animate={{
          rotate: isDarkMode ? 360 : 0,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {isDarkMode ? <FaMoon size={18} /> : <FaSun size={18} />}
      </IconWrapper>
      <ToggleLabel>{isDarkMode ? 'Mode Sombre' : 'Mode Clair'}</ToggleLabel>
    </ToggleButton>
  );
};

const ToggleButton = styled.button<{ isDarkMode: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: ${(props) =>
    props.isDarkMode
      ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
      : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'};
  border: 2px solid ${(props) => (props.isDarkMode ? '#475569' : '#fbbf24')};
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) =>
    props.isDarkMode
      ? '0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      : '0 4px 12px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) =>
      props.isDarkMode
        ? '0 6px 16px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
        : '0 6px 16px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'};
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    gap: 8px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.primary};
`;

const ToggleLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

export default ThemeToggle;
