import React, { useState, useEffect } from 'react';
import SkillCard from '../components/skills/SkillCard';
import SkillFilters from '../components/skills/SkillFilters';
import Pagination from '../components/common/Pagination';

const SkillCatalog = () => {
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
          // Mock categories data
          const mockCategories = [
            { id: 'programming', name: 'Programming' },
            { id: 'language', name: 'Languages' },
            { id: 'music', name: 'Music' },
            { id: 'arts', name: 'Arts & Crafts' },
            { id: 'academics', name: 'Academics' },
            { id: 'business', name: 'Business' },
            { id: 'fitness', name: 'Fitness' }
          ];
          
          // Mock skills data
          const mockSkills = Array(30).fill().map((_, index) => ({
            id: `skill-${index + 1}`,
            name: `Skill ${index + 1}`,
            category: mockCategories[index % mockCategories.length].id,
            description: `This is a description for Skill ${index + 1}. It covers various topics and techniques.`,
            teachersCount: Math.floor(Math.random() * 50) + 1,
            learnersCount: Math.floor(Math.random() * 100) + 10,
            levels: ['Beginner', 'Intermediate', 'Advanced'].slice(0, Math.floor(Math.random() * 3) + 1)
          }));
          
          setCategories(mockCategories);
          setSkills(mockSkills);
          setFilteredSkills(mockSkills);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to load skills');
        setLoading(false);
      }
    };
    
    fetchSkills();
  }, []);

  const handleFilterChange = (filters) => {
    let results = [...skills];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(skill =>
        skill.name.toLowerCase().includes(searchLower) ||
        skill.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply category filter
    if (filters.category) {
      results = results.filter(skill => skill.category === filters.category);
    }
    
    // Apply proficiency level filter
    if (filters.proficiencyLevel) {
      results = results.filter(skill => 
        skill.levels && skill.levels.includes(filters.proficiencyLevel)
      );
    }
    
    // Apply availability filter (would need more data in a real app)
    // This is just a placeholder implementation
    if (filters.availability) {
      // In a real app, you would filter based on teacher availability
      // For now, we'll just filter randomly to simulate the behavior
      if (filters.availability === 'weekday') {
        results = results.filter((_, index) => index % 2 === 0);
      } else if (filters.availability === 'weekend') {
        results = results.filter((_, index) => index % 2 === 1);
      }
    }
    
    setFilteredSkills(results);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Get current skills for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSkills = filteredSkills.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div className="loading-spinner">Loading skills...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="skill-catalog-page">
      <div className="page-header">
        <h1>Skill Catalog</h1>
        <p>Browse and discover skills to learn or teach</p>
      </div>
      
      <SkillFilters 
        categories={categories} 
        onFilterChange={handleFilterChange} 
      />
      
      <div className="results-info">
        Found {filteredSkills.length} skills
      </div>
      
      <div className="skills-grid">
        {currentSkills.length > 0 ? (
          currentSkills.map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))
        ) : (
          <div className="no-results">
            <p>No skills match your search criteria.</p>
            <button onClick={() => handleFilterChange({
              search: '',
              category: '',
              proficiencyLevel: '',
              availability: ''
            })}>
              Clear filters
            </button>
          </div>
        )}
      </div>
      
      {filteredSkills.length > itemsPerPage && (
        <div className="pagination-container">
          <Pagination 
            currentPage={currentPage}
            totalPages={Math.ceil(filteredSkills.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default SkillCatalog;


// // pages/SkillCatalog.jsx
// import React, { useState, useEffect } from 'react';
// import SkillCard from '../components/skills/SkillCard';
// import SkillFilters from '../components/skills/SkillFilters';
// import Pagination from '../components/common/Pagination';
// import Input from '../components/common/Input';
// import { useSkills } from '../hooks/useSkills';

// const SkillCatalog = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedFilters, setSelectedFilters] = useState({
//     categories: [],
//     levels: [],
//     availability: 'all'
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const { skills, isLoading, error, totalPages } = useSkills({
//     search: searchTerm,
//     filters: selectedFilters,
//     page: currentPage
//   });
  
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1); // Reset to first page on new search
//   };
  
//   const handleFilterChange = (newFilters) => {
//     setSelectedFilters(newFilters);
//     setCurrentPage(1); // Reset to first page on filter change
//   };
  
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//     window.scrollTo(0, 0); // Scroll to top on page change
//   };
  
//   return (
//     <div className="skill-catalog-page">
//       <div className="catalog-header">
//         <h1>Skill Catalog</h1>
//         <p>Discover skills to learn or share your expertise with others</p>
//       </div>
      
//       <div className="search-bar">
//         <Input
//           type="text"
//           placeholder="Search for skills..."
//           value={searchTerm}
//           onChange={handleSearch}
//           leftIcon="search"
//           className="search-input"
//         />
//       </div>
      
//       <div className="catalog-content">
//         <aside className="filters-sidebar">
//           <SkillFilters 
//             selectedFilters={selectedFilters}
//             onChange={handleFilterChange}
//           />
//         </aside>
        
//         <main className="skills-grid">
//           {isLoading ? (
//             <div className="loading">Loading skills...</div>
//           ) : error ? (
//             <div className="error-message">{error}</div>
//           ) : skills.length === 0 ? (
//             <div className="no-results">
//               <h3>No skills found</h3>
//               <p>Try adjusting your search or filters</p>
//             </div>
//           ) : (
//             <>
//               <div className="skills-count">
//                 Showing {skills.length} of {totalPages * 12} skills
//               </div>
              
//               <div className="skills-grid-container">
//                 {skills.map((skill) => (
//                   <SkillCard key={skill.id} skill={skill} />
//                 ))}
//               </div>
              
//               <Pagination 
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//               />
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default SkillCatalog;