"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Trophy, Star, Target, Brain, Zap, Gift, Award } from "lucide-react"
import FractionQuiz from "@/components/fraction-quiz"
import AlgebraQuiz from "@/components/algebra-quiz"
import GeometryQuiz from "@/components/geometry-quiz"
import WordProblemQuiz from "@/components/word-problem-quiz"
import RewardsCenter from "@/components/rewards-center"

export default function MathLearningPlatform() {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [userProgress, setUserProgress] = useState({
    fractions: { level: 3, xp: 750, questionsAnswered: 45, correctAnswers: 38 },
    algebra: { level: 2, xp: 450, questionsAnswered: 30, correctAnswers: 22 },
    geometry: { level: 2, xp: 600, questionsAnswered: 35, correctAnswers: 28 },
    wordProblems: { level: 1, xp: 300, questionsAnswered: 20, correctAnswers: 14 },
  })

  const [rewards, setRewards] = useState({
    coins: 1250,
    gems: 45,
    badges: [
      { id: 1, name: "Fraction Hero", icon: "🍕", earned: true, description: "Master 50 fraction problems" },
      { id: 2, name: "Equation Solver", icon: "🧮", earned: true, description: "Solve 25 algebra equations" },
      { id: 3, name: "Shape Master", icon: "📐", earned: false, description: "Complete all geometry challenges" },
      { id: 4, name: "Problem Detective", icon: "🔍", earned: false, description: "Solve 30 word problems" },
      {
        id: 5,
        name: "Speed Enhancer",
        icon: "⚡",
        earned: true,
        description: "Answer 10 questions in under 2 minutes",
      },
      { id: 6, name: "Perfect Score", icon: "💯", earned: false, description: "Get 100% on any quiz" },
    ],
    streaks: { current: 7, longest: 12 },
  })

  const modules = [
    {
      id: "fractions",
      title: "Fraction Space Station",
      description: "Navigate through asteroid fractions in your spaceship! 🚀",
      icon: Target,
      color: "from-pink-400 to-purple-500",
      bgPattern: "🚀🛸🌌⭐",
      stemElements: "🔬⚗️🧬🔭",
      progress: userProgress.fractions,
      component: FractionQuiz,
    },
    {
      id: "algebra",
      title: "Quantum Equation Lab",
      description: "Solve cosmic equations in your research laboratory! 🧪",
      icon: Brain,
      color: "from-green-400 to-blue-500",
      bgPattern: "🧪⚗️🔬🧬",
      stemElements: "🚀🛰️🌌💫",
      progress: userProgress.algebra,
      component: AlgebraQuiz,
    },
    {
      id: "geometry",
      title: "Planetary Geometry Mission",
      description: "Explore geometric shapes across the galaxy! 🪐",
      icon: Zap,
      color: "from-orange-400 to-red-500",
      bgPattern: "🪐🌍🌙☄️",
      stemElements: "🔭📡🛰️🚀",
      progress: userProgress.geometry,
      component: GeometryQuiz,
    },
    {
      id: "wordProblems",
      title: "Space Detective Academy",
      description: "Solve intergalactic mysteries with math! 🛸",
      icon: BookOpen,
      color: "from-purple-400 to-pink-500",
      bgPattern: "🛸👽🌌🔍",
      stemElements: "🧬🔬⚗️🧪",
      progress: userProgress.wordProblems,
      component: WordProblemQuiz,
    },
  ]

  const updateProgress = (moduleId: string, newProgress: any) => {
    setUserProgress((prev) => ({
      ...prev,
      [moduleId]: newProgress,
    }))
  }

  const updateRewards = (newRewards: any) => {
    setRewards((prev) => ({
      ...prev,
      ...newRewards,
    }))
  }

  // Space Background Component
  const SpaceBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Spacecraft */}
      <div className="absolute top-10 left-10 text-8xl animate-bounce" style={{ animationDuration: "3s" }}>
        🚀
      </div>
      <div className="absolute top-20 right-20 text-6xl animate-pulse" style={{ animationDuration: "2s" }}>
        🛸
      </div>
      <div className="absolute bottom-20 left-20 text-7xl animate-spin" style={{ animationDuration: "8s" }}>
        🛰️
      </div>
      <div className="absolute bottom-10 right-10 text-8xl animate-bounce" style={{ animationDuration: "4s" }}>
        🚀
      </div>

      {/* STEM Equipment */}
      <div className="absolute top-1/2 left-1/4 text-5xl animate-pulse" style={{ animationDuration: "3s" }}>
        🔬
      </div>
      <div className="absolute top-1/3 right-1/3 text-6xl animate-bounce" style={{ animationDuration: "5s" }}>
        🔭
      </div>
      <div className="absolute top-3/4 left-1/2 text-5xl animate-spin" style={{ animationDuration: "6s" }}>
        ⚗️
      </div>
      <div className="absolute top-1/4 left-3/4 text-4xl animate-pulse" style={{ animationDuration: "2.5s" }}>
        🧬
      </div>

      {/* Space Elements */}
      <div className="absolute top-16 left-1/2 text-4xl animate-pulse" style={{ animationDuration: "4s" }}>
        ⭐
      </div>
      <div className="absolute bottom-32 right-1/4 text-5xl animate-bounce" style={{ animationDuration: "3.5s" }}>
        🪐
      </div>
      <div className="absolute top-2/3 left-16 text-3xl animate-spin" style={{ animationDuration: "7s" }}>
        🌌
      </div>
      <div className="absolute bottom-1/3 right-16 text-4xl animate-pulse" style={{ animationDuration: "2.8s" }}>
        💫
      </div>

      {/* Additional STEM Tools */}
      <div className="absolute top-40 right-40 text-4xl animate-bounce" style={{ animationDuration: "4.2s" }}>
        🧪
      </div>
      <div className="absolute bottom-40 left-40 text-5xl animate-pulse" style={{ animationDuration: "3.8s" }}>
        📡
      </div>
      <div className="absolute top-1/5 left-1/5 text-3xl animate-spin" style={{ animationDuration: "9s" }}>
        ☄️
      </div>
      <div className="absolute bottom-1/5 right-1/5 text-4xl animate-bounce" style={{ animationDuration: "3.2s" }}>
        🌍
      </div>

      {/* Floating Stars and Sparkles */}
      <div className="absolute top-8 left-1/3 text-2xl animate-pulse" style={{ animationDuration: "1.5s" }}>
        ✨
      </div>
      <div className="absolute bottom-8 right-1/3 text-2xl animate-pulse" style={{ animationDuration: "2.2s" }}>
        ✨
      </div>
      <div className="absolute top-1/2 right-8 text-2xl animate-pulse" style={{ animationDuration: "1.8s" }}>
        ✨
      </div>
      <div className="absolute bottom-1/2 left-8 text-2xl animate-pulse" style={{ animationDuration: "2.5s" }}>
        ✨
      </div>
    </div>
  )

  if (activeModule === "rewards") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 relative overflow-hidden">
        <SpaceBackground />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => setActiveModule(null)}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border-2 border-cyan-400 text-cyan-600 hover:bg-cyan-100 rounded-full px-6 py-3 font-bold shadow-lg"
            >
              🚀 ← Back to Space Station
            </Button>
            <h1 className="text-3xl font-bold text-cyan-200 drop-shadow-lg">🏆 Galactic Rewards Center! 🛸</h1>
          </div>
          <RewardsCenter rewards={rewards} updateRewards={updateRewards} />
        </div>
      </div>
    )
  }

  if (activeModule) {
    const module = modules.find((m) => m.id === activeModule)
    const Component = module?.component

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 relative overflow-hidden">
        {/* Module-specific Space Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 text-8xl animate-bounce">{module?.bgPattern.charAt(0)}</div>
          <div className="absolute top-20 right-20 text-6xl animate-pulse">{module?.bgPattern.charAt(2)}</div>
          <div className="absolute bottom-20 left-20 text-7xl animate-spin">{module?.bgPattern.charAt(4)}</div>
          <div className="absolute bottom-10 right-10 text-8xl animate-bounce">{module?.bgPattern.charAt(6)}</div>

          {/* STEM Elements for each module */}
          <div className="absolute top-1/2 left-1/4 text-5xl animate-pulse">{module?.stemElements.charAt(0)}</div>
          <div className="absolute top-1/3 right-1/3 text-6xl animate-bounce">{module?.stemElements.charAt(2)}</div>
          <div className="absolute top-3/4 left-1/2 text-5xl animate-spin">{module?.stemElements.charAt(4)}</div>
          <div className="absolute top-1/4 left-3/4 text-4xl animate-pulse">{module?.stemElements.charAt(6)}</div>

          {/* Additional space elements */}
          <div className="absolute top-16 left-1/2 text-4xl animate-pulse">⭐</div>
          <div className="absolute bottom-32 right-1/4 text-5xl animate-bounce">🌌</div>
          <div className="absolute top-2/3 left-16 text-3xl animate-spin">💫</div>
          <div className="absolute bottom-1/3 right-16 text-4xl animate-pulse">✨</div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => setActiveModule(null)}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border-2 border-cyan-400 text-cyan-600 hover:bg-cyan-100 rounded-full px-6 py-3 font-bold shadow-lg"
            >
              🚀 ← Back to Space Station
            </Button>
            <h1 className="text-3xl font-bold text-cyan-200 drop-shadow-lg">{module?.title}</h1>
            <div className="flex items-center gap-2 ml-auto">
              <Badge className="bg-yellow-400 text-yellow-900 text-lg px-4 py-2 rounded-full shadow-lg border-2 border-yellow-600">
                <Star className="w-5 h-5 mr-1" />
                {rewards.coins} Space Coins
              </Badge>
              <Badge className="bg-purple-400 text-purple-900 text-lg px-4 py-2 rounded-full shadow-lg border-2 border-purple-600">
                <Gift className="w-5 h-5 mr-1" />
                {rewards.gems} Cosmic Gems
              </Badge>
            </div>
          </div>
          {Component && (
            <Component
              progress={module.progress}
              updateProgress={(newProgress: any) => updateProgress(activeModule, newProgress)}
              rewards={rewards}
              updateRewards={updateRewards}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 relative overflow-hidden">
      <SpaceBackground />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-4 drop-shadow-lg animate-pulse">
            🚀 MATHQuo Space Academy 🛸
          </h1>
          <p className="text-2xl text-cyan-200 mb-6 font-bold drop-shadow-md">
            Where Math Meets Space Exploration! 🌌✨
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge className="bg-cyan-400 text-cyan-900 text-lg px-4 py-2 rounded-full shadow-lg border-2 border-cyan-600 animate-bounce">
              <Star className="w-5 h-5 mr-1" />
              Level {Math.max(...Object.values(userProgress).map((p) => p.level))} Space Explorer
            </Badge>
            <Badge className="bg-yellow-400 text-yellow-900 text-lg px-4 py-2 rounded-full shadow-lg border-2 border-yellow-600 animate-pulse">
              <Trophy className="w-5 h-5 mr-1" />
              {rewards.coins} Space Coins
            </Badge>
            <Badge className="bg-purple-400 text-purple-900 text-lg px-4 py-2 rounded-full shadow-lg border-2 border-purple-600 animate-bounce">
              <Gift className="w-5 h-5 mr-1" />
              {rewards.gems} Cosmic Gems
            </Badge>
            <Button
              onClick={() => setActiveModule("rewards")}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-full shadow-lg border-2 border-white transform hover:scale-105 transition-all"
            >
              <Award className="w-5 h-5 mr-2" />🏆 My Space Rewards!
            </Button>
          </div>
        </div>

        {/* Daily Streak */}
        <Card className="mb-8 bg-gradient-to-r from-cyan-200 to-blue-200 border-4 border-cyan-400 shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white relative overflow-hidden">
            {/* Space background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-2 left-4 text-4xl animate-spin">🛰️</div>
              <div className="absolute top-2 right-4 text-3xl animate-pulse">⭐</div>
              <div className="absolute bottom-2 left-8 text-3xl animate-bounce">🚀</div>
              <div className="absolute bottom-2 right-8 text-4xl animate-pulse">🌌</div>
            </div>
            <CardTitle className="flex items-center gap-2 text-2xl font-bold relative z-10">
              <Zap className="w-8 h-8" />🔥 Daily Space Mission Streak! 🔥
            </CardTitle>
            <CardDescription className="text-cyan-100 text-lg font-semibold relative z-10">
              Complete daily missions to keep your space exploration going! You're an amazing astronaut! 🚀
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-cyan-600 animate-pulse">{rewards.streaks.current}</div>
                <div className="text-lg text-cyan-700 font-bold">Mission Days!</div>
              </div>
              <div className="flex-1">
                <div className="flex gap-2 mb-3">
                  {Array.from({ length: 7 }, (_, i) => (
                    <div
                      key={i}
                      className={`h-12 flex-1 rounded-full border-2 ${
                        i < rewards.streaks.current
                          ? "bg-gradient-to-t from-cyan-400 to-blue-400 border-cyan-600 animate-pulse"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-lg text-cyan-700 font-bold text-center">
                  {7 - rewards.streaks.current} more missions until next space reward! 🛸
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-600">{rewards.streaks.longest}</div>
                <div className="text-lg text-purple-700 font-bold">Best Mission!</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {modules.map((module) => {
            const IconComponent = module.icon
            const progress = module.progress
            const progressPercentage = Math.min((progress.xp / (progress.level * 500)) * 100, 100)

            return (
              <Card
                key={module.id}
                className="hover:shadow-2xl transition-all cursor-pointer group transform hover:scale-105 bg-white/95 backdrop-blur-sm border-4 border-cyan-300 rounded-3xl overflow-hidden shadow-xl"
                onClick={() => setActiveModule(module.id)}
              >
                <CardHeader className={`bg-gradient-to-r ${module.color} text-white relative overflow-hidden`}>
                  {/* Space Background Pattern */}
                  <div className="absolute inset-0 opacity-20 text-4xl">
                    {module.bgPattern.split("").map((emoji, i) => (
                      <span
                        key={i}
                        className="absolute animate-pulse"
                        style={{
                          left: `${(i * 25) % 100}%`,
                          top: `${(i * 30) % 80}%`,
                          animationDelay: `${i * 0.5}s`,
                        }}
                      >
                        {emoji}
                      </span>
                    ))}
                    {module.stemElements.split("").map((emoji, i) => (
                      <span
                        key={`stem-${i}`}
                        className="absolute animate-bounce"
                        style={{
                          left: `${((i + 4) * 20) % 100}%`,
                          top: `${((i + 2) * 25) % 80}%`,
                          animationDelay: `${(i + 2) * 0.3}s`,
                        }}
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 relative z-10">
                    <div className="p-4 rounded-full bg-white/20 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-bold">{module.title}</CardTitle>
                      <CardDescription className="text-white/90 text-lg font-semibold">
                        {module.description}
                      </CardDescription>
                    </div>
                    <Badge className="bg-white/20 text-white text-lg px-3 py-1 rounded-full border-2 border-white/30">
                      Level {progress.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-4 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl border-2 border-cyan-300">
                        <div className="font-bold text-2xl text-cyan-600">{progress.questionsAnswered}</div>
                        <div className="text-cyan-700 font-semibold">Missions Complete!</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-green-100 to-cyan-100 rounded-2xl border-2 border-green-300">
                        <div className="font-bold text-2xl text-green-600">
                          {Math.round((progress.correctAnswers / progress.questionsAnswered) * 100)}%
                        </div>
                        <div className="text-green-700 font-semibold">Space Accuracy!</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-purple-700">Space XP Progress</span>
                        <span className="text-lg text-purple-600 font-bold">
                          {progress.xp}/{progress.level * 500}
                        </span>
                      </div>
                      <div className="relative">
                        <Progress value={progressPercentage} className="h-4 bg-purple-200" />
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>

                    <Button
                      className={`w-full bg-gradient-to-r ${module.color} hover:shadow-lg text-white font-bold py-4 text-lg rounded-2xl border-2 border-white transform hover:scale-105 transition-all`}
                    >
                      🚀 Launch Space Mission!
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Achievements */}
        <Card className="bg-gradient-to-r from-purple-200 to-cyan-200 border-4 border-purple-400 shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white relative overflow-hidden">
            {/* Space achievements background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-2 left-4 text-4xl animate-bounce">🏆</div>
              <div className="absolute top-2 right-4 text-3xl animate-spin">🛸</div>
              <div className="absolute bottom-2 left-8 text-3xl animate-pulse">⭐</div>
              <div className="absolute bottom-2 right-8 text-4xl animate-bounce">🚀</div>
            </div>
            <CardTitle className="flex items-center gap-2 text-2xl font-bold relative z-10">
              <Trophy className="w-8 h-8" />🏆 Your Galactic Achievements! 🌌
            </CardTitle>
            <CardDescription className="text-purple-100 text-lg font-semibold relative z-10">
              Look at all the amazing space badges you've earned on your cosmic journey! 🚀
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {rewards.badges.slice(0, 4).map((badge) => (
                <div
                  key={badge.id}
                  className={`p-6 rounded-3xl border-4 text-center transition-all transform hover:scale-105 ${
                    badge.earned
                      ? "border-yellow-400 bg-gradient-to-br from-yellow-100 to-orange-100 shadow-xl animate-pulse"
                      : "border-gray-300 bg-gray-100 opacity-60"
                  }`}
                >
                  <div className="text-6xl mb-3">{badge.icon}</div>
                  <div className={`text-lg font-bold ${badge.earned ? "text-yellow-700" : "text-gray-500"}`}>
                    {badge.name}
                  </div>
                  {badge.earned && (
                    <Badge className="mt-3 bg-yellow-400 text-yellow-900 font-bold px-3 py-1 rounded-full border-2 border-yellow-600">
                      ⭐ Space Hero! ⭐
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button
                onClick={() => setActiveModule("rewards")}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-lg border-2 border-white transform hover:scale-105 transition-all"
              >
                🛸 Explore All Space Rewards!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
