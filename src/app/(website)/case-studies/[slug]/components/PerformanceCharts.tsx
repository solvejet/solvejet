// src/app/(website)/case-studies/[slug]/components/PerformanceCharts.tsx
'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';

// Sample data for different chart types
const performanceData = [
  { name: 'Week 1', before: 40, after: 60 },
  { name: 'Week 2', before: 45, after: 75 },
  { name: 'Week 3', before: 42, after: 85 },
  { name: 'Week 4', before: 47, after: 90 },
  { name: 'Week 5', before: 50, after: 95 },
  { name: 'Week 6', before: 48, after: 105 },
  { name: 'Week 7', before: 52, after: 115 },
  { name: 'Week 8', before: 53, after: 120 },
];

const conversionData = [
  { name: 'Before', value: 38 },
  { name: 'After', value: 62 },
];

const costReductionData = [
  { name: 'Jan', before: 100, after: 100 },
  { name: 'Feb', before: 105, after: 95 },
  { name: 'Mar', before: 110, after: 85 },
  { name: 'Apr', before: 115, after: 75 },
  { name: 'May', before: 120, after: 70 },
  { name: 'Jun', before: 125, after: 65 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PerformanceCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="chart-container bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Improvement</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="before"
                stroke="#8884d8"
                name="Before Solution"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="after"
                stroke="#82ca9d"
                name="After Solution"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-container bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Cost Reduction Over Time</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={costReductionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={value => [`${value.toString()}%`, '']} />
              <Legend />
              <Area
                type="monotone"
                dataKey="before"
                stroke="#8884d8"
                fill="#8884d8"
                name="Original Cost"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="after"
                stroke="#82ca9d"
                fill="#82ca9d"
                name="Optimized Cost"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-container bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Conversion Rate Improvement</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={conversionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: { name: string; percent: number }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {conversionData.map((_, index) => (
                  <Cell key={`cell-${index.toString()}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-container bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="before"
                name="Before Implementation"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="after"
                name="After Implementation"
                fill="#82ca9d"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCharts;
