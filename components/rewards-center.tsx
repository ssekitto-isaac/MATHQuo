"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Gift, Zap, Target, Award, ShoppingCart } from "lucide-react"

interface RewardsCenterProps {
  rewards: any
  updateRewards: (rewards: any) => void
}

export default function RewardsCenter({ rewards, updateRewards }: RewardsCenterProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const shopItems = [
    {
      id: 1,
      name: "Golden Calculator",
      description: "A shiny calculator that gives +10% XP bonus",
      price: 500,
      currency: "coins",
      icon: "🧮",
      type: "boost",
    },
    {
      id: 2,
      name: "Wisdom Scroll",
      description: "Reveals hints for free in the next 5 questions",
      price: 25,
      currency: "gems",
      icon: "📜",
      type: "consumable",
    },
    {
      id: 3,
      name: "Rainbow Theme",
      description: "Unlock colorful rainbow theme for your dashboard",
      price: 300,
      currency: "coins",
      icon: "🌈",
      type: "cosmetic",
    },
    {
      id: 4,
      name: "Double XP Potion",
      description: "Double XP for the next 10 questions answered",
      price: 40,
      currency: "gems",
      icon: "⚗️",
      type: "boost",
    },
    {
      id: 5,
      name: "Math Crown",
      description: "Show off your math mastery with this royal crown",
      price: 1000,
      currency: "coins",
      icon: "👑",
      type: "cosmetic",
    },
    {
      id: 6,
      name: "Lightning Bolt",
      description: "Skip one difficult question without penalty",
      price: 15,
      currency: "gems",
      icon: "⚡",
      type: "consumable",
    },
  ]

  const achievements = [
    {
      id: 7,
      name: "Streak Master",
      icon: "🔥",
      description: "Maintain a 14-day learning streak",
      requirement: "14 day streak",
      earned: false,
      progress: 7,
      maxProgress: 14,
    },
    {
      id: 8,
      name: "Speed Enhancer",
      icon: "🏎️",
      description: "Answer 20 questions in under 5 minutes",
      requirement: "Speed challenge",
      earned: false,
      progress: 12,
      maxProgress: 20,
    },
    {
      id: 9,
      name: "Perfectionist",
      icon: "💎",
      description: "Get 100% accuracy on any topic quiz",
      requirement: "Perfect score",
      earned: false,
      progress: 0,
      maxProgress: 1,
    },
    {
      id: 10,
      name: "Knowledge Seeker",
      icon: "📚",
      description: "Complete all topics at least once",
      requirement: "Complete all topics",
      earned: false,
      progress: 2,
      maxProgress: 4,
    },
  ]

  const purchaseItem = (item: any) => {
    const canAfford = item.currency === "coins" ? rewards.coins >= item.price : rewards.gems >= item.price

    if (canAfford) {
      const newRewards = {
        ...rewards,
        [item.currency]: rewards[item.currency] - item.price,
      }
      updateRewards(newRewards)
      setSelectedItem({ ...item, purchased: true })
    }
  }

  return (
    <div className="space-y-6">
      {/* Currency Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
            <div className="text-3xl font-bold text-yellow-600">{rewards.coins}</div>
            <div className="text-sm text-gray-600">Coins</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Gift className="w-12 h-12 mx-auto mb-4 text-purple-500" />
            <div className="text-3xl font-bold text-purple-600">{rewards.gems}</div>
            <div className="text-sm text-gray-600">Gems</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-orange-500" />
            <div className="text-3xl font-bold text-orange-600">
              {rewards.badges.filter((b: any) => b.earned).length}
            </div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="badges" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="shop">Shop</TabsTrigger>
          <TabsTrigger value="streaks">Streaks</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Badge Collection
              </CardTitle>
              <CardDescription>Your earned badges and progress toward new ones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {rewards.badges.map((badge: any) => (
                  <Card
                    key={badge.id}
                    className={`p-4 text-center transition-all ${
                      badge.earned
                        ? "border-yellow-200 bg-yellow-50 shadow-lg scale-105"
                        : "border-gray-200 bg-gray-50 opacity-60"
                    }`}
                  >
                    <div className="text-4xl mb-3">{badge.icon}</div>
                    <div className={`text-sm font-medium mb-2 ${badge.earned ? "text-yellow-700" : "text-gray-500"}`}>
                      {badge.name}
                    </div>
                    <div className={`text-xs ${badge.earned ? "text-yellow-600" : "text-gray-400"}`}>
                      {badge.description}
                    </div>
                    {badge.earned && (
                      <Badge variant="secondary" className="mt-2">
                        Earned!
                      </Badge>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Achievement Progress
              </CardTitle>
              <CardDescription>Track your progress toward special achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{achievement.name}</h3>
                          <Badge variant={achievement.earned ? "default" : "outline"}>
                            {achievement.earned ? "Completed" : "In Progress"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shop" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Reward Shop
              </CardTitle>
              <CardDescription>Spend your coins and gems on useful items and cosmetics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {shopItems.map((item) => {
                  const canAfford = item.currency === "coins" ? rewards.coins >= item.price : rewards.gems >= item.price

                  return (
                    <Card key={item.id} className={`p-4 ${!canAfford ? "opacity-60" : ""}`}>
                      <div className="text-center space-y-3">
                        <div className="text-4xl">{item.icon}</div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-bold text-lg">{item.price}</span>
                          {item.currency === "coins" ? (
                            <Star className="w-5 h-5 text-yellow-500" />
                          ) : (
                            <Gift className="w-5 h-5 text-purple-500" />
                          )}
                        </div>
                        <Button
                          onClick={() => purchaseItem(item)}
                          disabled={!canAfford}
                          className="w-full"
                          variant={canAfford ? "default" : "outline"}
                        >
                          {canAfford ? "Purchase" : "Not enough " + item.currency}
                        </Button>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {selectedItem?.purchased && (
            <Card className="border-2 border-green-400 bg-green-50">
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4">{selectedItem.icon}</div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">Purchase Successful!</h3>
                <p className="text-green-600">You've purchased {selectedItem.name}!</p>
                <Button variant="outline" className="mt-4" onClick={() => setSelectedItem(null)}>
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="streaks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Learning Streaks
              </CardTitle>
              <CardDescription>Maintain your daily learning habit for amazing rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-4">🔥</div>
                <div className="text-4xl font-bold text-orange-500 mb-2">{rewards.streaks.current}</div>
                <div className="text-lg text-gray-600 mb-4">Day Streak</div>
                <Badge variant="secondary" className="text-lg p-2">
                  Best: {rewards.streaks.longest} days
                </Badge>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Streak Rewards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🎯</div>
                      <h4 className="font-semibold">7 Day Streak</h4>
                      <p className="text-sm text-gray-600">+50 Bonus Coins</p>
                      <Badge variant={rewards.streaks.current >= 7 ? "default" : "outline"} className="mt-2">
                        {rewards.streaks.current >= 7 ? "Earned!" : `${7 - rewards.streaks.current} days to go`}
                      </Badge>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center">
                      <div className="text-2xl mb-2">💎</div>
                      <h4 className="font-semibold">14 Day Streak</h4>
                      <p className="text-sm text-gray-600">+10 Gems + Special Badge</p>
                      <Badge variant={rewards.streaks.current >= 14 ? "default" : "outline"} className="mt-2">
                        {rewards.streaks.current >= 14 ? "Earned!" : `${14 - rewards.streaks.current} days to go`}
                      </Badge>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center">
                      <div className="text-2xl mb-2">👑</div>
                      <h4 className="font-semibold">30 Day Streak</h4>
                      <p className="text-sm text-gray-600">Exclusive Crown + 200 Coins</p>
                      <Badge variant={rewards.streaks.current >= 30 ? "default" : "outline"} className="mt-2">
                        {rewards.streaks.current >= 30 ? "Earned!" : `${30 - rewards.streaks.current} days to go`}
                      </Badge>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🌟</div>
                      <h4 className="font-semibold">100 Day Streak</h4>
                      <p className="text-sm text-gray-600">Legendary Status + 1000 Coins</p>
                      <Badge variant={rewards.streaks.current >= 100 ? "default" : "outline"} className="mt-2">
                        {rewards.streaks.current >= 100 ? "Earned!" : `${100 - rewards.streaks.current} days to go`}
                      </Badge>
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
