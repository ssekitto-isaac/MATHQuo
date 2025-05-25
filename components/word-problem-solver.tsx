"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Lightbulb, CheckCircle, Target, Brain } from "lucide-react"

export default function WordProblemSolver() {
  const [currentProblem, setCurrentProblem] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [score, setScore] = useState(0)

  const problems = [
    {
      title: "Pizza Party Problem",
      story:
        "Sarah ordered 3 pizzas for her party. Each pizza was cut into 8 slices. If 18 people came to the party and each person ate 1 slice, how many slices were left over?",
      hint: "First find the total number of slices, then subtract how many were eaten.",
      steps: [
        "Total slices = 3 pizzas × 8 slices = 24 slices",
        "Slices eaten = 18 people × 1 slice = 18 slices",
        "Slices left = 24 - 18 = 6 slices",
      ],
      answer: 6,
      category: "Multiplication & Subtraction",
      difficulty: "Easy",
    },
    {
      title: "Garden Growing",
      story:
        "Tom plants flowers in rows. He has 7 rows with 12 flowers in each row. If 15 flowers don't bloom, how many flowers successfully bloomed?",
      hint: "Calculate total flowers first, then subtract the ones that didn't bloom.",
      steps: [
        "Total flowers planted = 7 rows × 12 flowers = 84 flowers",
        "Flowers that bloomed = 84 - 15 = 69 flowers",
      ],
      answer: 69,
      category: "Multiplication & Subtraction",
      difficulty: "Medium",
    },
    {
      title: "Savings Challenge",
      story: "Emma saves $5 every week. After 8 weeks, she spends $25 on a book. How much money does she have left?",
      hint: "Find total savings first, then subtract what she spent.",
      steps: ["Total saved = $5 × 8 weeks = $40", "Money left = $40 - $25 = $15"],
      answer: 15,
      category: "Money & Time",
      difficulty: "Easy",
    },
    {
      title: "Class Trip",
      story:
        "A school has 4 classes going on a trip. Each class has 25 students. If each bus can hold 30 students, how many buses are needed?",
      hint: "Find total students, then divide by bus capacity. Round up if needed!",
      steps: [
        "Total students = 4 classes × 25 students = 100 students",
        "Buses needed = 100 ÷ 30 = 3.33...",
        "Since we can't have part of a bus, we need 4 buses",
      ],
      answer: 4,
      category: "Division & Rounding",
      difficulty: "Hard",
    },
  ]

  const checkAnswer = () => {
    const answer = Number.parseInt(userAnswer)
    if (answer === problems[currentProblem].answer) {
      setScore(score + 10)
      setShowSolution(true)
    } else {
      setShowHint(true)
    }
  }

  const nextProblem = () => {
    setCurrentProblem((currentProblem + 1) % problems.length)
    setUserAnswer("")
    setShowHint(false)
    setShowSolution(false)
  }

  const renderProblemVisual = () => {
    const problem = problems[currentProblem]

    if (problem.title === "Pizza Party Problem") {
      return (
        <div className="grid grid-cols-3 gap-4 my-4">
          {[1, 2, 3].map((pizza) => (
            <div key={pizza} className="text-center">
              <div className="w-20 h-20 mx-auto mb-2 rounded-full border-4 border-orange-400 bg-orange-100 flex items-center justify-center relative">
                <div className="absolute inset-2 border-2 border-orange-300 rounded-full"></div>
                <div className="absolute w-full h-0.5 bg-orange-300 top-1/2"></div>
                <div className="absolute h-full w-0.5 bg-orange-300 left-1/2"></div>
                <div className="absolute w-full h-0.5 bg-orange-300 top-1/2 transform rotate-45"></div>
                <div className="absolute w-full h-0.5 bg-orange-300 top-1/2 transform -rotate-45"></div>
              </div>
              <div className="text-sm">Pizza {pizza}</div>
              <div className="text-xs text-gray-600">8 slices</div>
            </div>
          ))}
        </div>
      )
    }

    if (problem.title === "Garden Growing") {
      return (
        <div className="grid grid-cols-7 gap-1 my-4 p-4 bg-green-50 rounded">
          {Array.from({ length: 84 }, (_, i) => (
            <div key={i} className={`w-4 h-4 rounded-full ${i < 69 ? "bg-pink-400" : "bg-gray-300"}`}></div>
          ))}
        </div>
      )
    }

    return null
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{score}</div>
            <div className="text-sm text-gray-600">Points</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{currentProblem + 1}</div>
            <div className="text-sm text-gray-600">Problem</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Brain className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{problems.length}</div>
            <div className="text-sm text-gray-600">Total</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="solve" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="solve">Solve Problem</TabsTrigger>
          <TabsTrigger value="strategy">Problem Strategy</TabsTrigger>
          <TabsTrigger value="practice">Practice Mode</TabsTrigger>
        </TabsList>

        <TabsContent value="solve" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                {problems[currentProblem].title}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Badge variant="outline">{problems[currentProblem].category}</Badge>
                <Badge
                  variant={
                    problems[currentProblem].difficulty === "Easy"
                      ? "secondary"
                      : problems[currentProblem].difficulty === "Medium"
                        ? "default"
                        : "destructive"
                  }
                >
                  {problems[currentProblem].difficulty}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-lg leading-relaxed">{problems[currentProblem].story}</p>
              </div>

              {renderProblemVisual()}

              <div className="flex items-center gap-4 justify-center">
                <span className="text-lg font-medium">Answer:</span>
                <Input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-24 text-center text-lg"
                  placeholder="?"
                />
                <Button onClick={checkAnswer} disabled={!userAnswer || showSolution}>
                  Check Answer
                </Button>
              </div>

              {showHint && !showSolution && (
                <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Hint:</span>
                  </div>
                  <p className="text-yellow-700">{problems[currentProblem].hint}</p>
                </div>
              )}

              {showSolution && (
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Great job! Here's the solution:</span>
                  </div>
                  <div className="space-y-2">
                    {problems[currentProblem].steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">
                          {index + 1}
                        </Badge>
                        <span className="text-green-700">{step}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button onClick={nextProblem}>Next Problem</Button>
                  </div>
                </div>
              )}

              <div className="flex gap-2 justify-center">
                <Button variant="outline" onClick={() => setShowHint(!showHint)}>
                  <Lightbulb className="w-4 h-4 mr-2" />
                  {showHint ? "Hide" : "Show"} Hint
                </Button>
                <Button variant="outline" onClick={nextProblem}>
                  Skip Problem
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Problem-Solving Strategy</CardTitle>
              <CardDescription>Learn the step-by-step approach to tackle any word problem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">📖 Step 1: Read Carefully</h3>
                  <p className="text-gray-600">
                    Read the problem twice. Identify what you know and what you need to find.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">🔍 Step 2: Find Key Information</h3>
                  <p className="text-gray-600">
                    Look for numbers, units, and keywords like "total," "each," "left over," etc.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">📝 Step 3: Choose Operations</h3>
                  <p className="text-gray-600">
                    Decide if you need to add, subtract, multiply, or divide based on the problem.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">🧮 Step 4: Solve Step by Step</h3>
                  <p className="text-gray-600">
                    Work through the problem one step at a time. Don't try to solve everything at once.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">✅ Step 5: Check Your Answer</h3>
                  <p className="text-gray-600">
                    Does your answer make sense? Try working backwards or estimating to verify.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Practice Problems</CardTitle>
              <CardDescription>Choose from different categories to practice specific skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {problems.map((problem, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all ${
                      index === currentProblem ? "ring-2 ring-blue-500" : "hover:shadow-md"
                    }`}
                    onClick={() => {
                      setCurrentProblem(index)
                      setUserAnswer("")
                      setShowHint(false)
                      setShowSolution(false)
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{problem.title}</h3>
                        <Badge
                          variant={
                            problem.difficulty === "Easy"
                              ? "secondary"
                              : problem.difficulty === "Medium"
                                ? "default"
                                : "destructive"
                          }
                        >
                          {problem.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{problem.category}</p>
                      <p className="text-sm line-clamp-2">{problem.story}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
