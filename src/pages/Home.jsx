import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, Users, Target, Award } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import PartnerModal from "../components/PartnerModal";

const Home = () => {
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  const stats = [
    { label: "Active Challenges", value: "12+", icon: Target },
    { label: "Solutions Created", value: "150+", icon: Lightbulb },
    { label: "Student Innovators", value: "500+", icon: Users },
    { label: "Awards Won", value: "25+", icon: Award },
  ];

  const features = [
    {
      title: "Monthly Innovation Challenges",
      description:
        "Tackle real-world problems with monthly themed challenges. Win recognition and create meaningful impact.",
      link: "/platform",
    },
    {
      title: "Solutions Library",
      description:
        "Browse and discover innovative micro-tools solving real problems across various domains.",
      link: "/platform",
    },
    {
      title: "Capstone Accelerator",
      description:
        "Give your final year project a second life with mentorship, branding, and deployment support.",
      link: "/platform",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Empowering Innovation.
              <br />
              <span className="text-teal-400">Solving Real Problems.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              One Challenge at a Time. Join the community of student innovators
              creating meaningful solutions for tomorrow's world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild>
                <Link
                  to="/platform"
                  className="inline-flex items-center space-x-2"
                >
                  <span>View Challenges</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/platform">Submit a Solution</Link>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setIsPartnerModalOpen(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white border-teal-600"
              >
                Join as Partner
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-teal-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Syneroa Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your innovation engine. Discover opportunities, showcase
              solutions, and connect with a community of problem-solvers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card hover className="p-8 h-full">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <Link
                    to={feature.link}
                    className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 transition-colors"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Join thousands of student innovators who are already solving
              real-world problems and building the future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                asChild
                className="w-56 px-6 py-3 text-base font-semibold bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all shadow-md"
              >
                <Link
                  to="/platform"
                  className="inline-flex items-center justify-center gap-2"
                >
                  Explore Platform <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                className="w-56 px-6 py-3 text-base font-semibold border border-white text-white rounded-lg hover:bg-white hover:text-teal-700 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Link to="/launchpad">Apply to LaunchPad</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />
    </div>
  );
};

export default Home;
