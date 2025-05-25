"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, X, Star, Trophy, Target, Shapes } from "lucide-react"

interface GeometryQuizProps {
  progress: any
  updateProgress: (progress: any) => void
  rewards: any
  updateRewards: (rewards: any) => void
}

export default function GeometryQuiz({ progress, updateProgress, rewards, updateRewards }: GeometryQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [sessionScore, setSessionScore] = useState(0)
  const [sessionQuestions, setSessionQuestions] = useState(0)
  const [showReward, setShowReward] = useState<any>(null)

  const questions = [
    {
      id: 1,
      question: "What is the area of this rectangle?",
      shape: "rectangle",
      dimensions: { width: 8, height: 5 },
      options: ["40 square units", "26 square units", "13 square units", "45 square units"],
      correct: "40 square units",
      explanation: "Area of rectangle = length × width = 8 × 5 = 40 square units",
      formula: "Area = length × width",
      difficulty: "easy",
      xpReward: 12,
    },
    {
      id: 2,
      question: "What is the perimeter of this square?",
      shape: "square",
      dimensions: { side: 6 },
      options: ["24 units", "36 units", "12 units", "18 units"],
      correct: "24 units",
      explanation: "Perimeter of square = 4 × side length = 4 × 6 = 24 units",
      formula: "Perimeter = 4 × side",
      difficulty: "easy",
      xpReward: 12,
    },
    {
      id: 3,
      question: "What is the area of this triangle?",
      shape: "triangle",
      dimensions: { base: 10, height: 6 },
      options: ["30 square units", "60 square units", "16 square units", "20 square units"],
      correct: "30 square units",
      explanation: "Area of triangle = (base × height) ÷ 2 = (10 × 6) ÷ 2 = 30 square units",
      formula: "Area = (base × height) ÷ 2",
      difficulty: "medium",
      xpReward: 18,
    },
    {
      id: 4,
      question: "What is the area of this circle? (Use π ≈ 3.14)",
      shape: "circle",
      dimensions: { radius: 4 },
      options: ["50.24 square units", "25.12 square units", "12.56 square units", "100.48 square units"],
      correct: "50.24 square units",
      explanation: "Area of circle = π × radius² = 3.14 × 4² = 3.14 × 16 = 50.24 square units",
      formula: "Area = π × radius²",
      difficulty: "hard",
      xpReward: 25,
    },
    {
      id: 5,
      question: "A rectangle has an area of 48 square units and a width of 6 units. What is its length?",
      shape: "rectangle-problem",
      dimensions: { area: 48, width: 6 },
      options: ["8 units", "6 units", "12 units", "4 units"],
      correct: "8 units",
      explanation: "Since Area = length × width, then length = Area ÷ width = 48 ÷ 6 = 8 units",
      formula: "length = Area ÷ width",
      difficulty: "hard",
      xpReward: 25,
    },
  ]

  const renderShape = (question: any) => {
    const { shape, dimensions } = question

    switch (shape) {
      case "rectangle":
        return (
          <div className="relative">
            <svg width="240" height="180" viewBox="0 0 240 180" className="mx-auto drop-shadow-xl">
              {/* Cute house-like rectangle */}
              <rect
                x="60"
                y="50"
                width="120"
                height="80"
                fill="url(#houseGradient)"
                stroke="#FF6B6B"
                strokeWidth="4"
                rx="10"
              />

              {/* Cute windows */}
              <rect x="80" y="70" width="20" height="20" fill="#87CEEB" stroke="#4682B4" strokeWidth="2" rx="3" />
              <rect x="140" y="70" width="20" height="20" fill="#87CEEB" stroke="#4682B4" strokeWidth="2" rx="3" />

              {/* Door */}
              <rect x="110" y="100" width="20" height="30" fill="#8B4513" stroke="#654321" strokeWidth="2" rx="10" />
              <circle cx="125" cy="115" r="2" fill="#FFD700" />

              {/* Cute decorations */}
              <text x="70" y="45" fontSize="16" fill="#FFB6C1">
                🌸
              </text>
              <text x="150" y="45" fontSize="16" fill="#FFB6C1">
                🌸
              </text>

              <defs>
                <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFB6C1" />
                  <stop offset="100%" stopColor="#FF69B4" />
                </linearGradient>
              </defs>

              {/* Measurement labels */}
              <text x="120" y="150" textAnchor="middle" fontSize="16" fill="#FF1493" fontWeight="bold">
                {dimensions.width} happy units! 😊
              </text>
              <text
                x="35"
                y="95"
                textAnchor="middle"
                fontSize="16"
                fill="#FF1493"
                fontWeight="bold"
                transform="rotate(-90, 35, 95)"
              >
                {dimensions.height} tall units! 📏
              </text>
            </svg>
            <div className="text-center mt-3">
              <span className="text-xl font-bold text-pink-600 animate-bounce">🏠 Cute Rectangle House! 🏠</span>
            </div>
          </div>
        )

      case "square":
        return (
          <div className="relative">
            <svg width="200" height="180" viewBox="0 0 200 180" className="mx-auto drop-shadow-xl">
              {/* Cute gift box square */}
              <rect
                x="60"
                y="50"
                width="80"
                height="80"
                fill="url(#giftGradient)"
                stroke="#FF4500"
                strokeWidth="4"
                rx="8"
              />

              {/* Gift ribbon */}
              <rect x="95" y="50" width="10" height="80" fill="#FFD700" />
              <rect x="60" y="85" width="80" height="10" fill="#FFD700" />

              {/* Cute bow */}
              <ellipse cx="100" cy="45" rx="15" ry="8" fill="#FF69B4" />
              <ellipse cx="100" cy="45" rx="8" ry="5" fill="#FFB6C1" />

              {/* Sparkles */}
              <text x="45" y="45" fontSize="14" fill="#FFD700">
                ✨
              </text>
              <text x="150" y="60" fontSize="14" fill="#FFD700">
                ✨
              </text>
              <text x="50" y="140" fontSize="14" fill="#FFD700">
                ✨
              </text>
              <text x="145" y="135" fontSize="14" fill="#FFD700">
                ✨
              </text>

              <defs>
                <linearGradient id="giftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6347" />
                  <stop offset="100%" stopColor="#FF4500" />
                </linearGradient>
              </defs>

              <text x="100" y="155" textAnchor="middle" fontSize="16" fill="#FF4500" fontWeight="bold">
                {dimensions.side} magical units! 🎁
              </text>
            </svg>
            <div className="text-center mt-3">
              <span className="text-xl font-bold text-orange-600 animate-bounce">🎁 Magic Gift Box! 🎁</span>
            </div>
          </div>
        )

      case "triangle":
        return (
          <div className="relative">
            <svg width="220" height="180" viewBox="0 0 220 180" className="mx-auto drop-shadow-xl">
              {/* Cute mountain triangle */}
              <polygon points="110,40 60,130 160,130" fill="url(#mountainGradient)" stroke="#228B22" strokeWidth="4" />

              {/* Snow cap */}
              <polygon points="110,40 95,60 125,60" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />

              {/* Cute trees */}
              <polygon points="80,120 75,130 85,130" fill="#006400" />
              <rect x="78" y="125" width="4" height="8" fill="#8B4513" />

              <polygon points="140,115 135,130 145,130" fill="#006400" />
              <rect x="138" y="125" width="4" height="8" fill="#8B4513" />

              {/* Sun */}
              <circle cx="170" cy="60" r="12" fill="#FFD700" />
              <text x="170" y="66" textAnchor="middle" fontSize="12" fill="#FFA500">
                ☀️
              </text>

              {/* Clouds */}
              <text x="50" y="55" fontSize="16" fill="#87CEEB">
                ☁️
              </text>
              <text x="180" y="50" fontSize="16" fill="#87CEEB">
                ☁️
              </text>

              <defs>
                <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#90EE90" />
                  <stop offset="100%" stopColor="#228B22" />
                </linearGradient>
              </defs>

              <text x="110" y="155" textAnchor="middle" fontSize="16" fill="#228B22" fontWeight="bold">
                base: {dimensions.base} adventure units! 🏔️
              </text>
              <text x="35" y="90" textAnchor="middle" fontSize="16" fill="#228B22" fontWeight="bold">
                height: {dimensions.height} tall! 📐
              </text>
              <line x1="110" y1="40" x2="110" y2="130" stroke="#228B22" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
            <div className="text-center mt-3">
              <span className="text-xl font-bold text-green-600 animate-bounce">🏔️ Happy Mountain! 🏔️</span>
            </div>
          </div>
        )

      case "circle":
        return (
          <div className="relative">
            <svg width="200" height="180" viewBox="0 0 200 180" className="mx-auto drop-shadow-xl">
              {/* Cute planet circle */}
              <circle cx="100" cy="90" r="60" fill="url(#planetGradient)" stroke="#4169E1" strokeWidth="4" />

              {/* Planet rings */}
              <ellipse cx="100" cy="90" rx="75" ry="15" fill="none" stroke="#FFD700" strokeWidth="3" opacity="0.7" />
              <ellipse cx="100" cy="90" rx="85" ry="20" fill="none" stroke="#FFA500" strokeWidth="2" opacity="0.5" />

              {/* Cute face */}
              <circle cx="85" cy="75" r="8" fill="#FFFFFF" />
              <circle cx="115" cy="75" r="8" fill="#FFFFFF" />
              <circle cx="85" cy="75" r="4" fill="#000000" />
              <circle cx="115" cy="75" r="4" fill="#000000" />
              <path d="M 85 100 Q 100 115 115 100" stroke="#FFFFFF" strokeWidth="3" fill="none" />

              {/* Stars around */}
              <text x="40" y="40" fontSize="16" fill="#FFD700">
                ⭐
              </text>
              <text x="160" y="50" fontSize="16" fill="#FFD700">
                ⭐
              </text>
              <text x="50" y="140" fontSize="16" fill="#FFD700">
                ⭐
              </text>
              <text x="150" y="130" fontSize="16" fill="#FFD700">
                ⭐
              </text>

              <defs>
                <radialGradient id="planetGradient" cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#87CEEB" />
                  <stop offset="100%" stopColor="#4169E1" />
                </radialGradient>
              </defs>

              {/* Radius line */}
              <line x1="100" y1="90" x2="160" y2="90" stroke="#FFD700" strokeWidth="3" strokeDasharray="5,5" />
              <text x="130" y="85" fontSize="16" fill="#FFD700" fontWeight="bold">
                r = {dimensions.radius} space units! 🚀
              </text>
            </svg>
            <div className="text-center mt-3">
              <span className="text-xl font-bold text-blue-600 animate-bounce">🪐 Happy Planet! 🪐</span>
            </div>
          </div>
        )

      default:
        return (
          <div className="w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl flex items-center justify-center border-4 border-purple-400 shadow-xl">
            <span className="text-4xl animate-bounce">🎨</span>
          </div>
        )
    }
  }

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
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

      // Check for geometry badge
      if (newProgress.correctAnswers >= 30 && !rewards.badges.find((b: any) => b.id === 3)?.earned) {
        const updatedBadges = rewards.badges.map((badge: any) => (badge.id === 3 ? { ...badge, earned: true } : badge))
        updateRewards({ ...newRewards, badges: updatedBadges })
        setShowReward({ type: "badge", badge: updatedBadges.find((b: any) => b.id === 3) })
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
      setSelectedAnswer(null)
      setShowResult(false)
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
    setSelectedAnswer(null)
    setShowResult(false)
    setSessionScore(0)
    setSessionQuestions(0)
    setShowReward(null)
  }

  const question = questions[currentQuestion]
  const isCorrect = selectedAnswer === question.correct

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-200 to-blue-100 border-2 border-blue-300 shadow-md">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">
              {currentQuestion + 1}/{questions.length}
            </div>
            <div className="text-sm text-gray-600">Question</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-200 to-yellow-100 border-2 border-yellow-300 shadow-md">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">
              {sessionScore}/{sessionQuestions}
            </div>
            <div className="text-sm text-gray-600">Correct</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-200 to-purple-100 border-2 border-purple-300 shadow-md">
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{progress.xp}</div>
            <div className="text-sm text-gray-600">XP</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-200 to-green-100 border-2 border-green-300 shadow-md">
          <CardContent className="p-4 text-center">
            <Shapes className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">Level {progress.level}</div>
            <div className="text-sm text-gray-600">Current</div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="bg-gradient-to-br from-pink-100 to-pink-50 border-2 border-pink-200 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Level {progress.level} Progress</span>
            <span className="text-sm text-gray-500">
              {progress.xp}/{progress.level * 500} XP
            </span>
          </div>
          <Progress value={(progress.xp / (progress.level * 500)) * 100} className="h-3" />
        </CardContent>
      </Card>

      {/* Reward Popup */}
      {showReward && (
        <Card className="border-2 border-yellow-400 bg-yellow-50">
          <CardContent className="p-6 text-center">
            {showReward.type === "levelUp" && (
              <>
                <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-2xl font-bold text-yellow-700 mb-2">Level Up!</h3>
                <p className="text-yellow-600">You've reached Level {showReward.level}!</p>
                <Badge className="mt-2">+50 Bonus Coins</Badge>
              </>
            )}
            {showReward.type === "badge" && (
              <>
                <div className="text-6xl mb-4">{showReward.badge.icon}</div>
                <h3 className="text-2xl font-bold text-yellow-700 mb-2">Badge Earned!</h3>
                <p className="text-yellow-600">{showReward.badge.name}</p>
                <p className="text-sm text-yellow-500 mt-2">{showReward.badge.description}</p>
              </>
            )}
            {showReward.type === "completion" && (
              <>
                <Star className="w-16 h-16 mx-auto mb-4 text-purple-500" />
                <h3 className="text-2xl font-bold text-purple-700 mb-2">Quiz Complete!</h3>
                <p className="text-purple-600">
                  Score: {showReward.score}/{showReward.total} ({showReward.accuracy}%)
                </p>
                <div className="flex gap-2 justify-center mt-4">
                  <Button onClick={resetQuiz}>Try Again</Button>
                  <Button variant="outline" onClick={() => window.history.back()}>
                    Back to Dashboard
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Main Question */}
      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{question.question}</CardTitle>
            <div className="flex gap-2">
              <Badge
                variant={
                  question.difficulty === "easy"
                    ? "secondary"
                    : question.difficulty === "medium"
                      ? "default"
                      : "destructive"
                }
              >
                {question.difficulty}
              </Badge>
              <Badge variant="outline">+{question.xpReward} XP</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Shape Visual */}
          <div className="text-center p-6 bg-gray-50 rounded-lg">{renderShape(question)}</div>

          {/* Formula Reference */}
          <div className="text-center p-3 bg-blue-50 rounded border-l-4 border-blue-500">
            <span className="text-sm font-medium text-blue-800">Formula: {question.formula}</span>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  showResult
                    ? option === question.correct
                      ? "default"
                      : option === selectedAnswer
                        ? "destructive"
                        : "outline"
                    : selectedAnswer === option
                      ? "default"
                      : "outline"
                }
                onClick={() => !showResult && handleAnswer(option)}
                disabled={showResult}
                className="h-16 text-lg"
              >
                {option}
                {showResult && option === question.correct && <CheckCircle className="w-5 h-5 ml-2" />}
                {showResult && option === selectedAnswer && option !== question.correct && (
                  <X className="w-5 h-5 ml-2" />
                )}
              </Button>
            ))}
          </div>

          {/* Result and Explanation */}
          {showResult && (
            <div
              className={`p-4 rounded-lg border-l-4 ${
                isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <X className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-medium ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                  {isCorrect ? "Correct!" : "Incorrect"}
                </span>
                {isCorrect && (
                  <Badge variant="secondary" className="ml-auto">
                    +{question.xpReward} XP
                  </Badge>
                )}
              </div>
              <p className={isCorrect ? "text-green-700" : "text-red-700"}>{question.explanation}</p>
              <div className="mt-4">
                <Button onClick={nextQuestion}>
                  {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Quiz"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
