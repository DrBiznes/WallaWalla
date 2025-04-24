import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Label
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Historical data for winery growth in Walla Walla
const wineryGrowthData = [
  { year: 1980, wineries: 1 },
  { year: 1990, wineries: 6 },
  { year: 2000, wineries: 23 },
  { year: 2010, wineries: 85 },
  { year: 2017, wineries: 120 },
  { year: 2021, wineries: 140 },
  { year: 2024, wineries: 130 },
];

// Population data for comparison
const populationData = [
  {
    name: "Permanent Residents",
    count: 33000,
    color: "#8884d8"
  },
  {
    name: "Annual Tourists",
    count: 580000,
    color: "#ffc658"
  }
];

// College enrollment data
const collegeData = [
  {
    name: "Whitman College",
    students: 1523,
    color: "#82ca9d"
  },
  {
    name: "Walla Walla University",
    students: 1432,
    color: "#ff7300"
  },
  {
    name: "Walla Walla Community College",
    students: 2662,
    color: "#0088fe"
  }
];

// College comparative pie chart data
const collegePieData = [
  { name: "Whitman College", value: 1523, color: "#82ca9d" },
  { name: "Walla Walla University", value: 1432, color: "#ff7300" },
  { name: "Walla Walla Community College", value: 2662, color: "#0088fe" }
];

// Format large numbers with commas
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const PopulationDynamicsChart = () => {
  // Calculate total college students
  const totalCollegeStudents = collegeData.reduce((sum, college) => sum + college.students, 0);
  
  // State for tracking viewport width
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("population");
  
  // Effect to check viewport width on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is common breakpoint for mobile
    };
    
    // Set initial value
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const handleSelectionChange = (value) => {
    setActiveTab(value);
  };
  
  return (
    <div className="w-full rounded-lg border border-border bg-card p-6 shadow-sm mb-8">
      <h3 className="text-xl font-serif font-semibold mb-6 text-center">
        Walla Walla Population Dynamics: Residents, Students & Tourism
      </h3>
      
      {isMobile ? (
        // Mobile: Use Select dropdown instead of tabs
        <div className="mb-6">
          <Select value={activeTab} onValueChange={handleSelectionChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="population">Residents vs. Tourism</SelectItem>
                <SelectItem value="wineries">Winery Growth</SelectItem>
                <SelectItem value="colleges">College Enrollment</SelectItem>
                <SelectItem value="collegePie">College Distribution</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ) : (
        // Desktop: Keep using tabs as before
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="population">Residents vs. Tourism</TabsTrigger>
            <TabsTrigger value="wineries">Winery Growth</TabsTrigger>
            <TabsTrigger value="colleges">College Enrollment</TabsTrigger>
            <TabsTrigger value="collegePie">College Distribution</TabsTrigger>
          </TabsList>
        </Tabs>
      )}
      
      <div className={activeTab === "population" ? "block mt-6" : "hidden"}>
        <div className="h-[500px]">
          <h4 className="text-lg font-medium text-center mb-4">
            Annual Population Flow (2023-2024)
          </h4>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={populationData}
              margin={{ top: 20, right: 30, left: 30, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={0} textAnchor="middle" />
              <YAxis tickFormatter={(value) => `${value / 1000}k`}>
                <Label
                  value="Number of People"
                  position="insideLeft"
                  angle={-90}
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <Tooltip 
                formatter={(value) => formatNumber(Number(value))}
                labelStyle={{ color: '#333' }} 
              />
              <Legend />
              <Bar dataKey="count" name="Population Count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-muted-foreground text-center mt-4">
            While permanent residents number around 33,000, annual tourists exceed 580,000 visitors
          </p>
        </div>
      </div>
      
      <div className={activeTab === "wineries" ? "block mt-6" : "hidden"}>
        <div className="h-[500px]">
          <h4 className="text-lg font-medium text-center mb-4">
            Growth of Wineries in Walla Walla Valley (1980-2024)
          </h4>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart
              data={wineryGrowthData}
              margin={{ top: 20, right: 30, left: 30, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                angle={0} 
                textAnchor="middle"
                ticks={[1980, 1990, 2000, 2010, 2017, 2024]}
              />
              <YAxis>
                <Label
                  value="Number of Wineries"
                  position="insideLeft"
                  angle={-90}
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <Tooltip 
                formatter={(value) => formatNumber(Number(value))}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="wineries" 
                name="Number of Wineries"
                stroke="#ff7300" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-muted-foreground text-center mt-4">
            From a single winery in 1980 to approximately 130 in 2024, showing explosive growth that transformed downtown
          </p>
        </div>
      </div>
      
      <div className={activeTab === "colleges" ? "block mt-6" : "hidden"}>
        <div className="h-[500px]">
          <h4 className="text-lg font-medium text-center mb-4">
            College Enrollment Distribution in Walla Walla (2023-2024)
          </h4>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={collegeData}
              margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis>
                <Label
                  value="Number of Students"
                  position="insideLeft"
                  angle={-90}
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <Tooltip 
                formatter={(value) => formatNumber(Number(value))}
              />
              <Legend />
              <Bar dataKey="students" name="Student Enrollment">
                {collegeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-muted-foreground text-center mt-4">
            Total college student population: {formatNumber(totalCollegeStudents)} ({((totalCollegeStudents/33000)*100).toFixed(1)}% of permanent residents)
          </p>
        </div>
      </div>
      
      <div className={activeTab === "collegePie" ? "block mt-6" : "hidden"}>
        <div className="h-[500px]">
          <h4 className="text-lg font-medium text-center mb-4">
            Comparative College Enrollment (2023-2024)
          </h4>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={collegePieData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={130}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {collegePieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatNumber(Number(value))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-sm text-muted-foreground text-center mt-4">
            Walla Walla Community College represents nearly half of all higher education students in the valley
          </p>
        </div>
      </div>

      <div className="mt-8 text-sm border-t border-border pt-4">
        <h4 className="font-semibold mb-2">Key Insights:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Annual tourists outnumber permanent residents by a ratio of nearly 18:1</li>
          <li>Total college student population ({formatNumber(totalCollegeStudents)}) represents about {((totalCollegeStudents/33000)*100).toFixed(1)}% of permanent residents</li>
          <li>Walla Walla Community College has the largest enrollment with 2,662 students</li>
          <li>Wine industry has grown from 1 winery in 1980 to approximately 130 today</li>
          <li>The wine industry generates an estimated $430 million in business sales annually</li>
          <li>College students across all three institutions make up more than 1/6 of the local population</li>
        </ul>
        <p className="text-xs text-muted-foreground mt-4">
          Data sources: Visit Walla Walla tourism statistics, Walla Walla Wine Alliance, U.S. Census, Data USA, U.S. News & World Report, local economic impact studies
        </p>
      </div>
    </div>
  );
};

export default PopulationDynamicsChart;