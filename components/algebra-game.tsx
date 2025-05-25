"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Target, Zap, Trophy, CheckCircle, X } from "lucide-react"

export default function AlgebraGame() {
  const [currentEquation, setCurrentEquation] = useState({ left: "2x + 3", right: "11", solution: 4 })
  const [userAnswer, setUserAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [streak, setStreak] = useState(0)
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })
  const [balanceLeft, setBalanceLeft] = useState(11)
  const [balanceRight, setBalanceRight] = useState(11)
  const [steps, setSteps] = useState<string[]>([])

  const equations = [
    { left: "x + 5", right: "12", solution: 7, difficulty: 1 },
    { left: "2x + 3", right: "11", solution: 4, difficulty: 1 },
    { left: "3x - 7", right: "14", solution: 7, difficulty: 2 },
    { left: "4x + 8", right: "32", solution: 6, difficulty: 2 },
    { left: "5x - 15", right: "25", solution: 8, difficulty: 3 },
    { left: "2x + 7", right: "3x - 2", solution: 9, difficulty: 3 },
  ]

  const generateNewEquation = () => {
    const availableEquations = equations.filter((eq) => eq.difficulty <= level)
    const randomEq = availableEquations[Math.floor(Math.random() * availableEquations.length)]
    setCurrentEquation(randomEq)
    setBalanceLeft(Number.parseInt(randomEq.right))
    setBalanceRight(Number.parseInt(randomEq.right))
    setSteps([])
    setUserAnswer("")
    setFeedback({ type: null, message: "" })
  }

  const checkAnswer = () => {
    const answer = Number.parseInt(userAnswer)
    if (answer === currentEquation.solution) {
      setScore(score + level * 10)
      setStreak(streak + 1)
      setFeedback({ type: "success", message: `Correct! x = ${answer}` })

      if (streak > 0 && streak % 3 === 0) {
        setLevel(Math.min(level + 1, 3))
      }

      setTimeout(() => {
        generateNewEquation()
      }, 2000)
    } else {
      setStreak(0)
      setFeedback({ type: "error", message: `Not quite! Try again. The answer is ${currentEquation.solution}` })
    }
  }

  const addStep = (step: string) => {
    setSteps([...steps, step])
  }

  const renderBalance = () => {
    return (
      <div className="flex items-center justify-center space-x-8 my-6">
        <div className="text-center">
          <div className="w-24 h-16 bg-blue-100 border-2 border-blue-300 rounded flex items-center justify-center">
            <span className="font-bold">{currentEquation.left}</span>
          </div>
          <div className="w-24 h-2 bg-gray-400 mt-2"></div>
        </div>

        <div className="text-2xl font-bold">=</div>

        <div className="text-center">
          <div className="w-24 h-16 bg-green-100 border-2 border-green-300 rounded flex items-center justify-center">
            <span className="font-bold">{currentEquation.right}</span>
          </div>
          <div className="w-24 h-2 bg-gray-400 mt-2"></div>
        </div>
      </div>
    )
  }

  const renderStepByStep = () => {
    const equation = currentEquation
    const steps = [
      `Start: ${equation.left} = ${equation.right}`,
      `Subtract 3: ${equation.left.includes("+") ? equation.left.replace("+ 3", "- 3") : equation.left.replace("- 7", "+ 7")} = ${Number.parseInt(equation.right) - (equation.left.includes("+") ? 3 : -7)}`,
      `Divide by coefficient: x = ${equation.solution}`,
    ]

    return (
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={index} className="p-2 bg-gray-50 rounded border-l-4 border-blue-500">
            <span className="text-sm font-medium">Step {index + 1}: </span>
            <span>{step}</span>
          </div>
        ))}
      </div>
    )
  }

  useEffect(() => {
    generateNewEquation()
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{score}</div>
            <div className="text-sm text-gray-600">Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{level}</div>
            <div className="text-sm text-gray-600">Level</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">{streak}</div>
            <div className="text-sm text-gray-600">Streak</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Brain className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{Math.floor(score / 100)}</div>
            <div className="text-sm text-gray-600">Mastery</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="solve" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="solve">Solve Equations</TabsTrigger>
          <TabsTrigger value="balance">Balance Method</TabsTrigger>
          <TabsTrigger value="steps">Step by Step</TabsTrigger>
        </TabsList>

        <TabsContent value="solve" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Solve for x
              </CardTitle>
              <CardDescription>Find the value of x that makes the equation true</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-4">
                  {currentEquation.left} = {currentEquation.right}
                </div>
                <Badge variant="outline">Level {level}</Badge>
              </div>

              <div className="flex items-center gap-4 justify-center">
                <span className="text-lg">x = </span>
                <Input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-24 text-center text-lg"
                  placeholder="?"
                />
                <Button onClick={checkAnswer} disabled={!userAnswer}>
                  Check Answer
                </Button>
              </div>

              {feedback.type && (
                <div
                  className={`p-4 rounded-lg text-center ${
                    feedback.type === "success"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {feedback.type === "success" ? <CheckCircle className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    {feedback.message}
                  </div>
                </div>
              )}

              <div className="text-center">
                <Button variant="outline" onClick={generateNewEquation}>
                  New Equation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Balance Method</CardTitle>
              <CardDescription>Visualize equations as balanced scales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold">
                  {currentEquation.left} = {currentEquation.right}
                </h3>
              </div>

              {renderBalance()}

              <div className="text-center space-y-4">
                <p className="text-gray-600">Keep both sides balanced by doing the same operation to both sides</p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" onClick={() => addStep("Subtract 3 from both sides")}>
                    -3
                  </Button>
                  <Button variant="outline" onClick={() => addStep("Divide both sides by 2")}>
                    ÷2
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="steps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Step-by-Step Solution</CardTitle>
              <CardDescription>Learn the systematic approach to solving equations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">
                  {currentEquation.left} = {currentEquation.right}
                </h3>
              </div>

              {renderStepByStep()}

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">Key Strategy:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Isolate the variable term by adding/subtracting constants</li>
                  <li>Divide by the coefficient to get x by itself</li>
                  <li>Check your answer by substituting back into the original equation</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
