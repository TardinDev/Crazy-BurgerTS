import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  delay?: number;
  onSearch?: (debouncedValue: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Rechercher...',
  delay = 300,
  onSearch,
}) => {
  const debouncedValue = useDebounce(value, delay);

  React.useEffect(() => {
    if (onSearch) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  const handleClear = () => {
    onChange('');
  };

  return (
    <SearchContainer>
      <SearchIcon>
        <FaSearch size={16} color="#666" />
      </SearchIcon>
      <SearchInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <ClearButton onClick={handleClear} type="button">
          <FaTimes size={14} color="#666" />
        </ClearButton>
      )}
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  z-index: 1;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 40px;
  border: 2px solid #e1e5e9;
  border-radius: 25px;
  font-size: 14px;
  background-color: #f8f9fa;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #eb8317;
    background-color: white;
    box-shadow: 0 0 0 3px rgba(235, 131, 23, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export default SearchBar;