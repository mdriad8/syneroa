import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Trophy,
  Lightbulb,
  MessageSquare,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye,
  Mail,
  UserCheck,
  FileText,
  Target,
  BookOpen,
  CheckCircle,
  XCircle,
  Users,
  DollarSign,
} from "lucide-react";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import {
  getPartnerApplications,
  updatePartnerApplication,
  deletePartnerApplication,
  getContactMessages,
  updateContactMessage,
  deleteContactMessage,
  getBlogPosts,
  createBlogPost,
  deleteBlogPost,
  updateBlogPost,
  getPrograms,
  createProgram,
  deleteProgram,
  updateProgram,
  getChallenges,
  createChallenge,
  deleteChallenge,
  updateChallenge,
  getSolutions,
  deleteSolution,
  updateSolution,
  approveSolution,
  rejectSolution,
  getProblems,
  createProblem,
  deleteProblem,
  updateProblem,
  getCapstoneProjects,
  updateCapstoneProject,
  deleteCapstoneProject,
  getIdeas,
  updateIdea,
  deleteIdea,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  publishCourse,
  unpublishCourse,
} from "../../services/database";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [partnerApplications, setPartnerApplications] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [problems, setProblems] = useState([]);
  const [capstoneProjects, setCapstoneProjects] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [createType, setCreateType] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "challenges", label: "Challenges", icon: Trophy },
    { id: "solutions", label: "Solutions", icon: Lightbulb },
    { id: "problems", label: "Problems", icon: Target },
    { id: "projects", label: "Projects", icon: FileText },
    { id: "ideas", label: "Ideas", icon: MessageSquare },
    { id: "blog", label: "Blog Posts", icon: Calendar },
    { id: "partners", label: "Partners", icon: UserCheck },
    { id: "contacts", label: "Messages", icon: Mail },
    { id: "programs", label: "Programs", icon: Users },
  ];

  const stats = [
    {
      label: "Total Courses",
      value: courses.length.toString(),
      change: "+12%",
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      label: "Active Challenges",
      value: challenges.length.toString(),
      change: "+8%",
      icon: Trophy,
      color: "bg-green-500",
    },
    {
      label: "Pending Solutions",
      value: solutions.filter(s => s.status === 'pending').length.toString(),
      change: "+23%",
      icon: Lightbulb,
      color: "bg-yellow-500",
    },
    {
      label: "Total Students",
      value: "1,250",
      change: "+15%",
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading((prev) => ({ ...prev, global: true }));
    try {
      const [
        partnersRes,
        contactsRes,
        blogsRes,
        programsRes,
        challengesRes,
        solutionsRes,
        problemsRes,
        capstoneRes,
        ideasRes,
        coursesRes,
      ] = await Promise.all([
        getPartnerApplications().catch(() => ({ documents: [] })),
        getContactMessages().catch(() => ({ documents: [] })),
        getBlogPosts().catch(() => ({ documents: [] })),
        getPrograms().catch(() => ({ documents: [] })),
        getChallenges().catch(() => ({ documents: [] })),
        getSolutions(true).catch(() => ({ documents: [] })), // Admin view - see all solutions
        getProblems().catch(() => ({ documents: [] })),
        getCapstoneProjects().catch(() => ({ documents: [] })),
        getIdeas().catch(() => ({ documents: [] })),
        getCourses().catch(() => ({ documents: [] })),
      ]);

      setPartnerApplications(partnersRes.documents || []);
      setContactMessages(contactsRes.documents || []);
      setBlogPosts(blogsRes.documents || []);
      setPrograms(programsRes.documents || []);
      setChallenges(challengesRes.documents || []);
      setSolutions(solutionsRes.documents || []);
      setProblems(problemsRes.documents || []);
      setCapstoneProjects(capstoneRes.documents || []);
      setIdeas(ideasRes.documents || []);
      setCourses(coursesRes.documents || []);

      toast.success("Data loaded successfully!");
    } catch (error) {
      console.error("Failed to load data:", error);
      toast.error(`Failed to load data: ${error.message || "Unknown error"}`);
    } finally {
      setLoading((prev) => ({ ...prev, global: false }));
    }
  };

  const handleCreate = (type) => {
    setCreateType(type);
    setFormData({});
    setShowCreateModal(true);
  };

  const handleEdit = (type, item) => {
    setCreateType(type);
    setEditItem(item);
    setFormData(item);
    setShowEditModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, [createType]: true }));
    
    try {
      if (showEditModal && editItem) {
        // Update existing item
        switch (createType) {
          case "course":
            await updateCourse(editItem.$id, formData);
            toast.success("Course updated successfully!");
            break;
          case "challenge":
            await updateChallenge(editItem.$id, formData);
            toast.success("Challenge updated successfully!");
            break;
          case "blog":
            await updateBlogPost(editItem.$id, formData);
            toast.success("Blog post updated successfully!");
            break;
          case "program":
            await updateProgram(editItem.$id, formData);
            toast.success("Program updated successfully!");
            break;
          case "problem":
            await updateProblem(editItem.$id, formData);
            toast.success("Problem updated successfully!");
            break;
          default:
            throw new Error("Invalid update type");
        }
      } else {
        // Create new item
        switch (createType) {
          case "course":
            await createCourse({
              title: formData.title || "New Course",
              description: formData.description || "Course description",
              instructor: formData.instructor || "Instructor Name",
              price: parseFloat(formData.price) || 0,
              duration: formData.duration || "10 hours",
              level: formData.level || "Beginner",
              category: formData.category || "General",
              image: formData.image || "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
            });
            toast.success("Course created successfully!");
            break;
          case "challenge":
            await createChallenge({
              title: formData.title || "New Innovation Challenge",
              description: formData.description || "Description of the new challenge",
              deadline: formData.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
              prize: formData.prize || "$1,000",
              tags: formData.tags?.split(",") || ["Innovation", "Technology"],
              status: formData.status || "active",
            });
            toast.success("Challenge created successfully!");
            break;
          case "blog":
            await createBlogPost({
              title: formData.title || "New Blog Post",
              excerpt: formData.excerpt || "This is a sample blog post excerpt",
              content: formData.content || "<p>This is the content of the blog post.</p>",
              author: formData.author || "Admin",
              category: formData.category || "General",
              tags: formData.tags || "sample",
              image: formData.image || "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
            });
            toast.success("Blog post created successfully!");
            break;
          case "program":
            await createProgram({
              title: formData.title || "New Program",
              description: formData.description || "Description of the new program",
              duration: formData.duration || "3 months",
              commitment: formData.commitment || "Part-time",
              benefits: formData.benefits?.split(",") || ["Benefit 1", "Benefit 2"],
              type: formData.type || "fellowship",
            });
            toast.success("Program created successfully!");
            break;
          case "problem":
            await createProblem({
              title: formData.title || "New Problem",
              description: formData.description || "Description of the problem that needs solving",
              category: formData.category || "General",
              submittedBy: formData.submittedBy || "Admin",
            });
            toast.success("Problem created successfully!");
            break;
          default:
            throw new Error("Invalid create type");
        }
      }
      
      setShowCreateModal(false);
      setShowEditModal(false);
      setEditItem(null);
      await loadData();
    } catch (error) {
      console.error(`Failed to ${showEditModal ? 'update' : 'create'} ${createType}:`, error);
      toast.error(`Failed to ${showEditModal ? 'update' : 'create'} ${createType}: ${error.message || "Unknown error"}`);
    } finally {
      setLoading((prev) => ({ ...prev, [createType]: false }));
    }
  };

  const handleDelete = async (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      setLoading((prev) => ({ ...prev, [type]: true }));
      try {
        switch (type) {
          case "course":
            await deleteCourse(id);
            toast.success("Course deleted successfully!");
            break;
          case "challenge":
            await deleteChallenge(id);
            toast.success("Challenge deleted successfully!");
            break;
          case "blog":
            await deleteBlogPost(id);
            toast.success("Blog post deleted successfully!");
            break;
          case "program":
            await deleteProgram(id);
            toast.success("Program deleted successfully!");
            break;
          case "problem":
            await deleteProblem(id);
            toast.success("Problem deleted successfully!");
            break;
          case "solution":
            await deleteSolution(id);
            toast.success("Solution deleted successfully!");
            break;
          case "partner":
            await deletePartnerApplication(id);
            toast.success("Partner application deleted successfully!");
            break;
          case "contact":
            await deleteContactMessage(id);
            toast.success("Contact message deleted successfully!");
            break;
          case "project":
            await deleteCapstoneProject(id);
            toast.success("Project deleted successfully!");
            break;
          case "idea":
            await deleteIdea(id);
            toast.success("Idea deleted successfully!");
            break;
          default:
            throw new Error("Invalid delete type");
        }
        await loadData();
      } catch (error) {
        console.error(`Failed to delete ${type}:`, error);
        toast.error(`Failed to delete ${type}: ${error.message || "Unknown error"}`);
      } finally {
        setLoading((prev) => ({ ...prev, [type]: false }));
      }
    }
  };

  const handleStatusChange = async (type, id, status) => {
    setLoading((prev) => ({ ...prev, [type]: true }));
    try {
      switch (type) {
        case "solution":
          if (status === "approved") {
            await approveSolution(id);
            toast.success("Solution approved!");
          } else if (status === "rejected") {
            await rejectSolution(id);
            toast.success("Solution rejected!");
          }
          break;
        case "course":
          if (status === "published") {
            await publishCourse(id);
            toast.success("Course published!");
          } else if (status === "draft") {
            await unpublishCourse(id);
            toast.success("Course unpublished!");
          }
          break;
        case "partner":
          await updatePartnerApplication(id, { status });
          toast.success(`Partner application ${status}!`);
          break;
        case "contact":
          await updateContactMessage(id, { status });
          toast.success(`Message marked as ${status}!`);
          break;
        case "project":
          await updateCapstoneProject(id, { status });
          toast.success(`Project ${status}!`);
          break;
        case "idea":
          await updateIdea(id, { status });
          toast.success(`Idea ${status}!`);
          break;
        default:
          throw new Error("Invalid status change type");
      }
      await loadData();
    } catch (error) {
      console.error(`Failed to update ${type} status:`, error);
      toast.error(`Failed to update ${type} status: ${error.message || "Unknown error"}`);
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={() => handleCreate("course")}
            className="w-full"
            disabled={loading.global || loading.course}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Course
          </Button>
          <Button
            onClick={() => handleCreate("challenge")}
            className="w-full"
            disabled={loading.global || loading.challenge}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Challenge
          </Button>
          <Button
            onClick={() => handleCreate("blog")}
            className="w-full"
            disabled={loading.global || loading.blog}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Blog Post
          </Button>
          <Button
            onClick={() => handleCreate("program")}
            className="w-full"
            disabled={loading.global || loading.program}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Program
          </Button>
        </div>
      </Card>
      
      {loading.global && (
        <Card className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        </Card>
      )}
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Courses Management</h2>
        <Button
          onClick={() => handleCreate("course")}
          disabled={loading.global || loading.course}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>
      <Card className="overflow-hidden">
        {loading.global ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No courses found. Create your first course!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.$id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-10 h-10 rounded object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-slate-900">
                            {course.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {course.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.instructor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${course.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.students || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          course.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit("course", course)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(
                              "course",
                              course.$id,
                              course.status === "published" ? "draft" : "published"
                            )
                          }
                          className="text-green-600 hover:text-green-900"
                          disabled={loading.course}
                        >
                          {course.status === "published" ? (
                            <XCircle className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete("course", course.$id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={loading.course}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );

  const renderSolutions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Solutions Management</h2>
        <span className="text-sm text-gray-600">
          {solutions.length} solutions ({solutions.filter(s => s.status === 'pending').length} pending approval)
        </span>
      </div>
      <Card className="overflow-hidden">
        {loading.global ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading solutions...</p>
          </div>
        ) : solutions.length === 0 ? (
          <div className="p-8 text-center">
            <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No solutions submitted yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {solutions.map((solution) => (
                  <tr key={solution.$id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {solution.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {solution.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {solution.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          solution.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : solution.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {solution.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(solution.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {solution.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange("solution", solution.$id, "approved")
                              }
                              className="text-green-600 hover:text-green-900"
                              disabled={loading.solution}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange("solution", solution.$id, "rejected")
                              }
                              className="text-red-600 hover:text-red-900"
                              disabled={loading.solution}
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete("solution", solution.$id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={loading.solution}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );

  // Add similar render functions for other sections...
  const renderChallenges = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Challenges</h2>
        <Button
          onClick={() => handleCreate("challenge")}
          disabled={loading.global || loading.challenge}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Challenge
        </Button>
      </div>
      <Card className="overflow-hidden">
        {loading.global ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading challenges...</p>
          </div>
        ) : challenges.length === 0 ? (
          <div className="p-8 text-center">
            <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No challenges found. Create your first challenge!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prize
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {challenges.map((challenge) => (
                  <tr key={challenge.$id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {challenge.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          challenge.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {challenge.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(challenge.deadline).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {challenge.prize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit("challenge", challenge)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete("challenge", challenge.$id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={loading.challenge}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );

  const renderCreateModal = () => {
    if (!showCreateModal && !showEditModal) return null;
    
    const isEditing = showEditModal && editItem;
    const modalTitle = isEditing 
      ? `Edit ${createType.charAt(0).toUpperCase() + createType.slice(1)}`
      : `Create ${createType.charAt(0).toUpperCase() + createType.slice(1)}`;

    const fields = {
      course: [
        { name: "title", label: "Title", type: "text", placeholder: "Course Title" },
        { name: "description", label: "Description", type: "textarea", placeholder: "Course description" },
        { name: "instructor", label: "Instructor", type: "text", placeholder: "Instructor Name" },
        { name: "price", label: "Price ($)", type: "number", placeholder: "99" },
        { name: "duration", label: "Duration", type: "text", placeholder: "10 hours" },
        { name: "level", label: "Level", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
        { name: "category", label: "Category", type: "text", placeholder: "Web Development" },
        { name: "image", label: "Image URL", type: "text", placeholder: "https://..." },
      ],
      challenge: [
        { name: "title", label: "Title", type: "text", placeholder: "New Innovation Challenge" },
        { name: "description", label: "Description", type: "textarea", placeholder: "Description of the new challenge" },
        { name: "deadline", label: "Deadline", type: "date" },
        { name: "prize", label: "Prize", type: "text", placeholder: "$1,000" },
        { name: "tags", label: "Tags (comma-separated)", type: "text", placeholder: "Innovation, Technology" },
        { name: "status", label: "Status", type: "select", options: ["active", "inactive"] },
      ],
      blog: [
        { name: "title", label: "Title", type: "text", placeholder: "New Blog Post" },
        { name: "excerpt", label: "Excerpt", type: "text", placeholder: "This is a sample blog post excerpt" },
        { name: "content", label: "Content", type: "textarea", placeholder: "This is the content of the blog post" },
        { name: "author", label: "Author", type: "text", placeholder: "Admin" },
        { name: "category", label: "Category", type: "text", placeholder: "General" },
        { name: "tags", label: "Tags (comma-separated)", type: "text", placeholder: "sample" },
        { name: "image", label: "Image URL", type: "text", placeholder: "https://..." },
      ],
      program: [
        { name: "title", label: "Title", type: "text", placeholder: "New Program" },
        { name: "description", label: "Description", type: "textarea", placeholder: "Description of the new program" },
        { name: "duration", label: "Duration", type: "text", placeholder: "3 months" },
        { name: "commitment", label: "Commitment", type: "text", placeholder: "Part-time" },
        { name: "benefits", label: "Benefits (comma-separated)", type: "text", placeholder: "Benefit 1, Benefit 2" },
        { name: "type", label: "Type", type: "select", options: ["fellowship", "internship", "partnership"] },
      ],
      problem: [
        { name: "title", label: "Title", type: "text", placeholder: "New Problem" },
        { name: "description", label: "Description", type: "textarea", placeholder: "Description of the problem" },
        { name: "category", label: "Category", type: "text", placeholder: "General" },
        { name: "submittedBy", label: "Submitted By", type: "text", placeholder: "Admin" },
      ],
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            {modalTitle}
          </h2>
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields[createType]?.map((field) => (
                <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                      placeholder={field.placeholder}
                      rows={4}
                    />
                  ) : field.type === "select" ? (
                    <select
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button
                type="button"
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  setEditItem(null);
                }}
                className="bg-gray-200 text-gray-700"
                disabled={loading[createType]}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading[createType]}>
                {loading[createType] ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  isEditing ? "Update" : "Create"
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "courses":
        return renderCourses();
      case "challenges":
        return renderChallenges();
      case "solutions":
        return renderSolutions();
      // Add other cases as needed
      default:
        return renderOverview();
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your Syneroa platform</p>
        </div>
        
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
        
        {renderCreateModal()}
      </div>
    </div>
  );
};

export default AdminDashboard;