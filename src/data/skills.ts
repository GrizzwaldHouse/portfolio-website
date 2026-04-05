export interface Skill {
  name: string;
  category: 'language' | 'engine' | 'framework' | 'tool' | 'concept';
  proficiency: 1 | 2 | 3 | 4 | 5;
  yearsUsed: number;
  color: string;
}

// All skills with proficiency ratings; rendered on the /about page and used for skill filtering.
export const skills: Skill[] = [
  { name: 'C++', category: 'language', proficiency: 5, yearsUsed: 4, color: '#00599C' },
  { name: 'C#', category: 'language', proficiency: 4, yearsUsed: 3, color: '#68217A' },
  { name: 'Python', category: 'language', proficiency: 4, yearsUsed: 3, color: '#3776AB' },
  { name: 'TypeScript', category: 'language', proficiency: 3, yearsUsed: 1, color: '#3178C6' },
  { name: 'Unreal Engine 5', category: 'engine', proficiency: 5, yearsUsed: 3, color: '#313131' },
  { name: 'Unity', category: 'engine', proficiency: 3, yearsUsed: 2, color: '#222C37' },
  { name: 'Visual Studio', category: 'tool', proficiency: 5, yearsUsed: 4, color: '#5C2D91' },
  { name: 'Git / GitHub', category: 'tool', proficiency: 4, yearsUsed: 4, color: '#F05032' },
  { name: 'CMake', category: 'tool', proficiency: 3, yearsUsed: 2, color: '#064F8C' },
  { name: 'Behavior Trees', category: 'concept', proficiency: 4, yearsUsed: 2, color: '#FFB600' },
  { name: 'Clean Architecture', category: 'concept', proficiency: 4, yearsUsed: 2, color: '#FFB600' },
  { name: 'MVVM', category: 'concept', proficiency: 4, yearsUsed: 2, color: '#FFB600' },
  { name: 'Component Architecture', category: 'concept', proficiency: 5, yearsUsed: 3, color: '#FFB600' },
  { name: 'Vulkan / OpenGL', category: 'concept', proficiency: 3, yearsUsed: 2, color: '#AC162C' },
  { name: 'FastAPI', category: 'framework', proficiency: 3, yearsUsed: 1, color: '#009688' },
];

// Skills grouped by category (language, engine, framework, tool, concept) for sectioned display.
export const skillsByCategory = skills.reduce(
  (acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  },
  {} as Record<string, Skill[]>,
);
