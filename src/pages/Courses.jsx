import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Filter,
  Search,
  Play,
  ShoppingCart,
  DollarSign,
  Award,
  CheckCircle,
} from "lucide-react";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import PaymentModal from "../components/PaymentModal";
import { useAuth } from "../contexts/AuthContext";
import { getCourses, checkEnrollment } from "../services/database";
import toast from "react-hot-toast";

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [enrollments, setEnrollments] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const categories = [
    "All",
    "AI & Machine Learning",
    "Web Development", 
    "Data Science",
    "Mobile Development",
    "Cybersecurity",
    "Cloud Computing",
    "Blockchain",
    "General",
  ];

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (user && courses.length > 0) {
      checkUserEnrollments();
    }
  }, [user, courses]);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const response = await getCourses(true); // Only get published courses for public view
      setCourses(response.documents || []);
    } catch (error) {
      console.error("Failed to load courses:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const checkUserEnrollments = async () => {
    if (!user) return;
    
    const enrollmentChecks = {};
    for (const course of courses) {
      try {
        const enrollment = await checkEnrollment(user.$id, course.$id);
        enrollmentChecks[course.$id] = enrollment;
      } catch (error) {
        console.error(`Failed to check enrollment for course ${course.$id}:`, error);
      }
    }
    setEnrollments(enrollmentChecks);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnrollClick = (course) => {
    if (!user) {
      toast.error("Please login to enroll in courses");
      return;
    }

    // Check if already enrolled
    if (enrollments[course.$id]) {
      toast.info("You are already enrolled in this course");
      return;
    }

    setSelectedCourse(course);
    setShowPaymentModal(true);
  };

  const handleEnrollmentSuccess = () => {
    // Reload courses and enrollments
    loadCourses();
    if (user) {
      checkUserEnrollments();
    }
  };

  const isEnrolled = (courseId) => {
    return enrollments[courseId] !== undefined && enrollments[courseId] !== null;
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Learn. Build. Innovate.
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Master in-demand skills with our comprehensive courses designed by industry experts.
              Start your journey to becoming a tech innovator today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-teal-600 text-white"
                    : "text-gray-700 hover:bg-teal-100 hover:text-teal-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              {filteredCourses.length} Courses Available
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {courses.length === 0 ? "No courses available yet" : "No courses found"}
              </h3>
              <p className="text-gray-500">
                {courses.length === 0 
                  ? "Check back soon for new courses!" 
                  : "Try adjusting your search or filter criteria."}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.$id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card hover className="overflow-hidden h-full flex flex-col">
                    <div className="relative">
                      <img
                        src={course.image || "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-teal-600 text-white px-2 py-1 rounded text-sm font-medium">
                          {course.level || "All Levels"}
                        </span>
                      </div>
                      {course.price > 0 && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                            ${course.price}
                          </span>
                        </div>
                      )}
                      {course.price === 0 && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                            FREE
                          </span>
                        </div>
                      )}
                      {isEnrolled(course.$id) && (
                        <div className="absolute bottom-4 right-4">
                          <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Enrolled
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-teal-600 font-medium">
                          {course.category || "General"}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3">
                        by {course.instructor || "Instructor"}
                      </p>
                      
                      <p className="text-gray-600 text-sm mb-4 flex-1">
                        {course.description || "Course description not available"}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{course.rating || "New"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.students || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration || "Self-paced"}</span>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {course.price > 0 ? (
                              <span className="text-2xl font-bold text-slate-900">
                                ${course.price}
                              </span>
                            ) : (
                              <span className="text-2xl font-bold text-green-600">
                                FREE
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {isEnrolled(course.$id) ? (
                            <Button
                              className="flex-1"
                              size="sm"
                              variant="outline"
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Continue Learning
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleEnrollClick(course)}
                              className="flex-1"
                              size="sm"
                            >
                              <Play className="h-4 w-4 mr-2" />
                              {course.price > 0 ? "Purchase Course" : "Start Learning"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">
                {courses.length}+
              </div>
              <div className="text-gray-600">Expert Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">
                {courses.reduce((total, course) => total + (course.students || 0), 0)}+
              </div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">
                {courses.filter(course => course.price === 0).length}+
              </div>
              <div className="text-gray-600">Free Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">
                {new Set(courses.map(course => course.category)).size}+
              </div>
              <div className="text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already building their future with our courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Browse All Courses
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-teal-600"
              >
                Become an Instructor
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        course={selectedCourse}
        onSuccess={handleEnrollmentSuccess}
      />
    </div>
  );
};

export default Courses;