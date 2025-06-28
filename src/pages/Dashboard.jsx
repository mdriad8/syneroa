import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Trophy,
  Users,
  Calendar,
  Star,
  Clock,
  ArrowRight,
  Play,
  CheckCircle,
  Award,
  DollarSign,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import { Link } from "react-router-dom";
import { getUserEnrollments, getCourse } from "../services/database";

const Dashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      // Load user enrollments
      const enrollmentsResponse = await getUserEnrollments(user.$id);
      const enrollments = enrollmentsResponse.documents || [];

      // Load course details for each enrollment
      const coursesWithDetails = await Promise.all(
        enrollments.map(async (enrollment) => {
          try {
            const course = await getCourse(enrollment.courseId);
            return {
              ...course,
              enrollment,
              progress: enrollment.progress || 0,
            };
          } catch (error) {
            console.error(`Failed to load course ${enrollment.courseId}:`, error);
            return null;
          }
        })
      );

      setEnrolledCourses(coursesWithDetails.filter(course => course !== null));

      // Mock recent activity - replace with actual data
      setRecentActivity([
        {
          type: "course_enrolled",
          title: `Enrolled in: ${coursesWithDetails[0]?.title || 'New Course'}`,
          time: "2 hours ago",
          icon: CheckCircle,
        },
        {
          type: "challenge_joined",
          title: "Joined: Climate Tech Innovation Challenge",
          time: "1 day ago",
          icon: Trophy,
        },
        {
          type: "certificate_earned",
          title: "Earned: Web Development Certificate",
          time: "3 days ago",
          icon: Award,
        },
      ]);

      setAchievements([
        { name: "First Course Enrolled", earned: enrollments.length > 0 },
        { name: "Course Completed", earned: enrollments.some(e => e.progress >= 100) },
        { name: "Community Contributor", earned: false },
        { name: "Innovation Leader", earned: false },
      ]);
    } catch (error) {
      console.error("Failed to load user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "Courses Enrolled",
      value: enrolledCourses.length.toString(),
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      label: "Challenges Joined",
      value: "5",
      icon: Trophy,
      color: "bg-green-500",
    },
    {
      label: "Certificates Earned",
      value: enrolledCourses.filter(c => c.progress >= 100).length.toString(),
      icon: Award,
      color: "bg-purple-500",
    },
    {
      label: "Study Hours",
      value: Math.round(enrolledCourses.reduce((total, course) => {
        const duration = parseFloat(course.duration?.replace(/[^\d.]/g, '') || '0');
        return total + (duration * (course.progress / 100));
      }, 0)).toString(),
      icon: Clock,
      color: "bg-orange-500",
    },
  ];

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {user?.name || "Student"}!
          </h1>
          <p className="text-gray-600">
            Continue your learning journey and explore new opportunities.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Continue Learning
                </h2>
                <Link
                  to="/courses"
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  View All Courses
                </Link>
              </div>

              {enrolledCourses.length === 0 ? (
                <Card className="p-8 text-center">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    No courses enrolled yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Start your learning journey by enrolling in a course
                  </p>
                  <Link to="/courses">
                    <Button>Browse Courses</Button>
                  </Link>
                </Card>
              ) : (
                <div className="space-y-4">
                  {enrolledCourses.slice(0, 3).map((course) => (
                    <Card key={course.$id} hover className="p-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={course.image || "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"}
                          alt={course.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-slate-900 mb-1">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            by {course.instructor}
                          </p>
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-teal-600 h-2 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">
                              {course.progress}%
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{course.duration}</span>
                            <span>{course.level}</span>
                            {course.price > 0 && (
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                Paid Course
                              </span>
                            )}
                          </div>
                        </div>
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Continue
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Quick Actions
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card hover className="p-6">
                  <Trophy className="h-8 w-8 text-teal-600 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Join Challenge
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Participate in innovation challenges and win prizes.
                  </p>
                  <Link to="/platform">
                    <Button variant="outline" size="sm">
                      Explore Challenges
                    </Button>
                  </Link>
                </Card>

                <Card hover className="p-6">
                  <BookOpen className="h-8 w-8 text-teal-600 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Browse Courses
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Discover new courses and expand your knowledge.
                  </p>
                  <Link to="/courses">
                    <Button variant="outline" size="sm">
                      View Courses
                    </Button>
                  </Link>
                </Card>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 bg-teal-100 rounded-lg">
                        <activity.icon className="h-4 w-4 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Achievements
                </h3>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-2 rounded-lg ${
                        achievement.earned ? "bg-green-50" : "bg-gray-50"
                      }`}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          achievement.earned
                            ? "text-yellow-500 fill-current"
                            : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          achievement.earned
                            ? "text-green-800 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {achievement.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Course Progress Summary */}
            {enrolledCourses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Learning Progress
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Overall Progress</span>
                      <span className="font-medium">
                        {Math.round(
                          enrolledCourses.reduce((total, course) => total + course.progress, 0) / 
                          enrolledCourses.length
                        )}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-teal-600 h-2 rounded-full"
                        style={{
                          width: `${Math.round(
                            enrolledCourses.reduce((total, course) => total + course.progress, 0) / 
                            enrolledCourses.length
                          )}%`
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Completed:</span>
                        <span className="ml-1 font-medium">
                          {enrolledCourses.filter(c => c.progress >= 100).length}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">In Progress:</span>
                        <span className="ml-1 font-medium">
                          {enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;