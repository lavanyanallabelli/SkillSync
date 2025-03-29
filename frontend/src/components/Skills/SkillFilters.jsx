import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

const SkillFilters = ({ categories, onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    proficiencyLevel: '',
    availability: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      search: '',
      category: '',
      proficiencyLevel: '',
      availability: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="skill-filters">
      <div className="main-search">
        <Input
          type="text"
          placeholder="Search skills..."
          name="search"
          value={filters.search}
          onChange={handleInputChange}
          className="search-input"
          iconLeft="search"
        />
        <Button 
          onClick={() => setIsExpanded(!isExpanded)} 
          variant="outlined"
          className="filter-toggle-btn"
        >
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {isExpanded && (
        <div className="advanced-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleInputChange}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="proficiencyLevel">Proficiency Level</label>
              <select
                id="proficiencyLevel"
                name="proficiencyLevel"
                value={filters.proficiencyLevel}
                onChange={handleInputChange}
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="availability">Availability</label>
              <select
                id="availability"
                name="availability"
                value={filters.availability}
                onChange={handleInputChange}
              >
                <option value="">Any Time</option>
                <option value="weekday">Weekdays</option>
                <option value="weekend">Weekends</option>
                <option value="evening">Evenings</option>
                <option value="morning">Mornings</option>
              </select>
            </div>
          </div>

          <div className="filter-actions">
            <Button onClick={clearFilters} variant="text">Clear Filters</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillFilters;