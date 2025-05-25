"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, X, Star, Trophy, Target, Brain } from "lucide-react"

interface AlgebraQuizProps {
  progress: any
  updateProgress: (progress: any) => void
  rewards: any
  updateRewards: (rewards: any) => void
}

export default function AlgebraQuiz({ progress, updateProgress, rewards, updateRewards }: AlgebraQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [sessionScore, setSessionScore] = useState(0)
  const [sessionQuestions, setSessionQuestions] = useState(0)
  const [showReward, setShowReward] = useState<any>(null)

  const questions = [
    {
      id: 1,
      equation: "x + 5 = 12",
      question: "Solve for x:",
      correct: 7,
      steps: ["Start with: x + 5 = 12", "Subtract 5 from both sides: x + 5 - 5 = 12 - 5", "Simplify: x = 7"],
      difficulty: "easy",
      xpReward: 15,
    },
    {
      id: 2,
      equation: "2x + 3 = 11",
      question: "Solve for x:",
      correct: 4,
      steps: ["Start with: 2x + 3 = 11", "Subtract 3 from both sides: 2x = 8", "Divide both sides by 2: x = 4"],
      difficulty: "medium",
      xpReward: 20,
    },
    {
      id: 3,
      equation: "3x - 7 = 14",
      question: "Solve for x:",
      correct: 7,
      steps: ["Start with: 3x - 7 = 14", "Add 7 to both sides: 3x = 21", "Divide both sides by 3: x = 7"],
      difficulty: "medium",
      xpReward: 20,
    },
    {
      id: 4,
      equation: "4x + 8 = 2x + 16",
      question: "Solve for x:",
      correct: 4,
      steps: [
        "Start with: 4x + 8 = 2x + 16",
        "Subtract 2x from both sides: 2x + 8 = 16",
        "Subtract 8 from both sides: 2x = 8",
        "Divide both sides by 2: x = 4",
      ],
      difficulty: "hard",
      xpReward: 25,
    },
    {
      id: 5,
      equation: "5(x - 2) = 15",
      question: "Solve for x:",
      correct: 5,
      steps: ["Start with: 5(x - 2) = 15", "Divide both sides by 5: x - 2 = 3", "Add 2 to both sides: x = 5"],
      difficulty: "hard",
      xpReward: 25,
    },
  ]

  const renderBalance = (equation: string) => {
    const [left, right] = equation.split(" = ")
    return (
      <div className="flex items-center justify-center space-x-8 my-8 p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl border-4 border-purple-400">
        {/* Left side - Magic scale */}
        <div className="text-center relative">
          <div className="text-4xl mb-2 animate-bounce">⚖️</div>
          <div className="w-40 h-20 bg-gradient-to-br from-blue-300 to-cyan-400 border-4 border-blue-500 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-all">
            <span className="font-bold text-xl text-white drop-shadow-lg">{left}</span>
          </div>
          <div className="w-40 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 mt-2 rounded-full shadow-lg"></div>
          <div className="text-lg font-bold text-blue-600 mt-2">Magic Left Side! ✨</div>
        </div>

        {/* Equals sign */}
        <div className="text-center">
          <div className="text-6xl font-bold text-purple-600 animate-pulse drop-shadow-lg">=</div>
          <div className="text-lg font-bold text-purple-500">Balance!</div>
        </div>

        {/* Right side - Magic scale */}
        <div className="text-center relative">
          <div className="text-4xl mb-2 animate-bounce">⚖️</div>
          <div className="w-40 h-20 bg-gradient-to-br from-green-300 to-emerald-400 border-4 border-green-500 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-all">
            <span className="font-bold text-xl text-white drop-shadow-lg">{right}</span>
          </div>
          <div className="w-40 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 mt-2 rounded-full shadow-lg"></div>
          <div className="text-lg font-bold text-green-600 mt-2">Magic Right Side! ✨</div>
        </div>
      </div>
    )
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
        coins: rewards.coins + question.xpReward / 2,
        gems: rewards.gems + (question.difficulty === "hard" ? 3 : question.difficulty === "medium" ? 2 : 1),
      }
      updateRewards(newRewards)

      // Check for algebra badge
      if (newProgress.correctAnswers >= 25 && !rewards.badges.find((b: any) => b.id === 2)?.earned) {
        const updatedBadges = rewards.badges.map((badge: any) => (badge.id === 2 ? { ...badge, earned: true } : badge))
        updateRewards({ ...newRewards, badges: updatedBadges })
        setShowReward({ type: "badge", badge: updatedBadges.find((b: any) => b.id === 2) })
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
    setSessionScore(0)
    setSessionQuestions(0)
    setShowReward(null)
  }

  const question = questions[currentQuestion]
  const isCorrect = Number.parseInt(userAnswer) === question.correct

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
            <Brain className="w-8 h-8 mx-auto mb-2 text-green-500" />
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
      <Card>
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
          {/* Equation Display */}
          <div className="text-center p-8 bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 rounded-3xl border-4 border-yellow-400 shadow-xl">
            <div className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 drop-shadow-lg animate-pulse">
              {question.equation}
            </div>
            <div className="flex justify-center gap-4 text-2xl">
              <span className="animate-bounce">🔮</span>
              <span className="text-purple-600 font-bold">Solve the Magic Equation!</span>
              <span className="animate-bounce">✨</span>
            </div>
          </div>

          {/* Balance Visual */}
          {renderBalance(question.equation)}

          {/* Answer Input */}
          <div className="flex items-center gap-6 justify-center p-8 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl border-4 border-cyan-400 shadow-xl">
            <span className="text-3xl animate-bounce">🎯</span>
            <span className="text-2xl font-bold text-purple-700">x = </span>
            <Input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-32 text-center text-3xl border-4 border-purple-400 rounded-2xl bg-white shadow-lg font-bold text-purple-600 focus:border-pink-400 focus:ring-4 focus:ring-pink-200"
              placeholder="?"
              disabled={showResult}
            />
            <Button
              onClick={handleAnswer}
              disabled={!userAnswer || showResult}
              className="px-12 py-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-bold text-2xl rounded-2xl shadow-xl border-4 border-white transform hover:scale-110 transition-all animate-pulse"
            >
              <span className="mr-2 text-3xl">🚀</span>
              Solve It!
              <span className="ml-2 text-3xl">✨</span>
            </Button>
            <span className="text-3xl animate-bounce">🌟</span>
          </div>

          {/* Result and Steps */}
          {showResult && (
            <div
              className={`p-4 rounded-lg border-l-4 ${
                isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <X className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-medium ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                  {isCorrect ? "Correct!" : `Incorrect. The answer is x = ${question.correct}`}
                </span>
                {isCorrect && (
                  <Badge variant="secondary" className="ml-auto">
                    +{question.xpReward} XP
                  </Badge>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-2xl text-center flex items-center justify-center gap-2">
                  <span className="text-3xl animate-bounce">🔍</span>
                  <span className="text-purple-700">Magic Solution Steps!</span>
                  <span className="text-3xl animate-bounce">🪄</span>
                </h4>
                {question.steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border-4 border-purple-300 shadow-lg transform hover:scale-105 transition-all"
                  >
                    <Badge className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xl px-4 py-2 rounded-full border-2 border-white font-bold mt-1 shadow-lg animate-pulse">
                      {index + 1}
                    </Badge>
                    <span className={`flex-1 text-xl font-bold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                      {step}
                    </span>
                    <span className="text-2xl animate-bounce">{index === 0 ? "🎯" : index === 1 ? "⚡" : "🎉"}</span>
                  </div>
                ))}
              </div>

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
