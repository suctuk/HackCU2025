import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from "recharts";
import { format, subDays } from "date-fns";
import { cn } from "@/lib/utils";

// Generate sample sleep data
const generateSampleData = (days = 14) => {
  const today = new Date();
  const data = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(today, i);
    data.push({
      date: format(date, "MMM dd"),
      timestamp: date.getTime(),
      light: Math.floor(Math.random() * 150) + 50, // 50-200 lux
      sound: Math.floor(Math.random() * 30) + 20, // 20-50 dB
      temperature: Math.floor(Math.random() * 5) + 18, // 18-23°C
      humidity: Math.floor(Math.random() * 20) + 40, // 40-60%
      airQuality: Math.floor(Math.random() * 100) + 50, // 50-150 AQI
      sleepTime: Math.floor(Math.random() * 3) + 6, // 6-9 hours
    });
  }

  return data;
};

// Move sample data generation outside the component
const initialData = generateSampleData();

type MetricType = 'light' | 'sound' | 'temperature' | 'humidity' | 'airQuality' | 'sleepTime';

const metricLabels: Record<MetricType, string> = {
  light: 'Light (lux)',
  sound: 'Sound (dB)',
  temperature: 'Temperature (°C)',
  humidity: 'Humidity (%)',
  airQuality: 'Air Quality (AQI)',
  sleepTime: 'Sleep Time (hours)'
};

interface SleepChartProps {
  className?: string;
  overlayCharts?: boolean;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg p-3 shadow-lg border border-sleep-200/50 text-sm">
        <p className="font-medium text-sleep-800 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sleep-700">
            <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const SleepChart: React.FC<SleepChartProps> = ({ className, overlayCharts = false }) => {
  const [activeMetric, setActiveMetric] = useState<MetricType>('sleepTime');
  // Use the initialData instead of generating new data on each render
  const data = initialData;

  const metrics: MetricType[] = ['sleepTime', 'light', 'sound', 'temperature', 'humidity', 'airQuality'];
  
  const metricColors: Record<MetricType, string> = {
    light: '#FFB547',
    sound: '#5271FF',
    temperature: '#FF5757',
    humidity: '#54C5EB',
    airQuality: '#32D583',
    sleepTime: '#9b87f5'
  };

  return (
    <div className={cn("rounded-xl p-5 glass border border-sleep-100/80", className)}>
      <div className="flex flex-col mb-6">
        <h3 className="text-lg font-semibold text-sleep-800 mb-4">Sleep Analytics</h3>
        
        <div className="flex flex-wrap gap-2">
          {metrics.map((metric) => (
            <button
              key={metric}
              onClick={() => setActiveMetric(metric)}
              className={cn(
                "px-3 py-1.5 text-sm rounded-full transition-all",
                activeMetric === metric 
                  ? "bg-sleep-300 text-white shadow-sm" 
                  : "bg-sleep-100 text-sleep-700 hover:bg-sleep-200 hover:text-sleep-800"
              )}
            >
              {metricLabels[metric]}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#333333' }}
              tickLine={{ stroke: '#eaeaea' }}
              axisLine={{ stroke: '#eaeaea' }}
            />
            <YAxis 
              tick={{ fill: '#333333' }}
              tickLine={{ stroke: '#eaeaea' }}
              axisLine={{ stroke: '#eaeaea' }}
            />
            <Tooltip content={<CustomTooltip />} />
            {overlayCharts ? (
              // Render all metrics when in overlay mode
              metrics.map((metric) => (
                <Line
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  name={metricLabels[metric]}
                  stroke={metricColors[metric]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0, fill: metricColors[metric] }}
                  animationDuration={1000}
                  opacity={0.8}
                />
              ))
            ) : (
              // Render only the active metric when not in overlay mode
              <Line
                type="monotone"
                dataKey={activeMetric}
                name={metricLabels[activeMetric]}
                stroke={metricColors[activeMetric]}
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                activeDot={{ r: 6, strokeWidth: 0, fill: metricColors[activeMetric] }}
                animationDuration={1000}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SleepChart;
