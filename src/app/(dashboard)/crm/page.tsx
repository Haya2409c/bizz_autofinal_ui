'use client';

import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Search, Eye, Pencil, Trash2, Bell, Menu } from "lucide-react";
import Sidebar, { NavigationContent } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type Client = {
  name: string;
  company: string;
  phone: string;
  invoices: number;
  pending: number;
  lastContact: string;
};

const dummyClients: Client[] = [
  {
    name: "XYZ Company",
    company: "xyz",
    phone: "+92 321 7654321",
    invoices: 0,
    pending: 0,
    lastContact: "18/10/2025",
  },
  {
    name: "Best Distributors",
    company: "Best Distributors",
    phone: "+92 333 9876543",
    invoices: 0,
    pending: 0,
    lastContact: "18/10/2025",
  },
  {
    name: "ABC Traders",
    company: "ABC Traders",
    phone: "+92 300 1234567",
    invoices: 0,
    pending: 0,
    lastContact: "18/10/2025",
  },
];

export default function CRMPage() {
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = dummyClients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto transition-all duration-300 lg:ml-64">
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
                  <SheetTitle>CRM Navigation</SheetTitle>
                </SheetHeader>
                <NavigationContent setOpen={setOpen} />
              </SheetContent>
            </Sheet>

            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-background"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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

        {/* CRM Title */}
        <div className="p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">CRM</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Manage your clients and relationships
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center">
            + Add Client
          </button>
        </div>

        {/* Table */}
        <div className="px-4 md:px-6 pb-6 overflow-x-auto">
          <table className="min-w-full bg-card rounded-lg border-border border text-sm">
            <thead className="bg-muted text-muted-foreground text-xs md:text-sm">
              <tr>
                <th className="p-3 text-left whitespace-nowrap">Name</th>
                <th className="p-3 text-left whitespace-nowrap">Company</th>
                <th className="p-3 text-left whitespace-nowrap">Phone</th>
                <th className="p-3 text-left whitespace-nowrap">Invoices</th>
                <th className="p-3 text-left whitespace-nowrap">Pending</th>
                <th className="p-3 text-left whitespace-nowrap">Last Contact</th>
                <th className="p-3 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c, i) => (
                <tr
                  key={i}
                  className="border-b border-border hover:bg-muted text-foreground transition"
                >
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.company}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3">{c.invoices}</td>
                  <td className="p-3 text-green-600">Rs {c.pending}</td>
                  <td className="p-3">{c.lastContact}</td>
                  <td className="p-3 flex justify-end gap-2">
                    <Eye className="w-4 h-4 cursor-pointer hover:text-blue-600" />
                    <Pencil className="w-4 h-4 cursor-pointer hover:text-yellow-600" />
                    <Trash2 className="w-4 h-4 cursor-pointer hover:text-red-600" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground text-sm mt-6">
              No clients found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}