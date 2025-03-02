import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';
import { db } from './firebase';
import { sampleProjects } from './sample-projects';
import { cache } from './cache';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

const CACHE_KEY_PROJECTS = 'projects';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

let initialized = false;
let activeProjectsSubscription: Unsubscribe | null = null;

async function initializeSampleProjects() {
  if (initialized) return;
  
  try {
    const projectsRef = collection(db, 'projects');
    const snapshot = await getDocs(projectsRef);
    
    if (snapshot.empty) {
      for (const project of sampleProjects) {
        const { id, ...projectData } = project;
        await addDoc(projectsRef, projectData);
      }
    }
    
    initialized = true;
  } catch (error) {
    console.error('Error initializing sample projects:', error);
    // Continue even if initialization fails
    initialized = true;
  }
}

export function subscribeToProjects(callback: (projects: Project[]) => void) {
  // First, check if we have cached data
  const cachedProjects = cache.get<Project[]>(CACHE_KEY_PROJECTS);
  
  if (cachedProjects) {
    // Immediately return cached data
    callback(cachedProjects);
  } else {
    // If no cache, immediately return sample data
    callback(sampleProjects);
  }
  
  // Clean up any existing subscription
  if (activeProjectsSubscription) {
    activeProjectsSubscription();
  }
  
  // Initialize sample data if needed (don't wait for this)
  initializeSampleProjects().catch(console.error);
  
  // Set up real-time subscription
  const projectsRef = collection(db, 'projects');
  const q = query(projectsRef, orderBy('title'));
  
  activeProjectsSubscription = onSnapshot(q, (snapshot) => {
    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
    
    // Only update if we have actual projects
    if (projects.length > 0) {
      // Update cache
      cache.set(CACHE_KEY_PROJECTS, projects, CACHE_TTL);
      
      // Update UI
      callback(projects);
    }
  }, (error) => {
    console.error('Error in projects subscription:', error);
    // If there's an error with the subscription, at least we showed sample data
  });
  
  return () => {
    if (activeProjectsSubscription) {
      activeProjectsSubscription();
      activeProjectsSubscription = null;
    }
  };
}

export async function createProject(project: Omit<Project, 'id'>) {
  try {
    const projectsRef = collection(db, 'projects');
    const docRef = await addDoc(projectsRef, project);
    
    // Invalidate cache
    cache.delete(CACHE_KEY_PROJECTS);
    
    return { id: docRef.id, ...project };
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export async function updateProject(id: string, project: Partial<Project>) {
  try {
    const projectRef = doc(db, 'projects', id);
    await updateDoc(projectRef, project);
    
    // Invalidate cache
    cache.delete(CACHE_KEY_PROJECTS);
    
    return { id, ...project };
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

export async function deleteProject(id: string) {
  try {
    const projectRef = doc(db, 'projects', id);
    await deleteDoc(projectRef);
    
    // Invalidate cache
    cache.delete(CACHE_KEY_PROJECTS);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}

// Function to get projects without subscription (for one-time fetches)
export async function getProjects(): Promise<Project[]> {
  // Check cache first
  const cachedProjects = cache.get<Project[]>(CACHE_KEY_PROJECTS);
  if (cachedProjects) {
    return cachedProjects;
  }
  
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, orderBy('title'));
    const snapshot = await getDocs(q);
    
    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
    
    // Cache the results
    if (projects.length > 0) {
      cache.set(CACHE_KEY_PROJECTS, projects, CACHE_TTL);
      return projects;
    }
    
    // If no projects in database, return sample projects
    return sampleProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return sampleProjects;
  }
}