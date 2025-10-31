"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

// Particle System Component
function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const particlesCount = 1000;

  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#7c3aed" transparent opacity={0.6} />
    </points>
  );
}

// Enhanced 3D Scene
function Scene3D() {
  return (
    <>
      <Environment preset="city" />
      <Stars
        radius={300}
        depth={60}
        count={1000}
        factor={7}
        saturation={0}
        fade
      />
      <ParticleField />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#7c3aed" intensity={0.5} />
    </>
  );
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;

      setMousePosition({ x: clientX, y: clientY });
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-purple-50/30 text-zinc-900 overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="pointer-events-none fixed inset-0 -z-20">
        <motion.div
          className="absolute -top-1/3 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-400/30 via-pink-300/20 to-cyan-300/20 blur-[150px]"
          style={{ x: springX, y: springY }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-[60vh] w-[60vh] rounded-full bg-gradient-to-l from-violet-400/25 to-purple-300/15 blur-[120px]"
          style={{
            x: useTransform(springX, (x) => -x * 0.5),
            y: useTransform(springY, (y) => -y * 0.3),
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
      </div>

      {/* Floating Cursor Effect */}
      <motion.div
        className="pointer-events-none fixed z-50 h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-sm"
        animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Hero Section */}
      <main role="main">
        <section
          className="relative isolate min-h-screen flex items-center justify-center overflow-hidden"
          aria-label="Hero section"
        >
          <div className="absolute inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 12], fov: 50 }} dpr={[1, 2]}>
              <Scene3D />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.3}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
              />
            </Canvas>
          </div>

          <div className="mx-auto max-w-7xl px-6 text-center relative z-10">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200/50 px-4 py-2 text-sm font-medium text-purple-700 shadow-lg mb-8"
            >
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
              Jordan's Premier Fashion Marketplace
            </motion.div>

            {/* Main Heading with Advanced Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                type: "spring",
                stiffness: 100,
              }}
              className="relative"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-x">
                  Fashion
                </span>
                <span className="block text-zinc-900 mt-2">Reimagined</span>
              </h1>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Enhanced Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 max-w-3xl mx-auto text-xl md:text-2xl text-zinc-600 leading-relaxed font-light"
            >
              Experience Jordan's fashion ecosystem like never before.
              <span className="text-purple-600 font-medium">
                {" "}
                Discover, compare, and shop
              </span>{" "}
              from hundreds of local boutiques and international brands.
            </motion.p>

            {/* Advanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="#download"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 px-8 py-4 font-semibold text-white shadow-2xl transition-all duration-300 hover:shadow-purple-500/25 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Download Sooquk
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>

              <motion.a
                href="#stores"
                className="group rounded-2xl border-2 border-purple-200 bg-white/80 backdrop-blur-sm px-8 py-4 font-semibold text-purple-700 transition-all duration-300 hover:bg-purple-50 hover:border-purple-300 hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Explore Stores
                </span>
              </motion.a>
            </motion.div>

            {/* Enhanced Feature Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-16 flex flex-wrap justify-center gap-4"
            >
              {[
                {
                  icon: "✨",
                  text: "AI-Powered Discovery",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: "🚀",
                  text: "Same-Day Delivery",
                  color: "from-cyan-500 to-blue-500",
                },
                {
                  icon: "🛡️",
                  text: "Secure Payments",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: "🎯",
                  text: "Personalized Feed",
                  color: "from-orange-500 to-red-500",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + idx * 0.1 }}
                  className="group relative"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-sm`}
                  />
                  <div className="relative rounded-2xl bg-white/90 backdrop-blur-sm border border-white/50 px-6 py-3 shadow-lg">
                    <span className="flex items-center gap-2 text-sm font-medium text-zinc-700">
                      <span className="text-lg">{feature.icon}</span>
                      {feature.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Section with Glass Morphism */}
        <section
          id="about"
          className="relative py-32 overflow-hidden"
          aria-label="About Sooquk"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-pink-50/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />

          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-2 text-sm font-medium text-purple-700 mb-6"
              >
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                Revolutionary Shopping Experience
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-zinc-900 via-purple-800 to-zinc-900 bg-clip-text text-transparent"
                itemProp="headline"
              >
                Fashion Ecosystem
                <br />
                <span className="text-purple-600">Redefined</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-6 max-w-3xl mx-auto text-xl text-zinc-600 leading-relaxed"
              >
                Sooquk transforms how Jordan shops for fashion. Our AI-powered
                platform connects you with hundreds of curated stores, from
                local boutiques to international brands.
              </motion.p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: "🎨",
                  title: "Curated Collections",
                  description:
                    "Hand-picked items from Jordan's finest fashion retailers, updated daily with the latest trends.",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: "⚡",
                  title: "Lightning Fast",
                  description:
                    "Advanced search algorithms and instant checkout. Find what you love in seconds, not hours.",
                  gradient: "from-cyan-500 to-blue-500",
                },
                {
                  icon: "🛡️",
                  title: "Secure & Trusted",
                  description:
                    "Bank-level security with buyer protection. Shop with confidence knowing you're protected.",
                  gradient: "from-emerald-500 to-green-500",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 rounded-3xl backdrop-blur-sm border border-white/50 shadow-xl" />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <div className="relative p-8 h-full">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white text-2xl mb-6 shadow-lg`}
                    >
                      {feature.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-zinc-900 mb-4 group-hover:text-purple-700 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-zinc-600 leading-relaxed">
                      {feature.description}
                    </p>

                    <motion.div
                      className={`mt-6 h-1 bg-gradient-to-r ${feature.gradient} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: idx * 0.2 + 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works - Interactive Timeline */}
        <section
          id="how"
          className="relative py-32 bg-gradient-to-b from-white to-purple-50/30"
          aria-label="How it works"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6"
              >
                Simple. Fast.{" "}
                <span className="text-purple-600">Effortless.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-zinc-600 max-w-2xl mx-auto"
              >
                Experience fashion shopping reimagined with our three-step
                process
              </motion.p>
            </div>

            <div className="relative">
              {/* Animated Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent hidden lg:block" />

              <div className="grid gap-12 md:grid-cols-3 relative">
                {[
                  {
                    step: "01",
                    title: "Discover",
                    subtitle: "Browse & Explore",
                    description:
                      "AI-powered recommendations show you exactly what you're looking for from hundreds of curated stores.",
                    icon: "🔍",
                    color: "purple",
                  },
                  {
                    step: "02",
                    title: "Compare",
                    subtitle: "Smart Selection",
                    description:
                      "Compare prices, styles, and reviews across multiple stores. Find the perfect match for your style and budget.",
                    icon: "⚖️",
                    color: "pink",
                  },
                  {
                    step: "03",
                    title: "Enjoy",
                    subtitle: "Fast Delivery",
                    description:
                      "Secure checkout and same-day delivery. Your fashion finds arrive at your doorstep within hours.",
                    icon: "🚀",
                    color: "cyan",
                  },
                ].map((step, idx) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: idx * 0.2,
                      type: "spring",
                      stiffness: 100,
                    }}
                    viewport={{ once: true }}
                    className="group relative text-center"
                  >
                    {/* Step Number */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${
                        step.color === "purple"
                          ? "from-purple-500 to-purple-600"
                          : step.color === "pink"
                          ? "from-pink-500 to-purple-500"
                          : "from-cyan-500 to-blue-500"
                      } text-white font-bold text-xl mb-6 shadow-2xl relative z-10`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {step.step}
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${
                          step.color === "purple"
                            ? "from-purple-400 to-purple-500"
                            : step.color === "pink"
                            ? "from-pink-400 to-purple-400"
                            : "from-cyan-400 to-blue-400"
                        } opacity-0 group-hover:opacity-50 blur-xl`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>

                    {/* Icon */}
                    <div className="text-4xl mb-4">{step.icon}</div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-zinc-900 mb-2">
                      {step.title}
                    </h3>
                    <p
                      className={`text-lg font-medium mb-4 ${
                        step.color === "purple"
                          ? "text-purple-600"
                          : step.color === "pink"
                          ? "text-pink-600"
                          : "text-cyan-600"
                      }`}
                    >
                      {step.subtitle}
                    </p>
                    <p className="text-zinc-600 leading-relaxed max-w-sm mx-auto">
                      {step.description}
                    </p>

                    {/* Animated Progress Bar */}
                    <motion.div
                      className={`mt-6 h-1 bg-gradient-to-r ${
                        step.color === "purple"
                          ? "from-purple-500 to-purple-600"
                          : step.color === "pink"
                          ? "from-pink-500 to-purple-500"
                          : "from-cyan-500 to-blue-500"
                      } rounded-full mx-auto`}
                      initial={{ width: 0 }}
                      whileInView={{ width: "60%" }}
                      transition={{ duration: 1, delay: idx * 0.2 + 0.5 }}
                      viewport={{ once: true }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Stores - Premium Gallery */}
        <section
          id="stores"
          className="relative py-32 bg-gradient-to-b from-purple-50/30 to-white overflow-hidden"
          aria-label="Featured stores"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(120,119,198,0.1),transparent_50%)]" />

          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <div className="text-center mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6"
              >
                Premium <span className="text-purple-600">Partners</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-zinc-600 max-w-3xl mx-auto"
              >
                Discover Jordan's most beloved fashion destinations, from
                international brands to local treasures
              </motion.p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Zara Jordan",
                  desc: "International fashion forward",
                  category: "Global Brand",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  name: "Mango",
                  desc: "Mediterranean elegance",
                  category: "Premium",
                  gradient: "from-pink-500 to-rose-500",
                },
                {
                  name: "Raneem Boutique",
                  desc: "Curated local fashion",
                  category: "Local Favorite",
                  gradient: "from-cyan-500 to-blue-500",
                },
                {
                  name: "Khan Al-Khalili",
                  desc: "Traditional with modern twist",
                  category: "Heritage",
                  gradient: "from-emerald-500 to-green-500",
                },
                {
                  name: "Wardrobe Avenue",
                  desc: "Daily essentials & basics",
                  category: "Everyday",
                  gradient: "from-orange-500 to-red-500",
                },
                {
                  name: "Amman Style",
                  desc: "Trendy contemporary looks",
                  category: "Trending",
                  gradient: "from-violet-500 to-purple-500",
                },
              ].map((store, idx) => (
                <motion.div
                  key={store.name}
                  initial={{ opacity: 0, y: 40, rotateY: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/60 rounded-3xl backdrop-blur-sm border border-white/50 shadow-2xl" />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${store.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <div className="relative p-8">
                    {/* Store Image Placeholder */}
                    <div
                      className={`h-48 rounded-2xl bg-gradient-to-br ${store.gradient} mb-6 relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${store.gradient} text-white text-xs font-medium mb-4`}
                    >
                      {store.category}
                    </div>

                    {/* Store Info */}
                    <h3 className="text-2xl font-bold text-zinc-900 mb-2 group-hover:text-purple-700 transition-colors">
                      {store.name}
                    </h3>
                    <p className="text-zinc-600 leading-relaxed mb-6">
                      {store.desc}
                    </p>

                    {/* Visit Button */}
                    <motion.button
                      className={`w-full py-3 rounded-xl bg-gradient-to-r ${store.gradient} text-white font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Visit Store
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Download App - Premium CTA */}
        <section
          id="download"
          className="relative py-32 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white overflow-hidden"
          aria-label="Download the app"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:60px_60px] animate-pulse" />

          <div className="mx-auto max-w-6xl px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-5xl md:text-7xl font-black mb-6">
                Ready to
                <br />
                <span className="bg-gradient-to-r from-white via-pink-200 to-cyan-200 bg-clip-text text-transparent">
                  Transform
                </span>
                <br />
                Your Style?
              </h2>
              <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                Join thousands of fashion enthusiasts already using Sooquk to
                discover their perfect style
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            >
              <motion.a
                href="#"
                className="group relative overflow-hidden rounded-2xl bg-white text-purple-900 px-10 py-5 font-bold text-lg shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Download for iOS
                </span>
              </motion.a>

              <motion.a
                href="#"
                className="group relative overflow-hidden rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-10 py-5 font-bold text-lg transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  Get on Android
                </span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-purple-200 text-sm"
            >
              Available Q2 2024 • Pre-register for early access
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Sooquk</h3>
              <p className="text-zinc-400 leading-relaxed max-w-md">
                Jordan's premier fashion marketplace. Connecting you with the
                best local and international brands.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-zinc-400">
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  About
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Careers
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Press
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2 text-zinc-400">
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-zinc-400">
              © {new Date().getFullYear()} Sooquk. All rights reserved.
            </div>
            <div className="flex gap-6 text-zinc-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <motion.a
        href="#"
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center shadow-2xl z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.a>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://sooquk.com/#organization",
                name: "Sooquk",
                url: "https://sooquk.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://sooquk.com/logo.png",
                  width: 512,
                  height: 512,
                },
                description:
                  "Jordan's premier fashion marketplace app connecting local clothing stores with consumers",
                sameAs: [
                  "https://twitter.com/Sooquk",
                  "https://instagram.com/Sooquk",
                  "https://linkedin.com/company/Sooquk",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "Customer Service",
                  availableLanguage: ["English", "Arabic"],
                  areaServed: "JO",
                },
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "JO",
                  addressLocality: "Amman",
                },
              },
              {
                "@type": "WebSite",
                "@id": "https://sooquk.com/#website",
                url: "https://sooquk.com",
                name: "Sooquk - Jordan's Fashion Marketplace",
                description:
                  "Discover, compare, and shop from hundreds of Jordanian clothing stores in one app",
                publisher: {
                  "@id": "https://sooquk.com/#organization",
                },
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate:
                      "https://sooquk.com/search?q={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
                inLanguage: ["en", "ar"],
              },
              {
                "@type": "SoftwareApplication",
                name: "Sooquk",
                applicationCategory: "ShoppingApplication",
                operatingSystem: ["iOS", "Android"],
                description:
                  "Jordan's premier fashion marketplace app. Browse hundreds of local clothing stores, boutiques, and brands in one convenient platform.",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "JOD",
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.8",
                  ratingCount: "1250",
                  bestRating: "5",
                  worstRating: "1",
                },
                screenshot: "https://sooquk.com/screenshots/app-screenshot.jpg",
                featureList: [
                  "Browse hundreds of clothing stores",
                  "Compare prices and styles",
                  "Same-day delivery",
                  "Secure payments",
                  "AI-powered recommendations",
                ],
              },
              {
                "@type": "Service",
                serviceType: "Fashion Marketplace",
                provider: {
                  "@id": "https://sooquk.com/#organization",
                },
                areaServed: {
                  "@type": "Country",
                  name: "Jordan",
                },
                description:
                  "All-in-one platform for discovering and shopping from Jordanian clothing stores, boutiques, and fashion brands",
                offers: {
                  "@type": "Offer",
                  description:
                    "Free app download with access to hundreds of clothing stores",
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://sooquk.com",
                  },
                ],
              },
            ],
          }),
        }}
      />
    </div>
  );
}
