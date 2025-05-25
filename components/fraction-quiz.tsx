"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, X, Star, Trophy, Gift, Target } from "lucide-react"

interface FractionQuizProps {
  progress: any
  updateProgress: (progress: any) => void
  rewards: any
  updateRewards: (rewards: any) => void
}

export default function FractionQuiz({ progress, updateProgress, rewards, updateRewards }: FractionQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [sessionScore, setSessionScore] = useState(0)
  const [sessionQuestions, setSessionQuestions] = useState(0)
  const [showReward, setShowReward] = useState<any>(null)

  const questions = [
    {
      id: 1,
      question: "What fraction of this circle is shaded?",
      visual: "pie-half",
      options: ["1/2", "1/3", "1/4", "2/3"],
      correct: "1/2",
      explanation: "Half of the circle is shaded, which represents 1/2.",
      difficulty: "easy",
      xpReward: 10,
    },
    {
      id: 2,
      question: "Which fraction is equivalent to 2/4?",
      visual: "bars-equivalent",
      options: ["1/2", "1/3", "3/4", "2/3"],
      correct: "1/2",
      explanation: "2/4 simplifies to 1/2 because both numerator and denominator can be divided by 2.",
      difficulty: "easy",
      xpReward: 10,
    },
    {
      id: 3,
      question: "What is 1/4 + 1/4?",
      visual: "addition",
      options: ["1/2", "2/8", "1/8", "2/4"],
      correct: "1/2",
      explanation: "1/4 + 1/4 = 2/4, which simplifies to 1/2.",
      difficulty: "medium",
      xpReward: 15,
    },
    {
      id: 4,
      question: "Which fraction is larger: 3/8 or 1/2?",
      visual: "comparison",
      options: ["3/8", "1/2", "They are equal", "Cannot determine"],
      correct: "1/2",
      explanation: "1/2 = 4/8, and 4/8 > 3/8, so 1/2 is larger.",
      difficulty: "medium",
      xpReward: 15,
    },
    {
      id: 5,
      question: "What is 3/5 - 1/5?",
      visual: "subtraction",
      options: ["2/5", "2/10", "4/5", "1/5"],
      correct: "2/5",
      explanation:
        "When subtracting fractions with the same denominator, subtract the numerators: 3 - 1 = 2, so 3/5 - 1/5 = 2/5.",
      difficulty: "hard",
      xpReward: 20,
    },
  ]

  const renderVisual = (type: string) => {
    switch (type) {
      case "pie-half":
        return (
          <div className="relative">
            <svg width="160" height="160" viewBox="0 0 160 160" className="mx-auto drop-shadow-lg">
              {/* Cute pizza base */}
              <circle cx="80" cy="80" r="70" fill="#FFE4B5" stroke="#D2691E" strokeWidth="4" />
              <circle cx="80" cy="80" r="65" fill="#FFA500" stroke="#FF8C00" strokeWidth="2" />

              {/* Pizza toppings - pepperoni dots */}
              <circle cx="60" cy="60" r="8" fill="#DC143C" />
              <circle cx="100" cy="70" r="8" fill="#DC143C" />
              <circle cx="70" cy="100" r="8" fill="#DC143C" />
              <circle cx="90" cy="95" r="8" fill="#DC143C" />

              {/* Exactly half shaded - from top center, sweeping 180 degrees */}
              <path
                d="M 80 80 L 80 10 A 70 70 0 0 1 80 150 Z"
                fill="#FF69B4"
                fillOpacity="0.8"
                stroke="#FF1493"
                strokeWidth="3"
              />

              {/* Cute sparkles */}
              <text x="40" y="40" fontSize="16" fill="#FFD700">
                ✨
              </text>
              <text x="120" y="45" fontSize="16" fill="#FFD700">
                ✨
              </text>
              <text x="45" y="120" fontSize="16" fill="#FFD700">
                ✨
              </text>
            </svg>
            <div className="text-center mt-2">
              <span className="text-2xl font-bold text-pink-600 animate-bounce">🍕 Half the Pizza is Pink! 🍕</span>
            </div>
          </div>
        )
      case "bars-equivalent":
        return (
          <div className="space-y-4 p-4 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl border-4 border-yellow-400">
            <div className="text-center">
              <span className="text-xl font-bold text-orange-600">🧁 Magic Candy Bars! 🧁</span>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2 justify-center">
                <div className="h-12 w-20 bg-gradient-to-br from-pink-400 to-purple-500 border-4 border-pink-600 rounded-lg shadow-lg animate-pulse"></div>
                <div className="h-12 w-20 bg-gradient-to-br from-pink-400 to-purple-500 border-4 border-pink-600 rounded-lg shadow-lg animate-pulse"></div>
                <div className="h-12 w-20 bg-gray-200 border-4 border-gray-400 rounded-lg"></div>
                <div className="h-12 w-20 bg-gray-200 border-4 border-gray-400 rounded-lg"></div>
              </div>
              <div className="text-center text-lg font-bold text-purple-600">2/4 = Two out of Four! 🎉</div>
              <div className="flex gap-2 justify-center">
                <div className="h-12 w-40 bg-gradient-to-br from-green-400 to-blue-500 border-4 border-green-600 rounded-lg shadow-lg animate-pulse"></div>
                <div className="h-12 w-40 bg-gray-200 border-4 border-gray-400 rounded-lg"></div>
              </div>
              <div className="text-center text-lg font-bold text-green-600">1/2 = One Half! 🌟</div>
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

      // Update progress
      const newProgress = {
        ...progress,
        xp: progress.xp + question.xpReward,
        questionsAnswered: progress.questionsAnswered + 1,
        correctAnswers: progress.correctAnswers + 1,
      }

      // Check for level up
      if (newProgress.xp >= newProgress.level * 500) {
        newProgress.level += 1
        setShowReward({ type: "levelUp", level: newProgress.level })
      }

      updateProgress(newProgress)

      // Update rewards
      const newRewards = {
        ...rewards,
        coins: rewards.coins + question.xpReward / 2,
        gems: rewards.gems + (question.difficulty === "hard" ? 2 : 1),
      }
      updateRewards(newRewards)

      // Check for achievements
      if (newProgress.correctAnswers === 50 && !rewards.badges.find((b: any) => b.id === 1)?.earned) {
        const updatedBadges = rewards.badges.map((badge: any) => (badge.id === 1 ? { ...badge, earned: true } : badge))
        updateRewards({ ...newRewards, badges: updatedBadges })
        setShowReward({ type: "badge", badge: updatedBadges.find((b: any) => b.id === 1) })
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
      // Quiz completed
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
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">
              {currentQuestion + 1}/{questions.length}
            </div>
            <div className="text-sm text-gray-600">Question</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">
              {sessionScore}/{sessionQuestions}
            </div>
            <div className="text-sm text-gray-600">Correct</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{progress.xp}</div>
            <div className="text-sm text-gray-600">XP</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Gift className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">Level {progress.level}</div>
            <div className="text-sm text-gray-600">Current</div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card>
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
      <Card className="border-4 border-rainbow bg-gradient-to-br from-pink-100 via-purple-100 to-cyan-100 shadow-2xl rounded-3xl overflow-hidden relative">
        <CardHeader className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white relative overflow-hidden">
          {/* Floating space elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-2 left-4 text-3xl animate-bounce">🚀</div>
            <div className="absolute top-2 right-4 text-2xl animate-spin">🛸</div>
            <div className="absolute bottom-2 left-8 text-2xl animate-pulse">⭐</div>
            <div className="absolute bottom-2 right-8 text-3xl animate-bounce">🌌</div>
          </div>

          <div className="flex items-center justify-between relative z-10">
            <CardTitle className="text-2xl flex items-center gap-2 font-bold">🍕 {question.question}</CardTitle>
            <div className="flex gap-2">
              <Badge className="bg-white/20 text-white text-lg px-4 py-2 rounded-full border-2 border-white/30 font-bold animate-pulse">
                {question.difficulty} 🌟
              </Badge>
              <Badge className="bg-yellow-400 text-yellow-900 text-lg px-4 py-2 rounded-full border-2 border-yellow-600 font-bold">
                +{question.xpReward} Space Points! ✨
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Visual */}
          <div className="text-center p-6 bg-gray-50 rounded-lg">{renderVisual(question.visual)}</div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4">
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
                className={`h-20 text-2xl font-bold rounded-2xl border-4 shadow-lg transform hover:scale-105 transition-all ${
                  selectedAnswer === option
                    ? "bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-600 text-white animate-pulse"
                    : "bg-gradient-to-br from-cyan-200 to-blue-200 border-cyan-400 text-cyan-800 hover:from-cyan-300 hover:to-blue-300"
                }`}
              >
                <span className="mr-2 text-3xl">
                  {index === 0 ? "🎯" : index === 1 ? "🌟" : index === 2 ? "🎨" : "🚀"}
                </span>
                {option}
                {showResult && option === question.correct && <span className="ml-2 text-3xl animate-bounce">🎉</span>}
                {showResult && option === selectedAnswer && option !== question.correct && (
                  <span className="ml-2 text-3xl">😅</span>
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
