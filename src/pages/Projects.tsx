import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured online shopping platform built with React and Node.js",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80",
    link: "#",
    tags: ["React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "Task Management System",
    description: "Project management tool with real-time updates and team collaboration features",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
    link: "#",
    tags: ["Vue.js", "Firebase", "Tailwind"]
  },
  {
    id: 3,
    title: "Healthcare Portal",
    description: "Patient management system with appointment scheduling and medical records",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80",
    link: "#",
    tags: ["React", "Express", "PostgreSQL"]
  }
];

export function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Our Projects</h1>
          <p className="mt-4 text-lg text-gray-600">Discover our latest work and innovations</p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -5 }}
              className="overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <div className="aspect-video w-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                <p className="mt-2 text-gray-600">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  className="mt-6"
                  onClick={() => window.open(project.link, '_blank')}
                >
                  View Project <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}