import React, { useState } from "react";
import SleepChart from "./SleepChart";
import { SlideUpTransition, StaggeredChildren } from "./Transition";
import { Calendar, Clock, Droplets, Moon, Thermometer, Volume2, Wind } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface SleepDashboardProps {
  className?: string;
  show: boolean;
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  unit: string;
  color: string;
  trend?: {
    value: number;
    positive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, unit, color, trend }) => {
  return (
    <div className="glass rounded-xl p-5 border border-sleep-100/80 card-hover">
      <div className="flex justify-between items-start mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        {trend && (
          <div className={cn(
            "text-xs font-medium px-2 py-1 rounded-full flex items-center",
            trend.positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}>
            <span>{trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-sleep-600 mb-1">{label}</h3>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-sleep-800">{value}</span>
        <span className="ml-1 text-sm text-sleep-500">{unit}</span>
      </div>
    </div>
  );
};

const SLEEP_STATS = [
  {
    icon: Clock,
    label: 'Average Sleep Time',
    value: '7.4',
    unit: 'hours',
    color: 'bg-sleep-300',
    trend: { value: 8, positive: true }
  },
  {
    icon: Thermometer,
    label: 'Temperature',
    value: '21',
    unit: '°C',
    color: 'bg-orange-500',
  },
  {
    icon: Droplets,
    label: 'Humidity',
    value: '45',
    unit: '%',
    color: 'bg-blue-500',
  },
  {
    icon: Volume2,
    label: 'Sound Level',
    value: '32',
    unit: 'dB',
    color: 'bg-violet-500',
    trend: { value: 5, positive: false }
  },
  {
    icon: Wind,
    label: 'Air Quality',
    value: '96',
    unit: 'AQI',
    color: 'bg-emerald-500',
  },
  {
    icon: Moon,
    label: 'Sleep Quality',
    value: '87',
    unit: '%',
    color: 'bg-indigo-500',
    trend: { value: 12, positive: true }
  }
];

const SleepDashboard: React.FC<SleepDashboardProps> = ({ className, show }) => {
  const [overlayCharts, setOverlayCharts] = useState(false);

  const toggleOverlay = () => {
    setOverlayCharts(prev => !prev);
  };

  return (
    <div className={cn("p-8", className)}>
      <SlideUpTransition show={show} className="mb-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-sleep-800 mb-2">Your personalized sleep solution</h2>
          <p className="text-sleep-600 max-w-2xl">
            Monitor and optimize your sleep environment with real-time data tracking and personalized recommendations.
          </p>
        </div>
      </SlideUpTransition>

      <SlideUpTransition show={show} className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-sleep-800">Sleep Analytics</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleOverlay}
            className="text-sleep-600"
          >
            {overlayCharts ? "Separate Charts" : "Overlay Charts"}
          </Button>
        </div>
        <SleepChart overlayCharts={overlayCharts} />
      </SlideUpTransition>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-sleep-800 mb-6">Quick Stats</h3>
        <StaggeredChildren show={show} staggerDelay={100} className="grid grid-cols-2 gap-5">
          {SLEEP_STATS.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </StaggeredChildren>
      </div>
    </div>
  );
};

export default SleepDashboard;
