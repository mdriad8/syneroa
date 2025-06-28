import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Trophy,
  Lightbulb,
  MessageSquare,
  ArrowRight,
  Filter,
  Search,
  ThumbsUp,
} from "lucide-react";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import ChallengeDetailsModal from "../components/ChallengeDetailsModal";
import IdeaSubmissionModal from "../components/IdeaSubmissionModal";
import ProjectSubmissionModal from "../components/ProjectSubmissionModal";
import ProblemDetailsModal from "../components/ProblemDetailsModal";
import SolutionModal from "../components/SolutionModal";
import CapstoneProjectDetailsModal from "../components/CapstoneProjectDetailsModal";
import ProblemSubmissionModal from "../components/ProblemSubmissionModal";
import SolutionDetailsModal from "../components/SolutionDetailsModal";

import {
  upvoteProblem,
  getChallenges,
  getSolutions,
  getProblems,
  getCapstoneProjects,
} from "../services/database";
import toast from "react-hot-toast";

const Platform = () => {
  const [activeTab, setActiveTab] = useState("challenges");
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [showChallengeDetailsModal, setShowChallengeDetailsModal] =
    useState(false);
  const [showIdeaSubmissionModal, setShowIdeaSubmissionModal] = useState(false);
  const [showProjectSubmissionModal, setShowProjectSubmissionModal] =
    useState(false);
  const [showProblemDetailsModal, setShowProblemDetailsModal] = useState(false);
  const [showCapstoneProjectDetailsModal, setShowCapstoneProjectDetailsModal] =
    useState(false);
  const [showProblemSubmissionModal, setShowProblemSubmissionModal] =
    useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [problems, setProblems] = useState([]);
  const [capstoneProjects, setCapstoneProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSolutionDetailsModal, setShowSolutionDetailsModal] =
    useState(false);

  const tabs = [
    { id: "challenges", label: "Innovation Challenges", icon: Trophy },
    { id: "solutions", label: "Solutions Library", icon: Lightbulb },
    { id: "projects", label: "Capstone Accelerator", icon: Calendar },
    { id: "problems", label: "Problem Hub", icon: MessageSquare },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (retryCount = 0) => {
    const maxRetries = 2;
    setLoading(true);
    setError(null);
    try {
      const [challengesRes, solutionsRes, problemsRes, capstoneRes] =
        await Promise.all([
          getChallenges().then((res) => {
            if (!res || typeof res !== "object")
              throw new Error("Invalid challenges response");
            const data = Array.isArray(res)
              ? res
              : res.documents || res.data?.documents || [];
            return data;
          }),
          getSolutions().then((res) => {
            if (!res || typeof res !== "object")
              throw new Error("Invalid solutions response");
            const data = Array.isArray(res)
              ? res
              : res.documents || res.data?.documents || [];
            return data;
          }),
          getProblems().then((res) => {
            if (!res || typeof res !== "object")
              throw new Error("Invalid problems response");
            const data = Array.isArray(res)
              ? res
              : res.documents || res.data?.documents || [];
            return data;
          }),
          getCapstoneProjects().then((res) => {
            if (!res || typeof res !== "object")
              throw new Error("Invalid capstone response");
            const data = Array.isArray(res)
              ? res
              : res.documents || res.data?.documents || [];
            return data;
          }),
        ]);

      if (
        !challengesRes.length &&
        !solutionsRes.length &&
        !problemsRes.length &&
        !capstoneRes.length
      ) {
        console.warn(
          "All data arrays are empty, possible API issue or empty collections."
        );
      }
      setChallenges(challengesRes);
      setSolutions(solutionsRes);
      setProblems(problemsRes);
      setCapstoneProjects(capstoneRes);
    } catch (error) {
      console.error("Data loading error:", error);
      const errorMessage = error.message.includes(
        "Collection with the requested ID"
      )
        ? `Database error: Collection not found. Verify collection IDs. Check console for details.`
        : `Failed to load data: ${error.message}. Check console for details.`;
      setError(errorMessage);
      if (retryCount < maxRetries) {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (retryCount + 1))
        );
        return loadData(retryCount + 1);
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (problemId) => {
    try {
      await upvoteProblem(problemId);
      setProblems((prev) =>
        prev.map((problem) =>
          problem.$id === problemId
            ? { ...problem, votes: (problem.votes || 0) + 1 }
            : problem
        )
      );
      toast.success("Vote recorded!");
    } catch (error) {
      toast.error("Failed to record vote");
    }
  };

  const handleViewDetails = (itemId, type) => {
    setSelectedItemId(itemId);
    if (type === "challenge") setShowChallengeDetailsModal(true);
    if (type === "problem") setShowProblemDetailsModal(true);
    if (type === "project") setShowCapstoneProjectDetailsModal(true);
    if (type === "solution") setShowSolutionDetailsModal(true);
  };

  const handleSubmitSolution = (challengeId = "") => {
    setSelectedItemId(challengeId);
    setShowSolutionModal(true);
  };

  const handleSubmitIdea = () => {
    setShowIdeaSubmissionModal(true);
  };

  const handleSubmitProject = () => {
    setShowProjectSubmissionModal(true);
  };

  const handleSubmitProblem = () => {
    setShowProblemSubmissionModal(true);
  };

  const renderChallenges = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Monthly Innovation Challenges
          </h2>
          <p className="text-gray-600">
            Launch Your Solution. Win Recognition. Create Impact.
          </p>
        </div>
        <Button onClick={handleSubmitIdea}>Submit Your Idea</Button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading challenges...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
          <Button onClick={() => loadData()} className="mt-4">
            Retry
          </Button>
        </div>
      ) : challenges.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">
            No challenges available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.$id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          new Date(challenge.deadline) >
                          new Date("2025-06-24T09:02:00+06:00")
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {new Date(challenge.deadline) >
                        new Date("2025-06-24T09:02:00+06:00")
                          ? "Active"
                          : "Ending Soon"}
                      </span>
                      <span className="text-sm text-gray-500">
                        Deadline:{" "}
                        {new Date(challenge.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {challenge.title || "Untitled Challenge"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {challenge.description || "No description available"}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {challenge.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                        >
                          {tag}
                        </span>
                      )) || null}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{challenge.participants || 0} participants</span>
                      <span>Prize: {challenge.prize || "N/A"}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        handleViewDetails(challenge.$id, "challenge")
                      }
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSubmitSolution(challenge.$id)}
                    >
                      Submit Solution
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSolutions = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Solutions Library
          </h2>
          <p className="text-gray-600">
            Browse Real Micro-Tools Solving Real Problems
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" disabled>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading solutions...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
          <Button onClick={() => loadData()} className="mt-4">
            Retry
          </Button>
        </div>
      ) : solutions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No solutions available at the moment.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.$id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                  <Lightbulb className="h-16 w-16 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded text-sm font-medium">
                      {solution.category || "Uncategorized"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {solution.title || "Untitled Solution"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {solution.description || "No description available"}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {solution.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {tag}
                      </span>
                    )) || null}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      by {solution.author || "Unknown"}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleViewDetails(solution.$id, "solution")
                      }
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Capstone Project Accelerator
          </h2>
          <p className="text-gray-600">
            Give Your Final Year Project a Second Life
          </p>
        </div>
        <Button onClick={handleSubmitProject}>Submit Project</Button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading projects...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
          <Button onClick={() => loadData()} className="mt-4">
            Retry
          </Button>
        </div>
      ) : capstoneProjects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No projects available at the moment.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {capstoneProjects.map((project, index) => (
            <motion.div
              key={project.$id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <Calendar className="h-16 w-16 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      {project.university}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        project.status === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      by {project.author}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(project.$id, "project")}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const renderProblems = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Problem Hub</h2>
          <p className="text-gray-600">
            Have a Problem That Needs a Digital Solution? Submit Here.
          </p>
        </div>
        <Button onClick={handleSubmitProblem}>Submit a Problem</Button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading problems...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
          <Button onClick={() => loadData()} className="mt-4">
            Retry
          </Button>
        </div>
      ) : problems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No problems available at the moment.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.$id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                        {problem.category || "Uncategorized"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(problem.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {problem.title || "Untitled Problem"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {problem.description || "No description available"}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>
                        Submitted by {problem.submittedBy || "Unknown"}
                      </span>
                      <span>{problem.votes || 0} votes</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpvote(problem.$id)}
                      className="flex items-center gap-1"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      Upvote
                    </Button>
                    <Button size="sm" onClick={() => handleSubmitSolution()}>
                      Solve This
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(problem.$id, "problem")}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "challenges":
        return renderChallenges();
      case "solutions":
        return renderSolutions();
      case "projects":
        return renderProjects();
      case "problems":
        return renderProblems();
      default:
        return renderChallenges();
    }
  };

  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-br from-slate-900 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The Syneroa Platform
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Solve Real Problems. Win the Future. Your innovation engine for
              creating meaningful impact through collaborative technology
              solutions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-teal-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </section>

      <section className="py-20 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join the Innovation?
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Whether you're here to solve problems, showcase solutions, or find
              your next big challenge — the Syneroa platform has everything you
              need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Join as Student <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                Become a Mentor
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Modals */}
      <SolutionModal
        isOpen={showSolutionModal}
        onClose={() => setShowSolutionModal(false)}
        challengeId={selectedItemId}
      />
      <ChallengeDetailsModal
        isOpen={showChallengeDetailsModal}
        onClose={() => setShowChallengeDetailsModal(false)}
        challengeId={selectedItemId}
        challenges={challenges}
      />
      <IdeaSubmissionModal
        isOpen={showIdeaSubmissionModal}
        onClose={() => setShowIdeaSubmissionModal(false)}
      />
      <ProjectSubmissionModal
        isOpen={showProjectSubmissionModal}
        onClose={() => setShowProjectSubmissionModal(false)}
      />
      <ProblemDetailsModal
        isOpen={showProblemDetailsModal}
        onClose={() => setShowProblemDetailsModal(false)}
        problemId={selectedItemId}
        problems={problems}
      />
      <CapstoneProjectDetailsModal
        isOpen={showCapstoneProjectDetailsModal}
        onClose={() => setShowCapstoneProjectDetailsModal(false)}
        projectId={selectedItemId}
        capstoneProjects={capstoneProjects}
      />
      <ProblemSubmissionModal
        isOpen={showProblemSubmissionModal}
        onClose={() => setShowProblemSubmissionModal(false)}
      />
      <SolutionDetailsModal
        isOpen={showSolutionDetailsModal}
        onClose={() => setShowSolutionDetailsModal(false)}
        solutionId={selectedItemId}
        solutions={solutions}
      />
    </div>
  );
};

export default Platform;
