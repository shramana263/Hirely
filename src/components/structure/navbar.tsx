"use client"

import { Briefcase } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

export default function Navbar() {
  const { scrollY } = useScroll()
  const [isTop, setIsTop] = useState(true)
  const bgOpacity = useMotionValue(0)
  const borderOpacity = useMotionValue(0)

  useEffect(() => {
    return scrollY.on("change", (y) => {
      setIsTop(y < 10)
      bgOpacity.set(Math.min(y / 120, 1))
      borderOpacity.set(Math.min(y / 120, 1))
    })
  }, [scrollY, bgOpacity, borderOpacity])

  const background = useTransform(bgOpacity, [0, 1], ["rgba(255,255,255,0)", "rgba(255,255,255,0.95)"])
  const border = useTransform(borderOpacity, [0, 1], ["rgba(229,231,235,0)", "rgba(229,231,235,1)"])

  // Dynamic text color classes
  const textMain = isTop ? "text-white" : "text-gray-900"
  const textSub = isTop ? "text-gray-200" : "text-gray-600"
  const textLink = isTop ? "text-gray-100 hover:text-blue-200" : "text-gray-600 hover:text-blue-600"
  const textBrand = isTop ? "text-white" : "text-gray-900"

  return (
    <motion.header
      style={{ background, borderBottom: border }}
      className="fixed top-0 w-full z-50 transition-colors"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <span className={`text-xl font-bold ${textBrand}`}>JobConnect</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#" className={`${textLink} transition-colors`}>
            Find Jobs
          </Link>
          <Link href="#" className={`${textLink} transition-colors`}>
            Companies
          </Link>
          <Link href="#" className={`${textLink} transition-colors`}>
            About
          </Link>
          <Link href="#" className={`${textLink} transition-colors`}>
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/jobprovider" className={`${textLink} transition-colors`}>
            Sign In
          </Link>
          <Button className={isTop ? "bg-white/10 text-white hover:bg-white/20" : ""}>Sign In</Button>
          <Button className={isTop ? "bg-white/20 text-white hover:bg-white/30" : ""}>Get Started</Button>
        </div>
      </div>
    </motion.header>
  )
}
