"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Text3D, Environment } from "@react-three/drei"
import { easeOut } from "framer-motion"
import { Suspense } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { card, cardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Users, Briefcase, TrendingUp, Star, ArrowRight, Building, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/structure/navbar"

function FloatingCube({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </Float>
  )
}


export default function JobPlatformLanding() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }



  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <section className=" relative overflow-hidden" style={{ backgroundImage: 'url("/landing-bg.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className=" inset-0 bg-black/40 pt-24 pb-12 px-10">

          <div className="container px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                <motion.div variants={itemVariants} className="space-y-4">
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Now hiring 50,000+ positions</Badge>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-50 leading-tight">
                    Find Your
                    <span className="text-blue-600 block">Dream Job</span>
                    Today
                  </h1>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Connect with top employers and discover opportunities that match your skills. Join millions of
                    professionals building their careers.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                    <Input placeholder="Job title, keywords, or company" className="pl-10 h-12 text-lg text-gray-300" />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                    <Input placeholder="City or remote" className="pl-10 h-12 text-lg text-gray-300" />
                  </div>
                  <div className="h-12 px-4 bg-blue-600 rounded-lg flex justify-center items-center text-white cursor-pointer hover:bg-blue-700 transition-colors">
                    Search Jobs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center space-x-8 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>2M+ Job Seekers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>50K+ Companies</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4" />
                    <span>100K+ Jobs Posted</span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-96 lg:h-[500px]"
              >

              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-14">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose JobConnect?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make job searching and hiring simple, efficient, and effective for everyone.
            </p>
          </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {[
                {
                  icon: (
                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-4 flex items-center justify-center shadow-lg mb-5">
                      <Search className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={2.2} />
                    </div>
                  ),
                  title: "Smart Job Matching",
                  description:
                    "AI-powered matching connects you with roles that truly fit your skills and ambitions.",
                  cardBg: "bg-gradient-to-br from-blue-50 via-blue-100 to-white"
                },
                {
                  icon: (
                    <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-4 flex items-center justify-center shadow-lg mb-5">
                      <Users className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={2.2} />
                    </div>
                  ),
                  title: "Network Building",
                  description: "Expand your professional network and unlock new career opportunities.",
                  cardBg: "bg-gradient-to-br from-green-50 via-green-100 to-white"
                },
                {
                  icon: (
                    <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-4 flex items-center justify-center shadow-lg mb-5">
                      <TrendingUp className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={2.2} />
                    </div>
                  ),
                  title: "Career Growth",
                  description: "Access curated resources, courses, and mentorship for your next step.",
                  cardBg: "bg-gradient-to-br from-purple-50 via-purple-100 to-white"
                },
                {
                  icon: (
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-4 flex items-center justify-center shadow-lg mb-5">
                      <Star className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={2.2} />
                    </div>
                  ),
                  title: "Company Reviews",
                  description: "Read verified employee reviews to make confident career decisions.",
                  cardBg: "bg-gradient-to-br from-yellow-50 via-yellow-100 to-white"
                },
                {
                  icon: (
                    <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-2xl p-4 flex items-center justify-center shadow-lg mb-5">
                      <Clock className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={2.2} />
                    </div>
                  ),
                  title: "Real-time Updates",
                  description: "Stay ahead with instant alerts for new jobs and application progress.",
                  cardBg: "bg-gradient-to-br from-red-50 via-red-100 to-white"
                },
                {
                  icon: (
                    <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl p-4 flex items-center justify-center shadow-lg mb-5">
                      <Building className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={2.2} />
                    </div>
                  ),
                  title: "Top Companies",
                  description: "Discover exclusive roles from leading companies and innovative startups.",
                  cardBg: "bg-gradient-to-br from-indigo-50 via-indigo-100 to-white"
                },
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div
                  className={`relative h-full rounded-2xl border border-gray-100 shadow-lg group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${feature.cardBg}`}
                >
                  {/* Pastel accent ring on hover */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none z-0 ring-0 group-hover:ring-4 group-hover:ring-blue-100 transition-all duration-300"></div>
                  <div className="relative z-10 h-full flex flex-col items-start p-8">
                    {feature.icon}
                    <h3 className="text-lg font-bold text-gray-900 mb-1 tracking-tight">{feature.title}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-14">
          <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-4 gap-10 text-center"
          >
        {[
          { number: "2M+", label: "Active Users", icon: <Users className="mx-auto mb-3 w-10 h-10 text-blue-200" /> },
          { number: "50K+", label: "Companies", icon: <Building className="mx-auto mb-3 w-10 h-10 text-purple-200" /> },
          { number: "100K+", label: "Job Postings", icon: <Briefcase className="mx-auto mb-3 w-10 h-10 text-pink-200" /> },
          { number: "95%", label: "Success Rate", icon: <TrendingUp className="mx-auto mb-3 w-10 h-10 text-green-200" /> },
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white/10 rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform duration-300"
          >
            {stat.icon}
            <div className="text-5xl font-extrabold mb-2 drop-shadow-lg">{stat.number}</div>
            <div className="text-blue-100 text-lg font-medium tracking-wide">{stat.label}</div>
            {index === 3 && (
          <div className="mt-2 text-xs text-green-200 italic">Based on user feedback</div>
            )}
          </motion.div>
        ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Take the Next Step?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of professionals who have found their dream jobs through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="text-lg flex flex-row nowrap justify-center items-center  px-8 py-3">
                Start Job Search
                <ArrowRight className="  ml-4 w-5 h-5" />
              </Button>
              <Button className="text-lg flex-row px-8 py-3 bg-transparent border border-gray-300 hover:bg-gray-100">
                Post a Job
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-14">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">JobConnect</span>
              </div>
              <p className="text-gray-400">Connecting talent with opportunity. Building careers, one job at a time.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Job Seekers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Career Advice
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Resume Builder
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Salary Guide
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Post Jobs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Find Candidates
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} JobConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
