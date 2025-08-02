"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
// import ThemeToggle from "./components/ThemeToggle/page";

const data = [
  { month: "Jan", Applications: 30, Shortlisted: 10, Rejected: 5 },
  { month: "Feb", Applications: 50, Shortlisted: 20, Rejected: 8 },
  { month: "Mar", Applications: 45, Shortlisted: 25, Rejected: 6 },
  { month: "Apr", Applications: 70, Shortlisted: 30, Rejected: 10 },
  { month: "May", Applications: 60, Shortlisted: 35, Rejected: 7 },
  { month: "Jun", Applications: 80, Shortlisted: 40, Rejected: 15 },
  { month: "Jul", Applications: 90, Shortlisted: 50, Rejected: 20 },
  { month: "Aug", Applications: 100, Shortlisted: 60, Rejected: 25 },
  { month: "Sep", Applications: 120, Shortlisted: 70, Rejected: 30 },
  { month: "Oct", Applications: 110, Shortlisted: 65, Rejected: 28 },
  { month: "Nov", Applications: 130, Shortlisted: 80, Rejected: 35 },
  { month: "Dec", Applications: 150, Shortlisted: 90, Rejected: 40 },
];

const pieData = [
  { name: "Applications", value: 342 },
  { name: "Shortlisted", value: 57 },
  { name: "Rejected", value: 12 },
];

const pieColors = ["#4f46e5", "#10b981", "#ef4444"];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 md:p-10 transition-colors duration-300 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
          Job Provider Dashboard
        </h1>
        {/* <ThemeToggle /> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            title: "Applications",
            value: "342",
            bg: "bg-blue-50 dark:bg-blue-900/20",
            text: "text-blue-600 dark:text-blue-400",
            border: "border-blue-100 dark:border-blue-800",
          },
          {
            title: "Jobs Posted",
            value: "15",
            bg: "bg-indigo-50 dark:bg-indigo-900/20",
            text: "text-indigo-600 dark:text-indigo-400",
            border: "border-indigo-100 dark:border-indigo-800",
          },
          {
            title: "Shortlisted",
            value: "57",
            bg: "bg-green-50 dark:bg-green-900/20",
            text: "text-green-600 dark:text-green-400",
            border: "border-green-100 dark:border-green-800",
          },
          {
            title: "Rejected",
            value: "12",
            bg: "bg-red-50 dark:bg-red-900/20",
            text: "text-red-600 dark:text-red-400",
            border: "border-red-100 dark:border-red-800",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className={`${stat.bg} p-4 rounded-lg border-2 ${stat.border}`}
          >
            <p className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-1">
              {stat.title}
            </p>
            <p className={`text-xl font-semibold ${stat.text}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 px-2 sm:px-0">
        <section className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Applications Overview
          </h3>
          <div className="h-72 max-h-[300px] sm:max-h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    fontSize: "12px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Applications"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Shortlisted"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Rejected"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Overall Distribution
          </h3>
          <div className="h-72 max-h-[300px] sm:max-h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Recent Activity */}
      <section className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <h3 className="text-md font-bold text-gray-800 dark:text-gray-100 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {[
            { text: "Robin Studios has 6 available positions for you" },
            { text: "DevInc invited you to interview tomorrow" },
            {
              text: "Highlighted Design team hired 2 positions from your post",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-1 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <p className="text-md text-gray-700 dark:text-gray-200">
                {activity.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
