
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Medal, Trophy, Award } from "lucide-react";
import { SlideUpTransition } from "@/components/Transition";

// Define the rank types
type RankTier = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

const Rank = () => {
  const [rank, setRank] = useState<RankTier | null>(null);
  const [sleepScore, setSleepScore] = useState(0);

  // Define all possible ranks
  const rankTiers: RankTier[] = [
    { name: "Bronze Insomniac", icon: <Medal className="h-16 w-16" />, color: "text-amber-600" },
    { name: "Silver Eeper", icon: <Medal className="h-16 w-16" />, color: "text-slate-400" },
    { name: "Gold Slumbrr", icon: <Medal className="h-16 w-16" />, color: "text-yellow-400" },
    { name: "Platinum Sleepist", icon: <Trophy className="h-16 w-16" />, color: "text-cyan-300" },
    { name: "Diamond Nap Wizard", icon: <Trophy className="h-16 w-16" />, color: "text-blue-400" },
    { name: "Master Snoozer", icon: <Award className="h-16 w-16" />, color: "text-purple-500" },
    { name: "Top 500 REM God", icon: <Award className="h-16 w-16" />, color: "text-red-500" },
  ];

  useEffect(() => {
    // Generate a random rank on component mount
    const randomRank = rankTiers[Math.floor(Math.random() * rankTiers.length)];
    setRank(randomRank);
    
    // Generate random sleep score between 0 and 100
    const randomScore = Math.floor(Math.random() * 101);
    setSleepScore(0); // Start at 0

    // Animate the score increasing
    const animateScore = () => {
      setSleepScore(prev => {
        if (prev < randomScore) {
          return prev + 1;
        }
        return prev;
      });
    };

    const interval = setInterval(animateScore, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Sleep Rank</h1>
      
      {rank && (
        <SlideUpTransition show={true} className="max-w-md mx-auto">
          <Card className="shadow-lg border-2">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Your Current Rank</CardTitle>
              <CardDescription>Based on your sleep patterns</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 pt-6">
              <div className={`${rank.color} transition-all duration-300 transform hover:scale-110`}>
                {rank.icon}
              </div>
              
              <h2 className={`text-2xl font-bold ${rank.color}`}>{rank.name}</h2>
              
              <div className="w-full space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Sleep Rank (SR)</span>
                  <span className="text-sm font-medium">{sleepScore}/100</span>
                </div>
                <Progress value={sleepScore} className="h-3" />
              </div>
              
              <p className="text-sm text-muted-foreground text-center mt-4">
                Improve your sleep habits to increase your rank and unlock new achievements!
              </p>
            </CardContent>
          </Card>
        </SlideUpTransition>
      )}
    </div>
  );
};

export default Rank;
