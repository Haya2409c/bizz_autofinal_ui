"use client";

import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Bell, Menu, Search } from "lucide-react";
import Sidebar, { NavigationContent } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  DollarSign,
  Users,
  Package,
  MessageSquare,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ===== Sample Chart Data =====
const revenueData = [
  { month: "Jan", revenue: 45000, profit: 10000 },
  { month: "Feb", revenue: 50000, profit: 12000 },
  { month: "Mar", revenue: 47000, profit: 11000 },
  { month: "Apr", revenue: 60000, profit: 14000 },
  { month: "May", revenue: 55000, profit: 13000 },
  { month: "Jun", revenue: 65000, profit: 16000 },
];

const clientData = [
  { month: "Jan", clients: 45 },
  { month: "Feb", clients: 52 },
  { month: "Mar", clients: 58 },
  { month: "Apr", clients: 65 },
  { month: "May", clients: 72 },
  { month: "Jun", clients: 80 },
];

const productData = [
  { name: "Rice Bags", sales: 4500 },
  { name: "Wheat Flour", sales: 3800 },
  { name: "Cooking Oil", sales: 3200 },
  { name: "Sugar", sales: 3000 },
  { name: "Pulses", sales: 2400 },
];

const messageData = [
  { day: "Mon", sent: 45, received: 32 },
  { day: "Tue", sent: 52, received: 38 },
  { day: "Wed", sent: 48, received: 30 },
  { day: "Thu", sent: 60, received: 42 },
  { day: "Fri", sent: 55, received: 37 },
  { day: "Sat", sent: 40, received: 28 },
  { day: "Sun", sent: 30, received: 20 },
];

export default function AnalyticsPage() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("Revenue");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="border-b bg-card px-4 py-3 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <SheetHeader className="px-4 py-2 border-b dark:border-gray-800">
                  <SheetTitle>Analytics Navigation</SheetTitle>
                </SheetHeader>
                <NavigationContent setOpen={setOpen} />
              </SheetContent>
            </Sheet>

            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-background"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">M</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Analytics Content */}
        <div className="p-4 sm:p-6 overflow-x-hidden">
          <h1 className="text-xl sm:text-2xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base">
            Comprehensive business insights and performance metrics
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            {[
              {
                label: "Total Revenue",
                value: "Rs 328K",
                icon: DollarSign,
                change: "+12.5%",
                color: "text-blue-600",
              },
              {
                label: "Client Growth",
                value: "+78",
                icon: Users,
                change: "+18.2%",
                color: "text-green-600",
              },
              {
                label: "Products Sold",
                value: "16,500",
                icon: Package,
                change: "+8.3%",
                color: "text-purple-600",
              },
              {
                label: "Messages Sent",
                value: "324",
                icon: MessageSquare,
                change: "-5.4%",
                color: "text-orange-500",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-card border-border border rounded-lg p-4 hover:shadow-sm transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-muted-foreground text-sm">{item.label}</p>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <h2 className="text-2xl font-semibold">{item.value}</h2>
                <p
                  className={`text-sm mt-1 ${
                    item.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {item.change}
                </p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 overflow-x-auto">
            {["Revenue", "Clients", "Products", "Messages"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full shadow text-sm font-medium ${
                  activeTab === tab
                    ? "bg-blue-600 text-primary-foreground border-primary"
                    : "bg-card text-foreground hover:bg-muted"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ==================== TAB CONTENT ==================== */}

          {/* REVENUE TAB */}
          {activeTab === "Revenue" && (
            <div className="bg-card border-border border rounded-lg p-4 sm:p-6">
              <h2 className="text-foreground font-semibold mb-4">
                Revenue & Profit Trends
              </h2>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="month" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* CLIENTS TAB */}
          {activeTab === "Clients" && (
            <div className="bg-card border-border border rounded-lg p-4 sm:p-6">
              <h2 className="text-foreground font-semibold mb-4">
                Client Growth Over Time
              </h2>

              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={clientData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="month" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="clients"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 5, stroke: "#10b981", strokeWidth: 2, fill: "#10b981" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === "Products" && (
            <div className="bg-card border-border border rounded-lg p-4 sm:p-6">
              <h2 className="text-foreground font-semibold mb-4">
                Product Performance
              </h2>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="name" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* MESSAGES TAB */}
          {activeTab === "Messages" && (
            <div className="bg-card border rounded-lg p-4 sm:p-6">
              <h2 className="text-foreground font-semibold mb-4">
                Message Activity
              </h2>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={messageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="day" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sent" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="received" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}