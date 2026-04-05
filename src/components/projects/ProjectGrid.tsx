import type { Project } from '@/data/projects';
import type { EnrichedGitHub } from '@/lib/types';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: (Project & { github?: EnrichedGitHub })[];
}

// Responsive grid layout for project cards; shows an empty-state message when no projects match the filter.
export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="text-center text-gray-500 py-12">
        No projects found in this category.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          github={project.github}
        />
      ))}
    </div>
  );
}
