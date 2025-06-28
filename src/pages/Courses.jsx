import React, { useState } from "react";
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
} from "lucide-react";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const Courses = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All",
    "AI & Machine Learning",
    "Web Development",
    "Data Science",
    "Mobile Development",
    "Cybersecurity",
    "Cloud Computing",
    "Blockchain",
  ];

  const courses = [
    {
      id: 1,
      title: "Complete AI & Machine Learning Bootcamp",
      instructor: "Dr. Sarah Chen",
      category: "AI & Machine Learning",
      price: 199,
      originalPrice: 299,
      rating: 4.8,
      students: 12500,
      duration: "40 hours",
      level: "Beginner to Advanced",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Master AI and ML from scratch with hands-on projects and real-world applications.",
      features: ["40+ hours of content", "10 real projects", "Certificate of completion", "Lifetime access"],
    },
    {
      id: 2,
      title: "Full Stack Web Development Masterclass",
      instructor: "Prof. Michael Rodriguez",
      category: "Web Development",
      price: 149,
      originalPrice: 249,
      rating: 4.9,
      students: 18200,
      duration: "60 hours",
      level: "Beginner",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Build modern web applications with React, Node.js, and MongoDB.",
      features: ["60+ hours of content", "15 projects", "Job placement assistance", "1-on-1 mentoring"],
    },
    {
      id: 3,
      title: "Data Science & Analytics Professional",
      instructor: "Dr. Emily Watson",
      category: "Data Science",
      price: 179,
      originalPrice: 279,
      rating: 4.7,
      students: 9800,
      duration: "45 hours",
      level: "Intermediate",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Learn data analysis, visualization, and machine learning with Python and R.",
      features: ["45+ hours of content", "Real datasets", "Industry projects", "Career guidance"],
    },
    {
      id: 4,
      title: "Mobile App Development with React Native",
      instructor: "James Thompson",
      category: "Mobile Development",
      price: 129,
      originalPrice: 199,
      rating: 4.6,
      students: 7500,
      duration: "35 hours",
      level: "Intermediate",
      image: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Build cross-platform mobile apps for iOS and Android using React Native.",
      features: ["35+ hours of content", "5 complete apps", "App store deployment", "Code reviews"],
    },
    {
      id: 5,
      title: "Cybersecurity Fundamentals & Ethical Hacking",
      instructor: "Dr. Alex Kumar",
      category: "Cybersecurity",
      price: 159,
      originalPrice: 229,
      rating: 4.8,
      students: 6200,
      duration: "50 hours",
      level: "Beginner to Intermediate",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Learn cybersecurity principles, ethical hacking, and penetration testing.",
      features: ["50+ hours of content", "Hands-on labs", "Security certifications prep", "Industry tools"],
    },
    {
      id: 6,
      title: "Cloud Computing with AWS & Azure",
      instructor: "Maria Garcia",
      category: "Cloud Computing",
      price: 189,
      originalPrice: 289,
      rating: 4.7,
      students: 8900,
      duration: "55 hours",
      level: "Intermediate to Advanced",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Master cloud platforms with AWS and Azure for scalable applications.",
      features: ["55+ hours of content", "Cloud projects", "AWS/Azure credits", "Certification prep"],
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnroll = (course) => {
    if (!user) {
      toast.error("Please login to enroll in courses");
      return;
    }
    toast.success(`Successfully enrolled in ${course.title}!`);
  };

  const handleAddToCart = (course) => {
    if (!user) {
      toast.error("Please login to add courses to cart");
      return;
    }
    toast.success(`${course.title} added to cart!`);
  };

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
                No courses found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card hover className="overflow-hidden h-full flex flex-col">
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-teal-600 text-white px-2 py-1 rounded text-sm font-medium">
                          {course.level}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                          {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-teal-600 font-medium">
                          {course.category}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3">
                        by {course.instructor}
                      </p>
                      
                      <p className="text-gray-600 text-sm mb-4 flex-1">
                        {course.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-slate-900">
                              ${course.price}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ${course.originalPrice}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEnroll(course)}
                            className="flex-1"
                            size="sm"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Enroll Now
                          </Button>
                          <Button
                            onClick={() => handleAddToCart(course)}
                            variant="outline"
                            size="sm"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
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
    </div>
  );
};

export default Courses;