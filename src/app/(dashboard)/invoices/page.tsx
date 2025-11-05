"use client";

import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Bell, Menu, Search, Upload, Plus } from "lucide-react";
import Sidebar, { NavigationContent } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type Invoice = {
  id: string;
  client: string;
  date: string;
  dueDate: string;
  amount: number;
  status: string;
};

const dummyInvoices: Invoice[] = [
  {
    id: "INV-001",
    client: "ABC Traders",
    date: "20/10/2025",
    dueDate: "27/10/2025",
    amount: 25000,
    status: "Paid",
  },
  {
    id: "INV-002",
    client: "Best Distributors",
    date: "21/10/2025",
    dueDate: "28/10/2025",
    amount: 48000,
    status: "Pending",
  },
];

export default function InvoicesPage() {
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = dummyInvoices.filter(
    (i) =>
      i.id.toLowerCase().includes(search.toLowerCase()) ||
      i.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto transition-all duration-300 lg:ml-64">
      <header className="border-b bg-card px-4 py-3 flex items-center justify-between sticky top-0 z-40">
  <div className="flex items-center gap-3 flex-1">
    {/* Mobile Sidebar */}
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <SheetHeader className="px-4 py-2 border-b dark:border-gray-800">
          <SheetTitle>Dashboard Navigation</SheetTitle>
        </SheetHeader>
        <NavigationContent setOpen={setOpen} />
      </SheetContent>
    </Sheet>

    {/* Search Bar*/}
    <div className="relative flex-1 max-w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search anything..."
        className="pl-10 w-full bg-background border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      />
    </div>
  </div>

  {/* Right Icons */}
  <div className="flex items-center gap-2 sm:gap-1 ml-3">
    <Button variant="ghost" size="icon" className="relative hover:bg-blue-50 dark:hover:bg-gray-800 transition">
      <Bell className="h-5 w-5" />
      <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-[10px] text-white flex items-center justify-center">
        3
      </span>
    </Button>

    <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover:bg-blue-50 dark:hover:bg-gray-800 transition">
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-blue-500" />
      )}
    </Button>

    <Avatar className="cursor-pointer hover:scale-105 transition-transform duration-200">
      <AvatarFallback className="bg-primary text-primary-foreground">M</AvatarFallback>
    </Avatar>
  </div>
</header>

        {/* Invoices Header */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Invoices</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage and track all your invoices
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button className="flex items-center gap-2 border-border border px-3 py-2 rounded-lg text-foreground hover:bg-muted text-sm">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Upload PDF</span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create Invoice</span>
            </button>
          </div>
        </div>

        {/* AI Parser Section */}
        <div className="px-4 sm:px-6 pb-3">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="font-medium text-primary">AI Invoice Parser</h2>
              <p className="text-sm text-muted-foreground">
                Upload PDF invoices to automatically extract data using AI
              </p>
            </div>
            <button className="
  bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 
  hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 
  text-white 
  px-4 py-1.5 
  rounded-lg 
  text-sm 
  font-medium 
  transition-all duration-500 
  shadow-md hover:shadow-lg
"
>
              Try Now
            </button>
          </div>
        </div>

        {/* Invoice Table / Mobile Cards */}
        <div className="px-4 sm:px-6 overflow-y-auto pb-6 flex-1">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full bg-card rounded-lg border-border border text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="p-3 text-left">Invoice #</th>
                  <th className="p-3 text-left">Client</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Due Date</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((i, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted">
                      <td className="p-3">{i.id}</td>
                      <td className="p-3">{i.client}</td>
                      <td className="p-3">{i.date}</td>
                      <td className="p-3">{i.dueDate}</td>
                      <td className="p-3 text-green-600">
                        Rs {i.amount.toLocaleString()}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            i.status === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {i.status}
                        </span>
                      </td>
                      <td className="p-3 text-right text-blue-600 cursor-pointer">
                        View
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-muted-foreground">
                      No invoices found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-3 md:hidden">
            {filtered.length > 0 ? (
              filtered.map((i, idx) => (
                <div
                  key={idx}
                  className="bg-card border-border border rounded-lg p-4 shadow-sm flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-foreground">{i.id}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        i.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {i.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{i.client}</p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Date: {i.date}</span>
                    <span>Due: {i.dueDate}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-medium text-green-600">
                      Rs {i.amount.toLocaleString()}
                    </span>
                    <button className="text-blue-600 text-sm font-medium">
                      View
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground text-sm">
                No invoices found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}