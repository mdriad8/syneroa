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

export const getSolutions = async () => {
  return await databases.listDocuments(
    DATABASE_ID,
    COLLECTIONS.SOLUTIONS,
    [Query.orderDesc('createdAt')]
  );
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
