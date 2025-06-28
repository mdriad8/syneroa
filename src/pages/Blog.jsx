import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import { getBlogPosts } from "../services/database";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await getBlogPosts();
        setPosts(response.documents || []);
      } catch (error) {
        console.error("Failed to load blog posts:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const featuredPost = posts.length > 0 ? posts[0] : null;

  // Fixed filtering logic
  const filteredPosts =
    selectedCategory === "All Posts"
      ? posts.slice(1)
      : posts.filter((post) => post.category === selectedCategory);

  // For non-"All Posts" categories, don't slice the first post since it might be in the selected category
  const otherPosts =
    selectedCategory === "All Posts" ? filteredPosts : filteredPosts;

  const categories = [
    "All Posts",
    "Innovation",
    "AI & Climate",
    "EdTech",
    "HealthTech",
    "Success Stories",
    "Problem Analysis",
  ];

  // Helper function to safely handle tags
  const renderTags = (tags) => {
    if (!tags || typeof tags !== "string") return null;
    return tags.split(",").map((tag) => (
      <span
        key={tag.trim()}
        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
      >
        #{tag.trim()}
      </span>
    ));
  };

  const renderTagsSmall = (tags) => {
    if (!tags || typeof tags !== "string") return null;
    return tags.split(",").map((tag) => (
      <span
        key={tag.trim()}
        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
      >
        #{tag.trim()}
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
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
              Impact Stories & Insights
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the latest in student innovation, problem-solving
              insights, and success stories from our community of changemakers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post - Only show when "All Posts" is selected */}
      {featuredPost && selectedCategory === "All Posts" && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card hover className="overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-sm font-medium">
                        {featuredPost.category}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 mb-6 text-lg">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(
                            featuredPost.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {renderTags(featuredPost.tags)}
                    </div>
                    <Link to={`/blog/${featuredPost.$id}`}>
                      <Button>
                        Read Full Article{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
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

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {otherPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No posts found in the "{selectedCategory}" category.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post, index) => (
                <motion.div
                  key={post.$id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card hover className="overflow-hidden h-full flex flex-col">
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 text-gray-800 px-2 py-1 rounded text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {renderTagsSmall(post.tags)}
                      </div>
                      <Link to={`/blog/${post.$id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="self-start"
                        >
                          Read More <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Get the latest insights, success stories, and innovation trends
              delivered to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
