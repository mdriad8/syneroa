import { databases, DATABASE_ID, COLLECTIONS, Query } from '../lib/appwrite';
import { ID } from 'appwrite';

// Partner Applications
export const createPartnerApplication = async (data) => {
  return await databases.createDocument(
    DATABASE_ID,
    COLLECTIONS.PARTNERS,
    ID.unique(),
    {
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  );
};

export const getPartnerApplications = async () => {
  return await databases.listDocuments(
    DATABASE_ID,
    COLLECTIONS.PARTNERS,
    [Query.orderDesc('createdAt')]
  );
};

export const updatePartnerApplication = async (id, data) => {
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.PARTNERS,
    id,
    data
  );
};

export const deletePartnerApplication = async (id) => {
  return await databases.deleteDocument(
    DATABASE_ID,
    COLLECTIONS.PARTNERS,
    id
  );
};

// Contact Messages
export const createContactMessage = async (data) => {
  return await databases.createDocument(
    DATABASE_ID,
    COLLECTIONS.CONTACT_MESSAGES,
    ID.unique(),
    {
      ...data,
      status: 'unread',
      createdAt: new Date().toISOString()
    }
  );
};

export const getContactMessages = async () => {
  return await databases.listDocuments(
    DATABASE_ID,
    COLLECTIONS.CONTACT_MESSAGES,
    [Query.orderDesc('createdAt')]
  );
};

export const updateContactMessage = async (id, data) => {
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.CONTACT_MESSAGES,
    id,
    data
  );
};

export const deleteContactMessage = async (id) => {
  return await databases.deleteDocument(
    DATABASE_ID,
    COLLECTIONS.CONTACT_MESSAGES,
    id
  );
};

// Challenges
export const createChallenge = async (data) => {
  return await databases.createDocument(
    DATABASE_ID,
    COLLECTIONS.CHALLENGES,
    ID.unique(),
    {
      ...data,
      participants: 0,
      createdAt: new Date().toISOString()
    }
  );
};

export const getChallenges = async () => {
  return await databases.listDocuments(
    DATABASE_ID,
    COLLECTIONS.CHALLENGES,
    [Query.orderDesc('createdAt')]
  );
};

export const deleteChallenge = async (id) => {
  return await databases.deleteDocument(
    DATABASE_ID,
    COLLECTIONS.CHALLENGES,
    id
  );
};

export const updateChallenge = async (id, data) => {
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.CHALLENGES,
    id,
    data
  );
};

// Solutions
export const createSolution = async (data) => {
  return await databases.createDocument(
    DATABASE_ID,
    COLLECTIONS.SOLUTIONS,
    ID.unique(),
    {
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  );
};

export const getSolutions = async (adminView = false) => {
  if (adminView) {
    // Admin can see all solutions
    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.SOLUTIONS,
      [Query.orderDesc('createdAt')]
    );
  } else {
    // Public can only see approved solutions
    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.SOLUTIONS,
      [
        Query.equal('status', 'approved'),
        Query.orderDesc('createdAt')
      ]
    );
  }
};

export const deleteSolution = async (id) => {
  return await databases.deleteDocument(
    DATABASE_ID,
    COLLECTIONS.SOLUTIONS,
    id
  );
};

export const updateSolution = async (id, data) => {
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.SOLUTIONS,
    id,
    data
  );
};

export const approveSolution = async (id) => {
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.SOLUTIONS,
    id,
    { status: 'approved' }
  );
};

export const rejectSolution = async (id) => {
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.SOLUTIONS,
    id,
    { status: 'rejected' }
  );
};

// Problems
export const createProblem = async (data) => {
  return await databases.createDocument(
    DATABASE_ID,
    COLLECTIONS.PROBLEMS,
    ID.unique(),
    {
      ...data,
      votes: 0,
      createdAt: new Date().toISOString()
    }
  );
};

export const getProblems = async () => {
  return await databases.listDocuments(
    DATABASE_ID,
    COLLECTIONS.PROBLEMS,
    [Query.orderDesc('createdAt')]
  );
};

export const deleteProblem = async (id) => {
  return await databases.deleteDocument(
    DATABASE_ID,
    COLLECTIONS.PROBLEMS,
    id
  );
};

export const updateProblem = async (id, data) => {
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.PROBLEMS,
    id,
    data
  );
};

export const upvoteProblem = async (problemId) => {
  const problem = await databases.getDocument(
    DATABASE_ID,
    COLLECTIONS.PROBLEMS,
    problemId
  );
  
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.PROBLEMS,
    problemId,
    {
      votes: (problem.votes || 0) + 1
    }
  );
};

// Blog Posts
export const createBlogPost = async (data) => {
  return await databases.createDocument(
    DATABASE_ID,
    COLLECTIONS.BLOG_POSTS,
    ID.unique(),
    {
      ...data,
      createdAt: new Date().toISOString()
    }
  );
};

export const getBlogPosts = async () => {
  return await databases.listDocuments(
    DATABASE_ID,
    COLLECTIONS.BLOG_POSTS,
    [Query.orderDesc('createdAt')]
  );
};

export const getBlogPost = async (id) => {
  return await databases.getDocument(
    DATABASE_ID,
    COLLECTIONS.BLOG_POSTS,
    id
  );
};

export const updateBlogPost = async (id, data) => {
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.BLOG_POSTS,
    id,
    data
  );
};

export const deleteBlogPost = async (id) => {
  return await databases.deleteDocument(
    DATABASE_ID,
    COLLECTIONS.BLOG_POSTS,
    id
  );
};

// Comments
export const createComment = async (data) => {
  return await databases.createDocument(
    DATABASE_ID,
    COLLECTIONS.COMMENTS,
    ID.unique(),
    {
      ...data,
      createdAt: new Date().toISOString()
    }
  );
};

export const getComments = async (postId) => {
  return await databases.listDocuments(
    DATABASE_ID,
    COLLECTIONS.COMMENTS,
    [
      Query.equal('postId', postId),
      Query.orderDesc('createdAt')
    ]
  );
};

export const deleteComment = async (id) => {
  return await databases.deleteDocument(
    DATABASE_ID,
    COLLECTIONS.COMMENTS,
    id
  );
};

// Programs
export const createProgram = async (data) => {
  return await databases.createDocument(
    DATABASE_ID,
    COLLECTIONS.PROGRAMS,
    ID.unique(),
    {
      ...data,
      createdAt: new Date().toISOString()
    }
  );
};

export const getPrograms = async () => {
  return await databases.listDocuments(
    DATABASE_ID,
    COLLECTIONS.PROGRAMS,
    [Query.orderDesc('createdAt')]
  );
};

export const deleteProgram = async (id) => {
  return await databases.deleteDocument(
    DATABASE_ID,
    COLLECTIONS.PROGRAMS,
    id
  );
};

export const updateProgram = async (id, data) => {
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.PROGRAMS,
    id,
    data
  );
};

// Capstone Projects
export const createCapstoneProject = async (data) => {
  return await databases.createDocument(
    DATABASE_ID,
    COLLECTIONS.CAPSTONE_PROJECTS,
    ID.unique(),
    {
      ...data,
      createdAt: new Date().toISOString(),
      status: 'In Review'
    }
  );
};

export const getCapstoneProjects = async () => {
  return await databases.listDocuments(
    DATABASE_ID,
    COLLECTIONS.CAPSTONE_PROJECTS,
    [Query.orderDesc('createdAt')]
  );
};

export const deleteCapstoneProject = async (id) => {
  return await databases.deleteDocument(
    DATABASE_ID,
    COLLECTIONS.CAPSTONE_PROJECTS,
    id
  );
};

export const updateCapstoneProject = async (id, data) => {
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.CAPSTONE_PROJECTS,
    id,
    data
  );
};

// Ideas
export const createIdea = async (data) => {
  return await databases.createDocument(
    DATABASE_ID,
    COLLECTIONS.IDEAS,
    ID.unique(),
    {
      ...data,
      createdAt: new Date().toISOString(),
      status: 'pending'
    }
  );
};

export const getIdeas = async () => {
  return await databases.listDocuments(
    DATABASE_ID,
    COLLECTIONS.IDEAS,
    [Query.orderDesc('createdAt')]
  );
};

export const deleteIdea = async (id) => {
  return await databases.deleteDocument(
    DATABASE_ID,
    COLLECTIONS.IDEAS,
    id
  );
};

export const updateIdea = async (id, data) => {
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.IDEAS,
    id,
    data
  );
};

// Courses
export const createCourse = async (data) => {
  return await databases.createDocument(
    DATABASE_ID,
    COLLECTIONS.COURSES,
    ID.unique(),
    {
      ...data,
      students: 0,
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString(),
      status: 'draft'
    }
  );
};

export const getCourses = async (publishedOnly = false) => {
  if (publishedOnly) {
    // Public can only see published courses
    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.COURSES,
      [
        Query.equal('status', 'published'),
        Query.orderDesc('createdAt')
      ]
    );
  } else {
    // Admin can see all courses
    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.COURSES,
      [Query.orderDesc('createdAt')]
    );
  }
};

export const getCourse = async (id) => {
  return await databases.getDocument(
    DATABASE_ID,
    COLLECTIONS.COURSES,
    id
  );
};

export const updateCourse = async (id, data) => {
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.COURSES,
    id,
    data
  );
};

export const deleteCourse = async (id) => {
  return await databases.deleteDocument(
    DATABASE_ID,
    COLLECTIONS.COURSES,
    id
  );
};

export const publishCourse = async (id) => {
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.COURSES,
    id,
    { status: 'published' }
  );
};

export const unpublishCourse = async (id) => {
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.COURSES,
    id,
    { status: 'draft' }
  );
};

export const enrollInCourse = async (courseId, userId) => {
  // Get current course data
  const course = await databases.getDocument(
    DATABASE_ID,
    COLLECTIONS.COURSES,
    courseId
  );
  
  // Update student count
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.COURSES,
    courseId,
    {
      students: (course.students || 0) + 1
    }
  );
};