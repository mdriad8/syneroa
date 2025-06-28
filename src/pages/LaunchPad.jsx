import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Rocket, Users, Award, BookOpen, ArrowRight } from "lucide-react";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import { getPrograms } from "../services/database";
import toast from "react-hot-toast";

const LaunchPad = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    setLoading(true);
    try {
      const response = await getPrograms();
      setPrograms(response.documents || []);
    } catch (error) {
      console.error("Failed to load programs:", error);
      toast.error("Failed to load programs");
    } finally {
      setLoading(false);
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case "fellowship":
        return Rocket;
      case "internship":
        return BookOpen;
      case "partnership":
        return Users;
      default:
        return Award;
    }
  };

  const applicationProcess = [
    {
      step: 1,
      title: "Submit Application",
      description:
        "Complete our online application form with your project ideas and background.",
    },
    {
      step: 2,
      title: "Initial Review",
      description:
        "Our team reviews your application and portfolio within 1-2 weeks.",
    },
    {
      step: 3,
      title: "Interview Round",
      description:
        "Selected candidates participate in a virtual interview with our team.",
    },
    {
      step: 4,
      title: "Final Decision",
      description:
        "Successful applicants receive acceptance and onboarding information.",
    },
  ];

  const testimonials = [
    {
      name: "Emily Zhang",
      role: "Syneroa Fellow 2024",
      university: "UC Berkeley",
      quote:
        "The fellowship gave me the resources and mentorship to turn my climate tech idea into a working prototype. The experience was invaluable.",
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Marcus Johnson",
      role: "Innovation Intern",
      university: "Georgia Tech",
      quote:
        "Working with Syneroa taught me more about real-world problem solving than any classroom ever could. Highly recommend!",
      image:
        "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

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
              LaunchPad: Build With Syneroa
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Take your innovation journey to the next level. Join our
              fellowship, internship programs, or partner with us to create
              meaningful impact.
            </p>
            <Button size="lg" variant="secondary">
              Apply Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the path that best fits your goals and availability.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading programs...</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {programs.map((program, index) => {
                const IconComponent = getIconForType(program.type);
                return (
                  <motion.div
                    key={program.$id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <Card hover className="p-8 h-full">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-lg mb-6">
                        <IconComponent className="h-6 w-6 text-teal-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-4">
                        {program.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {program.description}
                      </p>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            Duration:
                          </span>
                          <span className="text-sm text-gray-600">
                            {program.duration}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            Commitment:
                          </span>
                          <span className="text-sm text-gray-600">
                            {program.commitment}
                          </span>
                        </div>
                      </div>
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Benefits:
                        </h4>
                        <ul className="space-y-1">
                          {program.benefits?.map((benefit, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-600 flex items-center"
                            >
                              <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mr-2" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button className="w-full">Apply Now</Button>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Application Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined application process is designed to identify
              passionate innovators ready to make an impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applicationProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-600 text-white rounded-full font-bold text-lg mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our alumni who have gone on to create amazing things.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-teal-600 font-medium">
                        {testimonial.role}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {testimonial.university}
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic">
                    "{testimonial.quote}"
                  </blockquote>
                </Card>
              </motion.div>
            ))}
          </div>
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
              Ready to Launch Your Future?
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of students who have accelerated their innovation
              journey through our LaunchPad programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Apply for Fellowship <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="bg-transparent border border-white text-white hover:bg-teal-700 hover:border-white"
              >
                Explore Internships
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LaunchPad;
