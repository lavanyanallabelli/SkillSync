import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TeachersList from '../components/skills/TeachersList';
import RelatedSkills from '../components/skills/RelatedSkills';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

const SkillDetail = () => {
  const { skillId } = useParams();
  const { user } = useAuth();
  const [skill, setSkill] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [relatedSkills, setRelatedSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchSkillDetails = async () => {
      try {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
          // Mock skill data
          const mockSkill = {
            id: skillId,
            name: 'JavaScript',
            category: 'Programming',
            description: `
              JavaScript is a programming language that allows you to implement complex features on web pages.
              Every time a web page does more than just sit there and display static information for you to look at — 
              displaying timely content updates, interactive maps, animated 2D/3D graphics, scrolling video jukeboxes, etc. — 
              you can bet that JavaScript is probably involved.
            `,
            learningOutcomes: [
              'Understand JavaScript syntax and basic programming concepts',
              'Build interactive web applications using JavaScript',
              'Work with DOM manipulation',
              'Use modern JavaScript features (ES6+)'
            ],
            prerequisites: [
              'Basic HTML and CSS knowledge',
              'Understanding of how web pages work'
            ],
            levels: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
          };
          
          // Mock teachers data
          const mockTeachers = Array(5).fill().map((_, index) => ({
            id: `teacher-${index + 1}`,
            name: `Teacher ${index + 1}`,
            avatar: null,
            rating: 4 + Math.random(),
            reviewCount: Math.floor(Math.random() * 50) + 5,
            proficiencyLevel: ['Intermediate', 'Advanced', 'Expert'][Math.floor(Math.random() * 3)],
            bio: `Experienced JavaScript developer with ${index + 3} years of professional experience.`,
            availability: ['Weekday evenings', 'Weekend mornings']
          }));
          
          // Mock related skills
          const mockRelatedSkills = [
            { id: 'react', name: 'React.js', teachersCount: 12 },
            { id: 'node', name: 'Node.js', teachersCount: 8 },
            { id: 'typescript', name: 'TypeScript', teachersCount: 6 },
            { id: 'html-css', name: 'HTML & CSS', teachersCount: 20 }
          ];
          
          setSkill(mockSkill);
          setTeachers(mockTeachers);
          setRelatedSkills(mockRelatedSkills);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to load skill details');
        setLoading(false);
      }
    };
    
    fetchSkillDetails();
  }, [skillId]);

  if (loading) {
    return <div className="loading-spinner">Loading skill details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!skill) {
    return <div className="not-found">Skill not found</div>;
  }

  return (
    <div className="skill-detail-page">
      <div className="skill-header">
        <div className="header-content">
          <div className="breadcrumbs">
            <Link to="/skills">Skills</Link> / 
            <Link to={`/skills?category=${skill.category}`}>{skill.category}</Link> / 
            <span>{skill.name}</span>
          </div>
          
          <h1 className="skill-title">{skill.name}</h1>
          
          <div className="skill-levels">
            {skill.levels.map(level => (
              <span key={level} className={`level-badge level-${level.toLowerCase()}`}>
                {level}
              </span>
            ))}
          </div>
          
          <p className="skill-description">{skill.description}</p>
          
          {user && (
            <div className="skill-actions">
              <Button 
                as={Link} 
                to={`/skills/${skillId}/learn`}
                variant="primary"
              >
                Learn This Skill
              </Button>
              <Button 
                as={Link}
                to={`/profile/skills/add?skill=${skillId}`}
                variant="outlined"
              >
                I Can Teach This
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="skill-content">
        <div className="main-content">
          <div className="learning-outcomes">
            <h2>What You'll Learn</h2>
            <ul className="outcomes-list">
              {skill.learningOutcomes.map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
          </div>
          
          {skill.prerequisites.length > 0 && (
            <div className="prerequisites">
              <h2>Prerequisites</h2>
              <ul className="prerequisites-list">
                {skill.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>
          )}
          
          <TeachersList teachers={teachers} skillName={skill.name} />
        </div>
        
        <div className="sidebar">
          <RelatedSkills skills={relatedSkills} />
        </div>
      </div>
    </div>
  );
};

export default SkillDetail;




// // pages/SkillDetail.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import Button from '../components/common/Button';
// import TeachersList from '../components/skills/TeachersList';
// import RelatedSkills from '../components/skills/RelatedSkills';
// import Card from '../components/common/Card';
// import Modal from '../components/common/Modal';
// import { useAuth } from '../hooks/useAuth';

// const SkillDetail = () => {
//   const { skillId } = useParams();
//   const { currentUser } = useAuth();
//   const [skill, setSkill] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
  
//   useEffect(() => {
//     const fetchSkillDetails = async () => {
//       setIsLoading(true);
//       try {
//         // In a real app, this would call your API service
//         const response = await fetch(`/api/skills/${skillId}`);
//         if (!response.ok) {
//           throw new Error('Failed to load skill details');
//         }
//         const data = await response.json();
//         setSkill(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchSkillDetails();
//   }, [skillId]);
  
//   const handleTeacherSelect = (teacher) => {
//     setSelectedTeacher(teacher);
//     setIsRequestModalOpen(true);
//   };
  
//   const handleRequestSession = () => {
//     // Logic to request a session would go here
//     setIsRequestModalOpen(false);
//   };
  
//   if (isLoading) {
//     return <div className="loading">Loading skill details...</div>;
//   }
  
//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }
  
//   if (!skill) {
//     return <div className="not-found">Skill not found</div>;
//   }
  
//   return (
//     <div className="skill-detail-page">
//       <div className="skill-header">
//         <div className="skill-header-content">
//           <div className="skill-category">
//             <span className="category-tag">{skill.category}</span>
//             <span className="separator">•</span>
//             <span className="skill-stats">
//               {skill.learnersCount} learning • {skill.teachersCount} teaching
//             </span>
//           </div>
          
//           <h1 className="skill-title">{skill.name}</h1>
          
//           <div className="skill-actions">
//             {skill.userCanTeach ? (
//               <Button 
//                 variant="secondary" 
//                 as={Link} 
//                 to={`/skills/${skillId}/teach`}
//               >
//                 Offer to Teach
//               </Button>
//             ) : skill.userIsLearning ? (
//               <Button variant="secondary" disabled>
//                 Currently Learning
//               </Button>
//             ) : (
//               <Button 
//                 variant="primary" 
//                 onClick={() => setIsRequestModalOpen(true)}
//               >
//                 Request to Learn
//               </Button>
//             )}
            
//             <Button 
//               variant="outline" 
//               as={Link} 
//               to={`/quiz/${skillId}`}
//             >
//               Take Skill Assessment
//             </Button>
//           </div>
//         </div>
//       </div>
      
//       <div className="skill-content">
//         <div className="skill-main">
//           <Card className="skill-description">
//             <h2>About this Skill</h2>
//             <p>{skill.description}</p>
            
//             {skill.prerequisites.length > 0 && (
//               <div className="prerequisites">
//                 <h3>Prerequisites</h3>
//                 <ul>
//                   {skill.prerequisites.map((prereq, index) => (
//                     <li key={index}>{prereq}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </Card>
          
//           <TeachersList 
//             teachers={skill.teachers}
//             onSelectTeacher={handleTeacherSelect}
//           />
//         </div>
        
//         <aside className="skill-sidebar">
//           <RelatedSkills 
//             skills={skill.relatedSkills}
//             currentSkillId={skillId}
//           />
//         </aside>
//       </div>
      
//       {isRequestModalOpen && (
//         <Modal
//           isOpen={isRequestModalOpen}
//           onClose={() => setIsRequestModalOpen(false)}
//           title={selectedTeacher 
//             ? `Request a session with ${selectedTeacher.name}`
//             : 'Request to Learn this Skill'
//           }
//         >
//           <div className="request-form">
//             {/* This would be replaced with an actual form */}
//             <p>Session request form placeholder</p>
//             <div className="form-actions">
//               <Button 
//                 variant="secondary" 
//                 onClick={() => setIsRequestModalOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button 
//                 variant="primary"
//                 onClick={handleRequestSession}
//               >
//                 Send Request
//               </Button>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default SkillDetail;