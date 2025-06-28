import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Users } from "lucide-react";
import Card from "../components/UI/Card";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Innovation-Driven",
      description:
        "We believe in the power of creative problem-solving and cutting-edge solutions.",
    },
    {
      icon: Users,
      title: "Community-Focused",
      description:
        "Building a collaborative ecosystem where students and mentors thrive together.",
    },
    {
      icon: Heart,
      title: "Impact-Oriented",
      description:
        "Every solution we create aims to make a meaningful difference in the world.",
    },
    {
      icon: Eye,
      title: "Future-Ready",
      description:
        "Preparing the next generation of innovators for tomorrow's challenges.",
    },
  ];

  const team = [
    {
      name: "Md Nahid Tanjum",
      role: "Founder & CEO",
      bio: "Former tech entrepreneur with 10+ years in innovation management. Passionate about empowering student innovators.",
      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhU9FWGBnHFyeKXomcYcFWwEjnS2STWsxjHtB7P_n_YPRFFC1SGxL2KLRdx2FwVSfymeuTn6ZFCoe8awfJTt-1iC9eg6azq-6lqTglSeLhQZkH9rvi8sLWU236ZwGQ2Md90jH1oJTYMvf0laSnPJ430cF1IpK-7RLPJARIPTKjzZlZVeiXWoy1j2i_qDd0/s320/Untitled%20design.png",
    },
    {
      name: "Dr. Iqbal Hossain",
      role: "Co-Founder",
      bio: "Full-stack developer and former university researcher. Expert in building scalable platforms for education.",
      image:
        "https://media.licdn.com/dms/image/v2/C4D03AQGYbw1ksvVfVw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1517573877791?e=1755734400&v=beta&t=H4MofbF1dLJ8oRj1nvMAA8uFkz2mNmwQ97T37djVBgc",
    },
    {
      name: "Md Riadul Hasan",
      role: "Co-Founder & CTO",
      bio: "Community builder with experience in student engagement and mentorship programs.",
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQEeZB0xWeacwg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1713368852063?e=1755734400&v=beta&t=inB4G9N9nJFjB4kVwbG1i4pxVF9gIENf6Axb24A7nIw",
    },
  ];

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
              About Syneroa
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're on a mission to bridge the gap between academic learning and
              real-world problem-solving, empowering students to create
              meaningful impact through innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                To create a collaborative platform where students can tackle
                real-world challenges, develop innovative solutions, and gain
                practical experience that bridges the gap between academic
                learning and professional impact.
              </p>
              <p className="text-lg text-gray-600">
                We believe that every student has the potential to be an
                innovator, and our platform provides the tools, community, and
                opportunities to turn ideas into reality.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                To become the world's leading platform for student-driven
                innovation, where the brightest minds collaborate to solve
                humanity's most pressing challenges.
              </p>
              <p className="text-lg text-gray-600">
                We envision a future where every graduate enters the workforce
                not just with theoretical knowledge, but with proven experience
                in creating solutions that matter.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Syneroa.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-lg mb-4">
                    <value.icon className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind Syneroa's mission to empower
              student innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="p-6 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-teal-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600">{member.bio}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Syneroa Matters */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Syneroa Matters
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-teal-100 mb-8">
                In today's rapidly evolving world, traditional education often
                falls short of preparing students for real-world challenges.
                Syneroa bridges this gap by providing a platform where
                theoretical knowledge meets practical application.
              </p>
              <p className="text-xl text-teal-100">
                We're not just building a platform – we're cultivating the next
                generation of innovators, problem-solvers, and change-makers who
                will shape our future.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
