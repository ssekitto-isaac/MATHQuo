"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, X, Star, Trophy, Target, BookOpen, Lightbulb } from "lucide-react"

interface WordProblemQuizProps {
  progress: any
  updateProgress: (progress: any) => void
  rewards: any
  updateRewards: (rewards: any) => void
}

export default function WordProblemQuiz({ progress, updateProgress, rewards, updateRewards }: WordProblemQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [sessionScore, setSessionScore] = useState(0)
  const [sessionQuestions, setSessionQuestions] = useState(0)
  const [showReward, setShowReward] = useState<any>(null)

  const questions = [
    {
      id: 1,
      title: "🚀 The Great Space Pizza Delivery Mission! 🍕",
      puzzleType: "space-detective",
      scenario: "Captain Sarah's spaceship just delivered pizzas to the International Space Station! 🛰️",
      clues: [
        "🍕 3 cosmic pizzas were launched from Earth",
        "✂️ Each pizza was cut into 8 perfect space slices",
        "👨‍🚀 18 hungry astronauts are floating in the station",
        "🍽️ Every astronaut ate exactly 1 delicious slice",
        "❓ Some pizza slices have mysteriously floated away in zero gravity!",
      ],
      mystery: "Help Captain Sarah calculate: How many pizza slices are floating in space? 🌌",
      hint: "🤔 Count all the space pizza slices first, then subtract what the astronauts ate!",
      steps: [
        "🔍 Total space pizza slices = 3 pizzas × 8 slices each = 24 cosmic slices!",
        "👨‍🚀 Slices eaten by astronauts = 18 people × 1 slice each = 18 slices",
        "🚀 Floating slices = 24 total slices - 18 eaten slices = 6 slices in orbit!",
      ],
      correct: 6,
      visual: "space-pizza",
      difficulty: "easy",
      xpReward: 20,
      puzzleReward: "🚀 Space Detective Badge",
    },
    {
      id: 2,
      title: "🧬 The DNA Laboratory Experiment! 🔬",
      puzzleType: "bio-lab",
      scenario: "Dr. Tom is conducting a breakthrough genetics experiment in his space laboratory! 🧪",
      clues: [
        "🧬 The lab has 7 special DNA sample containers",
        "🔬 Each container holds exactly 12 genetic samples",
        "💀 A cosmic radiation burst damaged 15 samples",
        "🌟 Only undamaged samples can complete the experiment!",
      ],
      mystery: "How many genetic samples are still viable for the breakthrough discovery? ⚗️",
      hint: "✨ Calculate all the DNA samples first, then subtract the ones damaged by radiation!",
      steps: [
        "🧬 Total genetic samples = 7 containers × 12 samples each = 84 samples!",
        "🔬 Viable samples = 84 total - 15 damaged = 69 working samples!",
      ],
      correct: 69,
      visual: "dna-lab",
      difficulty: "medium",
      xpReward: 25,
      puzzleReward: "🧬 Genetic Scientist Badge",
    },
    {
      id: 3,
      title: "🛸 Emma's Asteroid Mining Adventure! 💎",
      puzzleType: "space-mining",
      scenario: "Space miner Emma is collecting precious crystals from asteroid fields! ⛏️",
      clues: [
        "💎 Every week, Emma mines exactly 5 rare space crystals",
        "📅 She explores the asteroid belt for 8 exciting weeks",
        "🔬 A quantum analyzer costs 25 crystals to purchase",
        "🗝️ The analyzer can detect the ultimate treasure asteroid!",
      ],
      mystery: "After buying the quantum analyzer, how many crystals does Emma have left? 🌌",
      hint: "🤑 Count up all her mined crystals first, then subtract the analyzer cost!",
      steps: [
        "💎 Total crystals mined = 5 crystals × 8 weeks = 40 space crystals!",
        "🔬 Crystals remaining = 40 crystals - 25 crystals = 15 crystals left!",
      ],
      correct: 15,
      visual: "asteroid-mining",
      difficulty: "easy",
      xpReward: 20,
      puzzleReward: "💎 Space Miner Badge",
    },
    {
      id: 4,
      title: "🚀 The Mars Colony Transport Mission! 🪐",
      puzzleType: "space-logistics",
      scenario: "Mission Commander Johnson must transport students to the new Mars colony! 🏫",
      clues: [
        "🏫 4 different space academies are sending students to Mars",
        "👨‍🚀 Each academy has exactly 25 brave space cadets",
        "🚀 Each interplanetary shuttle can safely carry 30 passengers",
        "⚠️ Every single cadet must make it to Mars safely!",
      ],
      mystery: "What's the minimum number of shuttles needed for this epic Mars mission? 🛸",
      hint: "🧮 Count all the space cadets, divide by shuttle capacity, and remember - no cadet left behind!",
      steps: [
        "👨‍🚀 Total space cadets = 4 academies × 25 cadets each = 100 cadets!",
        "🚀 Shuttles needed = 100 cadets ÷ 30 per shuttle = 3.33... shuttles",
        "⚠️ Since we can't use part of a shuttle, we need 4 complete shuttles!",
      ],
      correct: 4,
      visual: "mars-mission",
      difficulty: "hard",
      xpReward: 30,
      puzzleReward: "🪐 Mars Mission Commander Badge",
    },
    {
      id: 5,
      title: "🧪 The Molecular Gastronomy Space Kitchen! 🍪",
      puzzleType: "space-cooking",
      scenario: "Chef Chen is creating molecular cookies in the zero-gravity kitchen! 👨‍🍳",
      clues: [
        "🍪 The molecular printer created 144 perfect nano-cookies",
        "📦 The recipe requires distribution into 12 containment pods",
        "⚖️ Each pod must contain exactly the same number of cookies",
        "🔮 Perfect distribution activates the flavor enhancement protocol!",
      ],
      mystery: "How many nano-cookies go in each containment pod? ✨",
      hint: "🎂 This is a molecular division - distribute all cookies equally among the pods!",
      steps: [
        "🔮 Cookies per pod = Total cookies ÷ Number of pods",
        "🍪 Cookies per pod = 144 cookies ÷ 12 pods = 12 nano-cookies each!",
      ],
      correct: 12,
      visual: "space-kitchen",
      difficulty: "medium",
      xpReward: 25,
      puzzleReward: "🧪 Molecular Chef Badge",
    },
    {
      id: 6,
      title: "⏰ The Quantum Time Portal Experiment! 🌀",
      puzzleType: "time-science",
      scenario: "Quantum physicist Alex just activated the most advanced time portal ever built! 👨‍🔬",
      clues: [
        "⏰ The portal jumps 15 years into the future with each activation",
        "🔄 Alex activates it exactly 4 times in sequence - whoosh!",
        "📅 Alex started this incredible experiment in the year 2024",
        "🔐 The final year unlocks the temporal research database!",
      ],
      mystery: "What year does Alex arrive in after all the quantum jumps? 🌟",
      hint: "🕐 Add up all the temporal jumps to find the final destination year!",
      steps: [
        "⏰ Total years traveled = 15 years × 4 jumps = 60 years into the future!",
        "📅 Final year = Starting year + Time traveled = 2024 + 60 = 2084!",
      ],
      correct: 2084,
      visual: "quantum-portal",
      difficulty: "hard",
      xpReward: 30,
      puzzleReward: "⏰ Quantum Physicist Badge",
    },
  ]

  const renderPuzzleVisual = (type: string, question: any) => {
    switch (type) {
      case "space-pizza":
        return (
          <div className="bg-gradient-to-br from-indigo-800 to-purple-800 p-6 rounded-3xl relative border-4 border-cyan-400 shadow-xl">
            {/* Space background elements */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
              <div className="absolute top-2 left-4 text-2xl animate-pulse">⭐</div>
              <div className="absolute top-4 right-6 text-xl animate-bounce">🛰️</div>
              <div className="absolute bottom-4 left-6 text-xl animate-spin">🌌</div>
              <div className="absolute bottom-2 right-4 text-2xl animate-pulse">✨</div>
            </div>

            <div className="text-center mb-4 relative z-10">
              <h4 className="text-cyan-300 font-bold text-xl animate-pulse">🚀 SPACE STATION PIZZA DELIVERY! 🍕</h4>
            </div>
            <div className="grid grid-cols-3 gap-4 relative z-10">
              {[1, 2, 3].map((pizza) => (
                <div
                  key={pizza}
                  className="text-center border-4 border-cyan-400 p-3 rounded-2xl bg-white/20 backdrop-blur-sm"
                >
                  <div className="w-20 h-20 mx-auto mb-2 rounded-full border-4 border-orange-400 bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center relative shadow-lg">
                    <div className="absolute inset-2 border-2 border-orange-300 rounded-full"></div>
                    <div className="absolute w-full h-0.5 bg-orange-400 top-1/2"></div>
                    <div className="absolute h-full w-0.5 bg-orange-400 left-1/2"></div>
                    <div className="absolute w-full h-0.5 bg-orange-400 top-1/2 transform rotate-45"></div>
                    <div className="absolute w-full h-0.5 bg-orange-400 top-1/2 transform -rotate-45"></div>
                  </div>
                  <div className="text-cyan-300 text-sm font-bold">SPACE PIZZA #{pizza}</div>
                  <div className="text-white text-sm font-bold">8 cosmic slices!</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center space-y-2 relative z-10">
              <div className="text-pink-300 font-bold text-lg">👨‍🚀 18 HUNGRY ASTRONAUTS! 🚀</div>
              <div className="text-green-300 font-bold text-lg">🍽️ EACH ATE 1 SPACE SLICE! 🌌</div>
            </div>
          </div>
        )

      case "dna-lab":
        return (
          <div className="bg-gradient-to-br from-green-800 to-blue-800 p-6 rounded-3xl relative border-4 border-green-400 shadow-xl">
            {/* Lab background elements */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
              <div className="absolute top-2 left-4 text-2xl animate-spin">🔬</div>
              <div className="absolute top-4 right-6 text-xl animate-pulse">⚗️</div>
              <div className="absolute bottom-4 left-6 text-xl animate-bounce">🧪</div>
              <div className="absolute bottom-2 right-4 text-2xl animate-pulse">🧬</div>
            </div>

            <div className="text-center mb-4 relative z-10">
              <h4 className="text-green-300 font-bold text-xl animate-pulse">🧬 GENETIC RESEARCH LABORATORY! 🔬</h4>
            </div>
            <div className="grid grid-cols-7 gap-1 p-4 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-green-300 relative z-10">
              {Array.from({ length: 84 }, (_, i) => (
                <div
                  key={i}
                  className={`w-5 h-5 rounded-full border-2 ${
                    i < 69
                      ? "bg-gradient-to-br from-green-300 to-blue-300 border-green-500 animate-pulse shadow-lg"
                      : "bg-red-400 border-red-600"
                  }`}
                  title={i < 69 ? "Viable DNA Sample! 🧬" : "Radiation damaged 💥"}
                />
              ))}
            </div>
            <div className="mt-4 text-center space-y-2 relative z-10">
              <div className="text-green-200 font-bold">🧬 Viable samples for breakthrough research! ✨</div>
              <div className="text-red-300 font-bold">💥 Samples damaged by cosmic radiation 😢</div>
            </div>
          </div>
        )

      case "asteroid-mining":
        return (
          <div className="bg-gradient-to-br from-gray-800 to-purple-800 p-6 rounded-3xl relative border-4 border-purple-400 shadow-xl">
            {/* Space mining background */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
              <div className="absolute top-2 left-4 text-2xl animate-bounce">⛏️</div>
              <div className="absolute top-4 right-6 text-xl animate-spin">🛸</div>
              <div className="absolute bottom-4 left-6 text-xl animate-pulse">☄️</div>
              <div className="absolute bottom-2 right-4 text-2xl animate-bounce">💎</div>
            </div>

            <div className="text-center mb-4 relative z-10">
              <h4 className="text-purple-300 font-bold text-xl animate-bounce">🛸 ASTEROID MINING OPERATION! 💎</h4>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4 relative z-10">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="text-center p-3 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-purple-300"
                >
                  <div className="text-purple-200 text-2xl animate-spin">💎</div>
                  <div className="text-purple-100 text-sm font-bold">Week {i + 1}</div>
                  <div className="text-purple-200 text-sm font-bold">5 crystals!</div>
                </div>
              ))}
            </div>
            <div className="text-center border-t-4 border-purple-300 pt-4 space-y-2 relative z-10">
              <div className="text-purple-100 font-bold text-lg">🔬 Quantum Analyzer: 25 crystals</div>
              <div className="text-purple-200 font-bold">🗝️ Detects ultimate treasure asteroids!</div>
            </div>
          </div>
        )

      case "mars-mission":
        return (
          <div className="bg-gradient-to-br from-red-800 to-orange-800 p-6 rounded-3xl relative border-4 border-red-400 shadow-xl">
            {/* Mars mission background */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
              <div className="absolute top-2 left-4 text-2xl animate-bounce">🚀</div>
              <div className="absolute top-4 right-6 text-xl animate-pulse">🪐</div>
              <div className="absolute bottom-4 left-6 text-xl animate-spin">🛸</div>
              <div className="absolute bottom-2 right-4 text-2xl animate-bounce">👨‍🚀</div>
            </div>

            <div className="text-center mb-4 relative z-10">
              <h4 className="text-red-300 font-bold text-xl animate-bounce">🪐 MARS COLONY TRANSPORT MISSION! 🚀</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-red-300"
                >
                  <div className="text-red-200 text-2xl">🏫</div>
                  <div>
                    <div className="text-red-100 text-lg font-bold">Space Academy {String.fromCharCode(65 + i)}</div>
                    <div className="text-red-200 text-sm font-bold">25 space cadets!</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center border-t-4 border-red-300 pt-4 space-y-2 relative z-10">
              <div className="text-yellow-200 font-bold text-lg">🚀 Each shuttle capacity: 30 cadets</div>
              <div className="text-pink-200 font-bold">⚠️ Every cadet must reach Mars safely!</div>
            </div>
          </div>
        )

      case "space-kitchen":
        return (
          <div className="bg-gradient-to-br from-purple-800 to-pink-800 p-6 rounded-3xl relative border-4 border-pink-400 shadow-xl">
            {/* Space kitchen background */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
              <div className="absolute top-2 left-4 text-2xl animate-pulse">🧪</div>
              <div className="absolute top-4 right-6 text-xl animate-bounce">⚗️</div>
              <div className="absolute bottom-4 left-6 text-xl animate-spin">🔬</div>
              <div className="absolute bottom-2 right-4 text-2xl animate-pulse">🍪</div>
            </div>

            <div className="text-center mb-4 relative z-10">
              <h4 className="text-pink-300 font-bold text-xl animate-pulse">🧪 MOLECULAR GASTRONOMY LAB! 🍪</h4>
            </div>
            <div className="text-center mb-4 relative z-10">
              <div className="text-8xl mb-2 animate-bounce">🍪</div>
              <div className="text-pink-200 text-xl font-bold">144 Nano-Cookies!</div>
            </div>
            <div className="grid grid-cols-4 gap-2 relative z-10">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="text-center p-2 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-pink-300"
                >
                  <div className="text-pink-200 text-2xl">📦</div>
                  <div className="text-pink-100 text-xs font-bold">Pod {i + 1}</div>
                  <div className="text-purple-200 text-xs font-bold">? cookies</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4 space-y-2 relative z-10">
              <div className="text-pink-200 font-bold">⚖️ Equal distribution activates flavor protocol!</div>
              <div className="text-purple-200 font-bold">🔮 Unlock molecular cooking mastery!</div>
            </div>
          </div>
        )

      case "quantum-portal":
        return (
          <div className="bg-gradient-to-br from-indigo-900 to-cyan-800 p-6 rounded-3xl relative border-4 border-cyan-400 shadow-xl">
            {/* Quantum lab background */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
              <div className="absolute top-2 left-4 text-2xl animate-spin">⚛️</div>
              <div className="absolute top-4 right-6 text-xl animate-pulse">🔬</div>
              <div className="absolute bottom-4 left-6 text-xl animate-bounce">⚗️</div>
              <div className="absolute bottom-2 right-4 text-2xl animate-spin">🌀</div>
            </div>

            <div className="text-center mb-4 relative z-10">
              <h4 className="text-cyan-300 font-bold text-xl animate-pulse">⏰ QUANTUM TIME PORTAL LAB! 🌀</h4>
            </div>
            <div className="space-y-3 relative z-10">
              <div className="text-center p-3 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-cyan-400">
                <div className="text-cyan-200 text-xl font-bold">📅 START: 2024</div>
              </div>
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="text-cyan-300 text-2xl animate-spin">⏰</div>
                  <div className="flex-1 p-2 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-cyan-400">
                    <div className="text-cyan-200 font-bold">Quantum Jump #{i + 1}: +15 years! 🌀</div>
                  </div>
                  <div className="text-yellow-300 text-2xl animate-bounce">→</div>
                </div>
              ))}
              <div className="text-center p-3 bg-white/20 backdrop-blur-sm rounded-2xl border-4 border-yellow-400">
                <div className="text-yellow-300 text-xl font-bold animate-pulse">📅 DESTINATION: ? 🌟</div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="w-32 h-32 bg-gradient-to-br from-purple-200 to-cyan-200 rounded-3xl flex items-center justify-center border-4 border-purple-400">
            <span className="text-purple-600 font-bold">Space Puzzle!</span>
          </div>
        )
    }
  }

  const handleAnswer = () => {
    const answer = Number.parseInt(userAnswer)
    setShowResult(true)
    setSessionQuestions(sessionQuestions + 1)

    const isCorrect = answer === questions[currentQuestion].correct
    const question = questions[currentQuestion]

    if (isCorrect) {
      setSessionScore(sessionScore + 1)

      const newProgress = {
        ...progress,
        xp: progress.xp + question.xpReward,
        questionsAnswered: progress.questionsAnswered + 1,
        correctAnswers: progress.correctAnswers + 1,
      }

      if (newProgress.xp >= newProgress.level * 500) {
        newProgress.level += 1
        setShowReward({ type: "levelUp", level: newProgress.level })
      }

      updateProgress(newProgress)

      const newRewards = {
        ...rewards,
        coins: rewards.coins + Math.floor(question.xpReward / 2),
        gems: rewards.gems + (question.difficulty === "hard" ? 3 : question.difficulty === "medium" ? 2 : 1),
      }
      updateRewards(newRewards)

      // Check for word problem badge
      if (newProgress.correctAnswers >= 30 && !rewards.badges.find((b: any) => b.id === 4)?.earned) {
        const updatedBadges = rewards.badges.map((badge: any) => (badge.id === 4 ? { ...badge, earned: true } : badge))
        updateRewards({ ...newRewards, badges: updatedBadges })
        setShowReward({ type: "badge", badge: updatedBadges.find((b: any) => b.id === 4) })
      }
    } else {
      updateProgress({
        ...progress,
        questionsAnswered: progress.questionsAnswered + 1,
      })
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setUserAnswer("")
      setShowResult(false)
      setShowHint(false)
      setShowReward(null)
    } else {
      setShowReward({
        type: "completion",
        score: sessionScore,
        total: sessionQuestions,
        accuracy: Math.round((sessionScore / sessionQuestions) * 100),
      })
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setUserAnswer("")
    setShowResult(false)
    setShowHint(false)
    setSessionScore(0)
    setSessionQuestions(0)
    setShowReward(null)
  }

  const question = questions[currentQuestion]
  const isCorrect = Number.parseInt(userAnswer) === question.correct

  return (
    <div className="space-y-6">
      {/* Space Background for Quiz */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 text-4xl animate-bounce">🚀</div>
        <div className="absolute top-20 right-20 text-3xl animate-pulse">🛸</div>
        <div className="absolute bottom-20 left-20 text-4xl animate-spin">🔬</div>
        <div className="absolute bottom-10 right-10 text-3xl animate-bounce">⭐</div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-pulse">🧬</div>
        <div className="absolute top-1/3 right-1/3 text-3xl animate-bounce">🔭</div>
      </div>

      {/* Progress Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
        <Card className="bg-gradient-to-br from-cyan-200 to-blue-200 border-4 border-cyan-400 shadow-xl rounded-2xl">
          <CardContent className="p-4 text-center">
            <Target className="w-10 h-10 mx-auto mb-2 text-cyan-600" />
            <div className="text-3xl font-bold text-cyan-700">
              {currentQuestion + 1}/{questions.length}
            </div>
            <div className="text-lg text-cyan-600 font-bold">Space Mission!</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-200 to-orange-200 border-4 border-yellow-400 shadow-xl rounded-2xl">
          <CardContent className="p-4 text-center">
            <Trophy className="w-10 h-10 mx-auto mb-2 text-yellow-600" />
            <div className="text-3xl font-bold text-yellow-700">
              {sessionScore}/{sessionQuestions}
            </div>
            <div className="text-lg text-yellow-600 font-bold">Space Hero!</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-200 to-pink-200 border-4 border-purple-400 shadow-xl rounded-2xl">
          <CardContent className="p-4 text-center">
            <Star className="w-10 h-10 mx-auto mb-2 text-purple-600" />
            <div className="text-3xl font-bold text-purple-700">{progress.xp}</div>
            <div className="text-lg text-purple-600 font-bold">Cosmic XP!</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-200 to-cyan-200 border-4 border-green-400 shadow-xl rounded-2xl">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-10 h-10 mx-auto mb-2 text-green-600" />
            <div className="text-3xl font-bold text-green-700">Level {progress.level}</div>
            <div className="text-lg text-green-600 font-bold">Space Explorer!</div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="bg-gradient-to-r from-cyan-200 to-purple-200 border-4 border-cyan-400 shadow-xl rounded-2xl relative z-10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-cyan-700">Level {progress.level} Space Progress 🚀</span>
            <span className="text-lg text-cyan-600 font-bold">
              {progress.xp}/{progress.level * 500} XP
            </span>
          </div>
          <div className="relative">
            <Progress value={(progress.xp / (progress.level * 500)) * 100} className="h-6 bg-cyan-100" />
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"
              style={{ width: `${(progress.xp / (progress.level * 500)) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Reward Popup */}
      {showReward && (
        <Card className="border-4 border-yellow-400 bg-gradient-to-br from-yellow-100 to-orange-100 shadow-2xl rounded-3xl animate-bounce relative z-10">
          <CardContent className="p-8 text-center">
            {showReward.type === "levelUp" && (
              <>
                <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500 animate-spin" />
                <h3 className="text-4xl font-bold text-yellow-700 mb-2">🚀 SPACE LEVEL UP! 🚀</h3>
                <p className="text-2xl text-yellow-600 font-bold">You reached Space Level {showReward.level}!</p>
                <Badge className="mt-4 bg-yellow-400 text-yellow-900 text-xl px-6 py-2 rounded-full border-4 border-yellow-600">
                  +50 Space Coins! 💰
                </Badge>
              </>
            )}
            {showReward.type === "badge" && (
              <>
                <div className="text-8xl mb-4 animate-bounce">{showReward.badge.icon}</div>
                <h3 className="text-4xl font-bold text-yellow-700 mb-2">🏆 SPACE BADGE EARNED! 🏆</h3>
                <p className="text-2xl text-yellow-600 font-bold">{showReward.badge.name}</p>
                <p className="text-lg text-yellow-500 mt-2 font-semibold">{showReward.badge.description}</p>
              </>
            )}
            {showReward.type === "completion" && (
              <>
                <Star className="w-20 h-20 mx-auto mb-4 text-purple-500 animate-spin" />
                <h3 className="text-4xl font-bold text-purple-700 mb-2">🛸 SPACE MISSION COMPLETE! 🛸</h3>
                <p className="text-2xl text-purple-600 font-bold">
                  Score: {showReward.score}/{showReward.total} ({showReward.accuracy}%)
                </p>
                <div className="flex gap-4 justify-center mt-6">
                  <Button
                    onClick={resetQuiz}
                    className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-lg border-2 border-white"
                  >
                    🔄 New Space Mission!
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="bg-white text-purple-600 font-bold px-8 py-4 text-lg rounded-2xl border-4 border-purple-400 hover:bg-purple-100"
                  >
                    🚀 Back to Space Station
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Main Question */}
      <Card className="border-4 border-purple-400 bg-gradient-to-br from-purple-100 to-cyan-100 shadow-2xl rounded-3xl overflow-hidden relative z-10">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white relative overflow-hidden">
          {/* Space background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 left-4 text-3xl animate-bounce">🚀</div>
            <div className="absolute top-2 right-4 text-2xl animate-spin">🛸</div>
            <div className="absolute bottom-2 left-8 text-2xl animate-pulse">🔬</div>
            <div className="absolute bottom-2 right-8 text-3xl animate-bounce">⭐</div>
          </div>
          <div className="flex items-center justify-between relative z-10">
            <CardTitle className="text-2xl flex items-center gap-2 font-bold">🧩 {question.title}</CardTitle>
            <div className="flex gap-2">
              <Badge className="bg-white/20 text-white text-lg px-4 py-2 rounded-full border-2 border-white/30 font-bold">
                {question.puzzleType}
              </Badge>
              <Badge
                className={`bg-white text-lg px-4 py-2 rounded-full border-2 font-bold ${
                  question.difficulty === "easy"
                    ? "text-green-600 border-green-400"
                    : question.difficulty === "medium"
                      ? "text-yellow-600 border-yellow-400"
                      : "text-red-600 border-red-400"
                }`}
              >
                {question.difficulty}
              </Badge>
              <Badge className="bg-white text-purple-600 text-lg px-4 py-2 rounded-full border-2 border-purple-400 font-bold">
                +{question.xpReward} XP
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          {/* Puzzle Scenario */}
          <div className="p-6 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl border-4 border-cyan-400 shadow-lg">
            <h4 className="font-bold text-cyan-800 mb-3 text-xl">🚀 The Space Mission Story!</h4>
            <p className="text-xl leading-relaxed text-cyan-700 font-semibold">{question.scenario}</p>
          </div>

          {/* Evidence/Clues */}
          <div className="p-6 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl border-4 border-yellow-400 shadow-lg">
            <h4 className="font-bold text-yellow-800 mb-4 text-xl">🔍 Space Mission Data!</h4>
            <div className="space-y-3">
              {question.clues.map((clue, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-yellow-300 shadow-md"
                >
                  <Badge className="bg-yellow-400 text-yellow-900 text-lg px-3 py-1 rounded-full border-2 border-yellow-600 font-bold">
                    {index + 1}
                  </Badge>
                  <span className="text-yellow-800 font-semibold text-lg">{clue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Puzzle Visual */}
          <div className="text-center">{renderPuzzleVisual(question.visual, question)}</div>

          {/* The Mystery Question */}
          <div className="p-6 bg-gradient-to-br from-red-100 to-pink-100 rounded-3xl border-4 border-red-400 shadow-lg">
            <h4 className="font-bold text-red-800 mb-3 text-xl">❓ The Space Mystery!</h4>
            <p className="text-xl font-bold text-red-700">{question.mystery}</p>
          </div>

          {/* Hint */}
          {showHint && !showResult && (
            <div className="p-6 bg-gradient-to-br from-green-100 to-cyan-100 rounded-3xl border-4 border-green-400 shadow-lg animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="w-8 h-8 text-green-600" />
                <span className="font-bold text-green-800 text-xl">💡 Space Computer Hint!</span>
              </div>
              <p className="text-green-700 font-semibold text-lg">{question.hint}</p>
            </div>
          )}

          {/* Answer Input */}
          <div className="flex items-center gap-6 justify-center p-6 bg-gradient-to-br from-gray-100 to-cyan-100 rounded-3xl border-4 border-gray-400 shadow-lg">
            <span className="text-2xl font-bold text-purple-700">🔓 Mission Solution:</span>
            <Input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-40 text-center text-2xl border-4 border-purple-400 rounded-2xl bg-white shadow-lg font-bold"
              placeholder="?"
              disabled={showResult}
            />
            <Button
              onClick={handleAnswer}
              disabled={!userAnswer || showResult}
              className="px-10 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold text-xl rounded-2xl shadow-lg border-2 border-white transform hover:scale-105 transition-all"
            >
              🚀 Launch Solution!
            </Button>
          </div>

          {/* Action Buttons */}
          {!showResult && (
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => setShowHint(!showHint)}
                className="border-4 border-purple-400 text-purple-600 bg-white hover:bg-purple-100 font-bold px-8 py-4 text-lg rounded-2xl shadow-lg"
              >
                <Lightbulb className="w-6 h-6 mr-2" />
                {showHint ? "Hide" : "Show"} Space Computer Hint! 💡
              </Button>
            </div>
          )}

          {/* Result and Steps */}
          {showResult && (
            <div
              className={`p-8 rounded-3xl border-4 shadow-2xl ${
                isCorrect
                  ? "border-green-400 bg-gradient-to-br from-green-100 to-cyan-100"
                  : "border-red-400 bg-gradient-to-br from-red-100 to-pink-100"
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                {isCorrect ? (
                  <CheckCircle className="w-10 h-10 text-green-600" />
                ) : (
                  <X className="w-10 h-10 text-red-600" />
                )}
                <span className={`font-bold text-2xl ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                  {isCorrect
                    ? "🎉 SPACE MISSION SUCCESS! 🎉"
                    : `🛸 Mission incomplete! The answer is ${question.correct}`}
                </span>
                {isCorrect && (
                  <div className="ml-auto flex gap-2">
                    <Badge className="bg-green-400 text-green-900 text-lg px-4 py-2 rounded-full border-2 border-green-600 font-bold">
                      +{question.xpReward} XP
                    </Badge>
                    <Badge className="bg-purple-500 text-white text-lg px-4 py-2 rounded-full border-2 border-purple-700 font-bold">
                      {question.puzzleReward}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-2xl">🚀 Mission Analysis Report!</h4>
                {question.steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-300 shadow-md"
                  >
                    <Badge className="bg-cyan-400 text-cyan-900 text-lg px-3 py-1 rounded-full border-2 border-cyan-600 font-bold mt-1">
                      {index + 1}
                    </Badge>
                    <span className={`flex-1 text-lg font-semibold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button
                  onClick={nextQuestion}
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold px-10 py-4 text-xl rounded-2xl shadow-lg border-2 border-white transform hover:scale-105 transition-all"
                >
                  {currentQuestion < questions.length - 1 ? "🚀 Next Space Mission!" : "🏆 Complete All Missions!"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
