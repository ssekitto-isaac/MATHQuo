"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shapes, Ruler, Calculator, Eye } from "lucide-react"

export default function GeometryExplorer() {
  const [selectedShape, setSelectedShape] = useState("triangle")
  const [dimensions, setDimensions] = useState({ width: 100, height: 80, radius: 60 })
  const [showFormulas, setShowFormulas] = useState(false)

  const shapes = {
    triangle: {
      name: "Triangle",
      color: "#3b82f6",
      area: (w: number, h: number) => (w * h) / 2,
      perimeter: (w: number, h: number) => w + h + Math.sqrt(w * w + h * h),
      formula: "Area = (base × height) ÷ 2",
    },
    rectangle: {
      name: "Rectangle",
      color: "#10b981",
      area: (w: number, h: number) => w * h,
      perimeter: (w: number, h: number) => 2 * (w + h),
      formula: "Area = length × width",
    },
    circle: {
      name: "Circle",
      color: "#f59e0b",
      area: (r: number) => Math.PI * r * r,
      perimeter: (r: number) => 2 * Math.PI * r,
      formula: "Area = π × radius²",
    },
    square: {
      name: "Square",
      color: "#8b5cf6",
      area: (s: number) => s * s,
      perimeter: (s: number) => 4 * s,
      formula: "Area = side²",
    },
  }

  const renderShape = (shape: string, size = 200) => {
    const { width, height, radius } = dimensions
    const scale = size / 200

    switch (shape) {
      case "triangle":
        return (
          <svg width={size} height={size} viewBox="0 0 200 200" className="mx-auto">
            <polygon
              points={`100,20 20,180 180,180`}
              fill={shapes.triangle.color}
              fillOpacity="0.7"
              stroke={shapes.triangle.color}
              strokeWidth="2"
            />
            {showFormulas && (
              <>
                <line x1="20" y1="180" x2="180" y2="180" stroke="#000" strokeWidth="1" strokeDasharray="5,5" />
                <text x="100" y="195" textAnchor="middle" fontSize="12">
                  base
                </text>
                <line x1="100" y1="20" x2="100" y2="180" stroke="#000" strokeWidth="1" strokeDasharray="5,5" />
                <text x="110" y="100" fontSize="12">
                  height
                </text>
              </>
            )}
          </svg>
        )

      case "rectangle":
        return (
          <svg width={size} height={size} viewBox="0 0 200 200" className="mx-auto">
            <rect
              x="30"
              y="60"
              width="140"
              height="80"
              fill={shapes.rectangle.color}
              fillOpacity="0.7"
              stroke={shapes.rectangle.color}
              strokeWidth="2"
            />
            {showFormulas && (
              <>
                <text x="100" y="155" textAnchor="middle" fontSize="12">
                  width
                </text>
                <text x="20" y="105" textAnchor="middle" fontSize="12" transform="rotate(-90, 20, 105)">
                  height
                </text>
              </>
            )}
          </svg>
        )

      case "circle":
        return (
          <svg width={size} height={size} viewBox="0 0 200 200" className="mx-auto">
            <circle
              cx="100"
              cy="100"
              r="70"
              fill={shapes.circle.color}
              fillOpacity="0.7"
              stroke={shapes.circle.color}
              strokeWidth="2"
            />
            {showFormulas && (
              <>
                <line x1="100" y1="100" x2="170" y2="100" stroke="#000" strokeWidth="1" strokeDasharray="5,5" />
                <text x="135" y="95" fontSize="12">
                  radius
                </text>
              </>
            )}
          </svg>
        )

      case "square":
        return (
          <svg width={size} height={size} viewBox="0 0 200 200" className="mx-auto">
            <rect
              x="50"
              y="50"
              width="100"
              height="100"
              fill={shapes.square.color}
              fillOpacity="0.7"
              stroke={shapes.square.color}
              strokeWidth="2"
            />
            {showFormulas && (
              <>
                <text x="100" y="165" textAnchor="middle" fontSize="12">
                  side
                </text>
                <text x="40" y="105" textAnchor="middle" fontSize="12" transform="rotate(-90, 40, 105)">
                  side
                </text>
              </>
            )}
          </svg>
        )

      default:
        return null
    }
  }

  const calculateArea = () => {
    const shape = shapes[selectedShape as keyof typeof shapes]
    if (selectedShape === "circle") {
      return shape.area(dimensions.radius).toFixed(2)
    } else if (selectedShape === "square") {
      return shape.area(dimensions.width).toFixed(2)
    } else {
      return shape.area(dimensions.width, dimensions.height).toFixed(2)
    }
  }

  const calculatePerimeter = () => {
    const shape = shapes[selectedShape as keyof typeof shapes]
    if (selectedShape === "circle") {
      return shape.perimeter(dimensions.radius).toFixed(2)
    } else if (selectedShape === "square") {
      return shape.perimeter(dimensions.width).toFixed(2)
    } else {
      return shape.perimeter(dimensions.width, dimensions.height).toFixed(2)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="explorer" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="explorer">Shape Explorer</TabsTrigger>
          <TabsTrigger value="calculator">Area Calculator</TabsTrigger>
          <TabsTrigger value="compare">Compare Shapes</TabsTrigger>
        </TabsList>

        <TabsContent value="explorer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shapes className="w-5 h-5" />
                Interactive Shape Explorer
              </CardTitle>
              <CardDescription>Explore different geometric shapes and their properties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2 flex-wrap">
                {Object.entries(shapes).map(([key, shape]) => (
                  <Button
                    key={key}
                    variant={selectedShape === key ? "default" : "outline"}
                    onClick={() => setSelectedShape(key)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: shape.color }} />
                    {shape.name}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-center">{renderShape(selectedShape)}</div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowFormulas(!showFormulas)}>
                      <Eye className="w-4 h-4 mr-2" />
                      {showFormulas ? "Hide" : "Show"} Labels
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      {shapes[selectedShape as keyof typeof shapes].name} Properties
                    </h3>

                    {selectedShape !== "circle" && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">
                            {selectedShape === "square" ? "Side" : "Width"}: {dimensions.width}
                          </label>
                          <Slider
                            value={[dimensions.width]}
                            onValueChange={(value) => setDimensions({ ...dimensions, width: value[0] })}
                            max={150}
                            min={50}
                            step={5}
                            className="mt-2"
                          />
                        </div>

                        {selectedShape !== "square" && (
                          <div>
                            <label className="text-sm font-medium">Height: {dimensions.height}</label>
                            <Slider
                              value={[dimensions.height]}
                              onValueChange={(value) => setDimensions({ ...dimensions, height: value[0] })}
                              max={120}
                              min={40}
                              step={5}
                              className="mt-2"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {selectedShape === "circle" && (
                      <div>
                        <label className="text-sm font-medium">Radius: {dimensions.radius}</label>
                        <Slider
                          value={[dimensions.radius]}
                          onValueChange={(value) => setDimensions({ ...dimensions, radius: value[0] })}
                          max={90}
                          min={30}
                          step={5}
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium">Area:</span>
                      <Badge variant="secondary">{calculateArea()} units²</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Perimeter:</span>
                      <Badge variant="secondary">{calculatePerimeter()} units</Badge>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      <strong>Formula:</strong> {shapes[selectedShape as keyof typeof shapes].formula}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Area & Perimeter Calculator
              </CardTitle>
              <CardDescription>Calculate area and perimeter for different shapes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(shapes).map(([key, shape]) => (
                  <Card key={key} className="p-4">
                    <div className="text-center space-y-3">
                      {renderShape(key, 120)}
                      <h3 className="font-semibold">{shape.name}</h3>
                      <div className="text-sm space-y-1">
                        <div>
                          Area:{" "}
                          <Badge variant="outline">
                            {key === "circle"
                              ? shape.area(60).toFixed(1)
                              : key === "square"
                                ? shape.area(80).toFixed(1)
                                : shape.area(100, 80).toFixed(1)}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-600">{shape.formula}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compare" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="w-5 h-5" />
                Shape Comparison
              </CardTitle>
              <CardDescription>Compare areas and perimeters of different shapes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Area Comparison</h3>
                  <div className="space-y-2">
                    {Object.entries(shapes).map(([key, shape]) => {
                      const area =
                        key === "circle" ? shape.area(60) : key === "square" ? shape.area(80) : shape.area(100, 80)

                      return (
                        <div key={key} className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: shape.color }} />
                          <span className="flex-1">{shape.name}</span>
                          <Badge variant="outline">{area.toFixed(1)} units²</Badge>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Perimeter Comparison</h3>
                  <div className="space-y-2">
                    {Object.entries(shapes).map(([key, shape]) => {
                      const perimeter =
                        key === "circle"
                          ? shape.perimeter(60)
                          : key === "square"
                            ? shape.perimeter(80)
                            : shape.perimeter(100, 80)

                      return (
                        <div key={key} className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: shape.color }} />
                          <span className="flex-1">{shape.name}</span>
                          <Badge variant="outline">{perimeter.toFixed(1)} units</Badge>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
