"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, BarChart3, Calculator, CheckCircle } from "lucide-react"

export default function FractionVisualizer() {
  const [numerator, setNumerator] = useState(1)
  const [denominator, setDenominator] = useState(4)
  const [fraction2Num, setFraction2Num] = useState(1)
  const [fraction2Den, setFraction2Den] = useState(2)
  const [gameScore, setGameScore] = useState(0)
  const [currentChallenge, setCurrentChallenge] = useState(0)

  const challenges = [
    { question: "What fraction is shown?", answer: "1/2", visual: { num: 1, den: 2 } },
    { question: "Which is larger: 1/3 or 1/4?", answer: "1/3", visual: { num: 1, den: 3 } },
    { question: "What is 1/4 + 1/4?", answer: "1/2", visual: { num: 2, den: 4 } },
  ]

  const renderPieChart = (num: number, den: number, color = "fill-blue-500") => {
    const percentage = (num / den) * 100
    const angle = (num / den) * 360

    return (
      <div className="relative w-32 h-32 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="20"
            strokeDasharray={`${percentage * 2.51} 251`}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">
            {num}/{den}
          </span>
        </div>
      </div>
    )
  }

  const renderBarChart = (num: number, den: number) => {
    return (
      <div className="space-y-2">
        <div className="flex gap-1">
          {Array.from({ length: den }, (_, i) => (
            <div key={i} className={`h-8 flex-1 border-2 border-gray-300 ${i < num ? "bg-blue-500" : "bg-gray-100"}`} />
          ))}
        </div>
        <p className="text-center text-sm text-gray-600">
          {num} out of {den} parts = {num}/{den}
        </p>
      </div>
    )
  }

  const calculateSum = () => {
    if (denominator === fraction2Den) {
      return `${numerator + fraction2Num}/${denominator}`
    }
    const commonDen = denominator * fraction2Den
    const newNum1 = numerator * fraction2Den
    const newNum2 = fraction2Num * denominator
    return `${newNum1 + newNum2}/${commonDen}`
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="visualizer" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="visualizer">Visualizer</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="game">Fraction Game</TabsTrigger>
          <TabsTrigger value="compare">Compare</TabsTrigger>
        </TabsList>

        <TabsContent value="visualizer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Interactive Fraction Visualizer
              </CardTitle>
              <CardDescription>
                Adjust the sliders to see how fractions look as pie charts and bar models
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Numerator: {numerator}</Label>
                    <Slider
                      value={[numerator]}
                      onValueChange={(value) => setNumerator(value[0])}
                      max={denominator}
                      min={0}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Denominator: {denominator}</Label>
                    <Slider
                      value={[denominator]}
                      onValueChange={(value) => {
                        setDenominator(value[0])
                        if (numerator > value[0]) setNumerator(value[0])
                      }}
                      max={12}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="text-center">
                  {renderPieChart(numerator, denominator)}
                  <p className="mt-2 text-lg font-semibold">
                    {numerator}/{denominator} = {((numerator / denominator) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Bar Model
                </h3>
                {renderBarChart(numerator, denominator)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Fraction Calculator
              </CardTitle>
              <CardDescription>Add, subtract, and compare fractions with visual feedback</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="space-y-4">
                  <h3 className="font-semibold">First Fraction</h3>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={numerator}
                      onChange={(e) => setNumerator(Number(e.target.value))}
                      className="w-16"
                      min="0"
                    />
                    <span>/</span>
                    <Input
                      type="number"
                      value={denominator}
                      onChange={(e) => setDenominator(Number(e.target.value))}
                      className="w-16"
                      min="1"
                    />
                  </div>
                  {renderPieChart(numerator, denominator)}
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold mb-4">+</div>
                  <Badge variant="outline" className="text-lg p-2">
                    = {calculateSum()}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Second Fraction</h3>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={fraction2Num}
                      onChange={(e) => setFraction2Num(Number(e.target.value))}
                      className="w-16"
                      min="0"
                    />
                    <span>/</span>
                    <Input
                      type="number"
                      value={fraction2Den}
                      onChange={(e) => setFraction2Den(Number(e.target.value))}
                      className="w-16"
                      min="1"
                    />
                  </div>
                  {renderPieChart(fraction2Num, fraction2Den, "fill-green-500")}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="game" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Fraction Challenge Game
              </CardTitle>
              <CardDescription>Test your fraction knowledge with interactive challenges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <Badge variant="secondary">Score: {gameScore}</Badge>
                <Badge variant="outline">Challenge {currentChallenge + 1}/3</Badge>
              </div>

              {currentChallenge < challenges.length && (
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">{challenges[currentChallenge].question}</h3>

                  {renderPieChart(challenges[currentChallenge].visual.num, challenges[currentChallenge].visual.den)}

                  <div className="flex gap-2 justify-center">
                    <Button
                      onClick={() => {
                        setGameScore(gameScore + 10)
                        setCurrentChallenge(currentChallenge + 1)
                      }}
                    >
                      {challenges[currentChallenge].answer}
                    </Button>
                    <Button variant="outline">1/5</Button>
                    <Button variant="outline">2/3</Button>
                  </div>
                </div>
              )}

              {currentChallenge >= challenges.length && (
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-green-600">Congratulations! 🎉</h3>
                  <p>You completed all challenges!</p>
                  <p className="text-lg">Final Score: {gameScore} points</p>
                  <Button
                    onClick={() => {
                      setCurrentChallenge(0)
                      setGameScore(0)
                    }}
                  >
                    Play Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compare" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fraction Comparison</CardTitle>
              <CardDescription>Compare fractions side by side to see which is larger</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="text-center">
                  {renderPieChart(numerator, denominator)}
                  <p className="mt-2 font-semibold">
                    {numerator}/{denominator}
                  </p>
                  <p className="text-sm text-gray-600">= {((numerator / denominator) * 100).toFixed(1)}%</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {numerator / denominator > fraction2Num / fraction2Den
                      ? ">"
                      : numerator / denominator < fraction2Num / fraction2Den
                        ? "<"
                        : "="}
                  </div>
                </div>

                <div className="text-center">
                  {renderPieChart(fraction2Num, fraction2Den, "fill-green-500")}
                  <p className="mt-2 font-semibold">
                    {fraction2Num}/{fraction2Den}
                  </p>
                  <p className="text-sm text-gray-600">= {((fraction2Num / fraction2Den) * 100).toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
