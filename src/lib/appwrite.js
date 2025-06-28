import { Client, Account, Databases, Storage, Query, Functions } from 'appwrite';

const client = new Client();

client
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

export const DATABASE_ID = '68557142001fe0db2967';

export const COLLECTIONS = {
  CHALLENGES: '6855721b00022d840bcc',
  SOLUTIONS: '6855720d003bb8f2e685',
  PROBLEMS: '68557201001450fcdd1c',
  PROJECTS: '6855723700151aa1347e',
  BLOG_POSTS: '685571c5002a3b10f52b',
  PARTNERS: '6855715800062661c680',
  CONTACTS: '685571b5002da2e8437a',
  COMMENTS: '685571e2001d3f8521aa',
  PROGRAMS: '685571f2000ac9ae3b4b',
  CONTACT_MESSAGES: '685998e2001e54d1c99a',
  CAPSTONE_PROJECTS: '685a12e7001c6bfc1f35',
  IDEAS: '685a1853003068f88f92',
  COURSES: '685a2f4e001c8b9f2d1a' // Add actual collection ID when created
};

export { Query };
export default client;