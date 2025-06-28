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
} from "lucide-react";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import {
  getPartnerApplications,
  getContactMessages,
  getBlogPosts,
  createBlogPost,
  deleteBlogPost,
  getPrograms,
  createProgram,
  deleteProgram,
  getChallenges,
  createChallenge,
  deleteChallenge,
  getSolutions,
  deleteSolution,
  getProblems,
  createProblem,
  deleteProblem,
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
  const [loading, setLoading] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState("");
  const [formData, setFormData] = useState({});

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "challenges", label: "Challenges", icon: Trophy },
    { id: "solutions", label: "Solutions", icon: Lightbulb },
    { id: "problems", label: "Problems", icon: Target },
    { id: "blog", label: "Blog Posts", icon: Calendar },
    { id: "partners", label: "Partners", icon: UserCheck },
    { id: "contacts", label: "Messages", icon: Mail },
    { id: "programs", label: "Programs", icon: FileText },
  ];

  const stats = [
    {
      label: "Total Challenges",
      value: challenges.length.toString(),
      change: "+12%",
      icon: Trophy,
      color: "bg-blue-500",
    },
    {
      label: "Solutions Submitted",
      value: solutions.length.toString(),
      change: "+23%",
      icon: Lightbulb,
      color: "bg-green-500",
    },
    {
      label: "Problems Posted",
      value: problems.length.toString(),
      change: "+8%",
      icon: Target,
      color: "bg-purple-500",
    },
    {
      label: "Partner Applications",
      value: partnerApplications.length.toString(),
      change: "+15%",
      icon: UserCheck,
      color: "bg-orange-500",
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading((prev) => ({ ...prev, global: true }));
    try {
      console.log("Starting to load data...");
      const [
        partnersRes,
        contactsRes,
        blogsRes,
        programsRes,
        challengesRes,
        solutionsRes,
        problemsRes,
      ] = await Promise.all([
        getPartnerApplications().catch((e) => {
          console.error("Error fetching partners:", e);
          return { documents: [] };
        }),
        getContactMessages().catch((e) => {
          console.error("Error fetching contacts:", e);
          return { documents: [] };
        }),
        getBlogPosts().catch((e) => {
          console.error("Error fetching blogs:", e);
          return { documents: [] };
        }),
        getPrograms().catch((e) => {
          console.error("Error fetching programs:", e);
          return { documents: [] };
        }),
        getChallenges().catch((e) => {
          console.error("Error fetching challenges:", e);
          return { documents: [] };
        }),
        getSolutions().catch((e) => {
          console.error("Error fetching solutions:", e);
          return { documents: [] };
        }),
        getProblems().catch((e) => {
          console.error("Error fetching problems:", e);
          return { documents: [] };
        }),
      ]);

      setPartnerApplications(partnersRes.documents || []);
      setContactMessages(contactsRes.documents || []);
      setBlogPosts(blogsRes.documents || []);
      setPrograms(programsRes.documents || []);
      setChallenges(challengesRes.documents || []);
      setSolutions(solutionsRes.documents || []);
      setProblems(problemsRes.documents || []);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, [createType]: true }));
    try {
      switch (createType) {
        case "challenge":
          await createChallenge({
            title: formData.title || "New Innovation Challenge",
            description:
              formData.description || "Description of the new challenge",
            deadline:
              formData.deadline ||
              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
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
            content:
              formData.content ||
              "<p>This is the content of the blog post.</p>",
            author: formData.author || "Admin",
            category: formData.category || "General",
            tags: formData.tags?.split(",") || ["sample"],
            image:
              formData.image ||
              "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
          });
          toast.success("Blog post created successfully!");
          break;
        case "program":
          await createProgram({
            title: formData.title || "New Program",
            description:
              formData.description || "Description of the new program",
            duration: formData.duration || "3 months",
            commitment: formData.commitment || "Part-time",
            benefits: formData.benefits?.split(",") || [
              "Benefit 1",
              "Benefit 2",
            ],
            type: formData.type || "fellowship",
          });
          toast.success("Program created successfully!");
          break;
        case "problem":
          await createProblem({
            title: formData.title || "New Problem",
            description:
              formData.description ||
              "Description of the problem that needs solving",
            category: formData.category || "General",
            submittedBy: formData.submittedBy || "Admin",
          });
          toast.success("Problem created successfully!");
          break;
        default:
          throw new Error("Invalid create type");
      }
      setShowCreateModal(false);
      await loadData();
    } catch (error) {
      console.error(`Failed to create ${createType}:`, error);
      toast.error(
        `Failed to create ${createType}: ${error.message || "Unknown error"}`
      );
    } finally {
      setLoading((prev) => ({ ...prev, [createType]: false }));
    }
  };

  const handleDelete = async (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      setLoading((prev) => ({ ...prev, [type]: true }));
      try {
        switch (type) {
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
          default:
            throw new Error("Invalid delete type");
        }
        await loadData();
      } catch (error) {
        console.error(`Failed to delete ${type}:`, error);
        toast.error(
          `Failed to delete ${type}: ${error.message || "Unknown error"}`
        );
      } finally {
        setLoading((prev) => ({ ...prev, [type]: false }));
      }
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
          <Button
            onClick={() => handleCreate("problem")}
            className="w-full"
            disabled={loading.global || loading.problem}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Problem
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
                        <button className="text-teal-600 hover:text-teal-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete("challenge", challenge.$id)
                          }
                          className="text-red-600 hover:text-red-900"
                          disabled={loading.global || loading.challenge}
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
        <h2 className="text-2xl font-bold text-slate-900">Solutions</h2>
        <span className="text-sm text-gray-600">
          {solutions.length} solutions
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
                    University
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
                      {solution.university}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {solution.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        {solution.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(solution.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete("solution", solution.$id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={loading.global || loading.solution}
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

  const renderProblems = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Problems</h2>
        <Button
          onClick={() => handleCreate("problem")}
          disabled={loading.global || loading.problem}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Problem
        </Button>
      </div>
      <Card className="overflow-hidden">
        {loading.global ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading problems...</p>
          </div>
        ) : problems.length === 0 ? (
          <div className="p-8 text-center">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No problems posted yet. Create your first problem!
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
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Votes
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
                {problems.map((problem) => (
                  <tr key={problem.$id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {problem.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {problem.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {problem.submittedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {problem.votes || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(problem.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete("problem", problem.$id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={loading.global || loading.problem}
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

  const renderPartners = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">
          Partner Applications
        </h2>
        <span className="text-sm text-gray-600">
          {partnerApplications.length} applications
        </span>
      </div>
      <Card className="overflow-hidden">
        {loading.global ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              Loading partner applications...
            </p>
          </div>
        ) : partnerApplications.length === 0 ? (
          <div className="p-8 text-center">
            <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No partner applications yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {partnerApplications.map((application) => (
                  <tr key={application.$id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {application.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.organization}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(application.createdAt).toLocaleDateString()}
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

  const renderContacts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Contact Messages</h2>
        <span className="text-sm text-gray-600">
          {contactMessages.length} messages
        </span>
      </div>
      <Card className="overflow-hidden">
        {loading.global ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading messages...</p>
          </div>
        ) : contactMessages.length === 0 ? (
          <div className="p-8 text-center">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No messages yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contactMessages.map((message) => (
                  <tr key={message.$id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {message.firstName} {message.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {message.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {message.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {message.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(message.createdAt).toLocaleDateString()}
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

  const renderBlog = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Blog Posts</h2>
        <Button
          onClick={() => handleCreate("blog")}
          disabled={loading.global || loading.blog}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </div>
      <Card className="overflow-hidden">
        {loading.global ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No blog posts yet. Create your first post!
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
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
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
                {blogPosts.map((post) => (
                  <tr key={post.$id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {post.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {post.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {post.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete("blog", post.$id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={loading.global || loading.blog}
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

  const renderPrograms = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Programs</h2>
        <Button
          onClick={() => handleCreate("program")}
          disabled={loading.global || loading.program}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Program
        </Button>
      </div>
      <Card className="overflow-hidden">
        {loading.global ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading programs...</p>
          </div>
        ) : programs.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No programs yet. Create your first program!
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
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {programs.map((program) => (
                  <tr key={program.$id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {program.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {program.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {program.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(program.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete("program", program.$id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={loading.global || loading.program}
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
    if (!showCreateModal) return null;
    const fields = {
      challenge: [
        {
          name: "title",
          label: "Title",
          type: "text",
          placeholder: "New Innovation Challenge",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          placeholder: "Description of the new challenge",
        },
        { name: "deadline", label: "Deadline", type: "date" },
        { name: "prize", label: "Prize", type: "text", placeholder: "$1,000" },
        {
          name: "tags",
          label: "Tags (comma-separated)",
          type: "text",
          placeholder: "Innovation, Technology",
        },
        {
          name: "status",
          label: "Status",
          type: "text",
          placeholder: "active",
        },
      ],
      blog: [
        {
          name: "title",
          label: "Title",
          type: "text",
          placeholder: "New Blog Post",
        },
        {
          name: "excerpt",
          label: "Excerpt",
          type: "text",
          placeholder: "This is a sample blog post excerpt",
        },
        {
          name: "content",
          label: "Content",
          type: "textarea",
          placeholder: "This is the content of the blog post",
        },
        { name: "author", label: "Author", type: "text", placeholder: "Admin" },
        {
          name: "category",
          label: "Category",
          type: "text",
          placeholder: "General",
        },
        {
          name: "tags",
          label: "Tags (comma-separated)",
          type: "text",
          placeholder: "sample",
        },
        {
          name: "image",
          label: "Image URL",
          type: "text",
          placeholder: "https://images.pexels.com/...",
        },
      ],
      program: [
        {
          name: "title",
          label: "Title",
          type: "text",
          placeholder: "New Program",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          placeholder: "Description of the new program",
        },
        {
          name: "duration",
          label: "Duration",
          type: "text",
          placeholder: "3 months",
        },
        {
          name: "commitment",
          label: "Commitment",
          type: "text",
          placeholder: "Part-time",
        },
        {
          name: "benefits",
          label: "Benefits (comma-separated)",
          type: "text",
          placeholder: "Benefit 1, Benefit 2",
        },
        {
          name: "type",
          label: "Type",
          type: "text",
          placeholder: "fellowship",
        },
      ],
      problem: [
        {
          name: "title",
          label: "Title",
          type: "text",
          placeholder: "New Problem",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          placeholder: "Description of the problem",
        },
        {
          name: "category",
          label: "Category",
          type: "text",
          placeholder: "General",
        },
        {
          name: "submittedBy",
          label: "Submitted By",
          type: "text",
          placeholder: "Admin",
        },
      ],
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-full max-w-lg p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Create {createType.charAt(0).toUpperCase() + createType.slice(1)}
          </h2>
          <form onSubmit={handleFormSubmit}>
            {fields[createType].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                    placeholder={field.placeholder}
                    rows={4}
                  />
                ) : (
                  <input
                    type={field.type}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="bg-gray-200 text-gray-700"
                disabled={loading[createType]}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading[createType]}>
                {loading[createType] ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  "Create"
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
      case "challenges":
        return renderChallenges();
      case "solutions":
        return renderSolutions();
      case "problems":
        return renderProblems();
      case "partners":
        return renderPartners();
      case "contacts":
        return renderContacts();
      case "blog":
        return renderBlog();
      case "programs":
        return renderPrograms();
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
