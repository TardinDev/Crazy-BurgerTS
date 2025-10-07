import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { SearchBar } from '../../../Reusable-ui/SearchBar';
import orderContext from '../../../../context/orderContext';
import { filterBurgers } from '../../../../lib/utils';

interface BurgerSearchProps {
  onFilteredBurgers: (burgers: any[]) => void;
}

export const BurgerSearch: React.FC<BurgerSearchProps> = ({ onFilteredBurgers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'budget' | 'premium'>('all');

  const { burgers } = useContext(orderContext);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, selectedCategory, priceRange);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    applyFilters(searchTerm, category, priceRange);
  };

  const handlePriceChange = (range: 'all' | 'budget' | 'premium') => {
    setPriceRange(range);
    applyFilters(searchTerm, selectedCategory, range);
  };

  const applyFilters = (term: string, category: string, price: string) => {
    let filtered = burgers;

    // Filtre par recherche textuelle
    if (term) {
      filtered = filterBurgers(filtered, term);
    }

    // Filtre par catégorie (basé sur les mots-clés dans le titre)
    if (category !== 'all') {
      const categoryKeywords = {
        burger: ['burger'],
        fish: ['fish', 'crispy'],
        drink: ['cola', 'drink'],
        vegan: ['vegan', 'veggie'],
      };

      const keywords = categoryKeywords[category as keyof typeof categoryKeywords] || [];
      filtered = filtered.filter(burger =>
        keywords.some(keyword =>
          burger.title.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }

    // Filtre par prix
    if (price !== 'all') {
      filtered = filtered.filter(burger => {
        if (price === 'budget') return burger.price <= 10;
        if (price === 'premium') return burger.price > 10;
        return true;
      });
    }

    onFilteredBurgers(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange('all');
    onFilteredBurgers(burgers);
  };

  const activeFiltersCount =
    (searchTerm ? 1 : 0) +
    (selectedCategory !== 'all' ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0);

  return (
    <SearchContainer>
      <SearchHeader>
        <h3>Rechercher & Filtrer</h3>
        {activeFiltersCount > 0 && (
          <ClearButton onClick={clearFilters}>
            Effacer ({activeFiltersCount})
          </ClearButton>
        )}
      </SearchHeader>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        onSearch={handleSearch}
        placeholder="Rechercher un burger..."
      />

      <FiltersRow>
        <FilterGroup>
          <FilterLabel>Catégorie:</FilterLabel>
          <FilterSelect
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="all">Toutes</option>
            <option value="burger">Burgers</option>
            <option value="fish">Poisson</option>
            <option value="drink">Boissons</option>
            <option value="vegan">Vegan</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Prix:</FilterLabel>
          <FilterSelect
            value={priceRange}
            onChange={(e) => handlePriceChange(e.target.value as any)}
          >
            <option value="all">Tous prix</option>
            <option value="budget">≤ 10€</option>
            <option value="premium">&gt; 10€</option>
          </FilterSelect>
        </FilterGroup>
      </FiltersRow>

      <ResultsInfo>
        {onFilteredBurgers.length !== undefined && (
          <span>
            {burgers.length} résultat{burgers.length > 1 ? 's' : ''} trouvé{burgers.length > 1 ? 's' : ''}
          </span>
        )}
      </ResultsInfo>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 165, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
  z-index: 10;
`;

const SearchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  h3 {
    margin: 0;
    color: #e2e8f0;
    font-size: 16px;
    font-weight: 600;
  }
`;

const ClearButton = styled.button`
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 11px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #fecaca;
  }
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 6px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FilterLabel = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: #94a3b8;
  margin-bottom: 4px;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 2px solid rgba(255, 165, 0, 0.2);
  border-radius: 6px;
  font-size: 13px;
  background: rgba(30, 41, 59, 0.6);
  color: #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #ffa500;
    box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.15);
  }

  &:hover {
    border-color: #ffa500;
    background: rgba(30, 41, 59, 0.8);
  }

  option {
    background: #1e293b;
    color: #e2e8f0;
  }
`;

const ResultsInfo = styled.div`
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 165, 0, 0.15);
  font-size: 11px;
  color: #64748b;
  text-align: center;
`;

export default BurgerSearch;