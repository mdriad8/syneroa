import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import { getBlogPost, getComments, createComment } from "../services/database";
import toast from "react-hot-toast";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await getBlogPost(id);
        setPost(response);
        const commentsResponse = await getComments(id);
        setComments(commentsResponse.documents || []);
      } catch (error) {
        console.error("Failed to load blog post or comments:", error);
        toast.error("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadPost();
  }, [id]);

  const onSubmitComment = async (data) => {
    setSubmitting(true);
    try {
      const commentData = {
        postId: id,
        author: data.author,
        email: data.email,
        comment: data.content, // Changed from 'content' to 'comment' to match database schema
        createdAt: new Date().toISOString(),
      };

      await createComment(commentData);

      // Reload comments after successful submission
      const commentsResponse = await getComments(id);
      setComments(commentsResponse.documents || []);

      // Reset form
      reset();
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast.error("Failed to add comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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

  if (!post) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Post not found
          </h1>
          <Link to="/blog" className="text-teal-600 hover:text-teal-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/blog"
          className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {renderTags(post.tags)}
              </div>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </Card>
        </motion.article>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Comments ({comments.length})
            </h2>

            <form
              onSubmit={handleSubmit(onSubmitComment)}
              className="mb-8 p-6 bg-gray-50 rounded-lg"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Leave a Comment
              </h3>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    {...register("author", { required: "Name is required" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                  {errors.author && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.author.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment *
                </label>
                <textarea
                  {...register("content", { required: "Comment is required" })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Share your thoughts..."
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.content.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={submitting}>
                {submitting ? "Posting..." : "Post Comment"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="space-y-6">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.$id}
                    className="border-b border-gray-200 pb-6 last:border-b-0"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-600 font-medium">
                          {comment.author?.charAt(0)?.toUpperCase() || "?"}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">
                          {comment.author || "Anonymous"}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {comment.createdAt
                            ? new Date(comment.createdAt).toLocaleDateString()
                            : ""}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 ml-13">
                      {comment.comment || comment.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default BlogPost;
