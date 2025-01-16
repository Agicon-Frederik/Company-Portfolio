import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/Button';
import { ProjectEditor } from './ProjectEditor';
import { subscribeToProjects, createProject, updateProject, deleteProject } from '@/lib/projects';
import type { Project } from '@/lib/projects';

export function AdminProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = subscribeToProjects((updatedProjects) => {
      setProjects(updatedProjects);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSave = async (projectData: Omit<Project, 'id'>) => {
    try {
      if (selectedProject) {
        await updateProject(selectedProject.id, projectData);
        toast.success('Project updated successfully');
      } else {
        await createProject(projectData);
        toast.success('Project created successfully');
      }
      setIsEditing(false);
      setSelectedProject(null);
    } catch (error) {
      toast.error('Failed to save project');
    }
  };

  const handleDelete = async (project: Project) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(project.id);
        toast.success('Project deleted successfully');
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <Button onClick={() => setIsEditing(true)}>New Project</Button>
      </div>

      {isEditing ? (
        <ProjectEditor
          project={selectedProject}
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(false);
            setSelectedProject(null);
          }}
        />
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-lg bg-white p-6 shadow-lg"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{project.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSelectedProject(project);
                    setIsEditing(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDelete(project)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}