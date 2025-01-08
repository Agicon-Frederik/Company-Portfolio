import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/Button';
import { ProjectEditor } from './ProjectEditor';
import { projects as initialProjects } from '@/pages/Projects';

export function AdminProjectList() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (project) => {
    try {
      if (selectedProject) {
        setProjects(projects.map(p => p.id === project.id ? project : p));
        toast.success('Project updated successfully');
      } else {
        setProjects([...projects, { ...project, id: Date.now() }]);
        toast.success('Project created successfully');
      }
      setIsEditing(false);
      setSelectedProject(null);
    } catch (error) {
      toast.error('Failed to save project');
    }
  };

  const handleDelete = (project) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        setProjects(projects.filter(p => p.id !== project.id));
        toast.success('Project deleted successfully');
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

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