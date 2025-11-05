"use client";

import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Bell, Menu, Search, MessageCircle, Users, Clock } from "lucide-react";
import Sidebar, { NavigationContent } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type Contact = {
  name: string;
  phone: string;
};

const dummyContacts: Contact[] = [
  { name: "XYZ Company", phone: "+92 321 7654321" },
  { name: "Best Distributors", phone: "+92 333 9876543" },
  { name: "ABC Traders", phone: "+92 300 1234567" },
  { name: "XYZ Company", phone: "+92 321 7654321" },
  { name: "Best Distributors", phone: "+92 333 9876543" },
];

export default function WhatsAppPage() {
  const { theme, toggleTheme } = useTheme();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
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

        {/* WhatsApp Header */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1">
          <h1 className="text-xl md:text-2xl font-bold">WhatsApp Automation</h1>
          <p className="text-muted-foreground mb-6 text-sm md:text-base">
            Manage client communications and automate messages
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-card border-border border rounded-lg p-4 flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-primary" />
              <div>
                <p className="text-muted-foreground text-sm">Messages Sent</p>
                <h2 className="text-lg md:text-xl font-semibold">0</h2>
              </div>
            </div>

            <div className="bg-card border-border border rounded-lg p-4 flex items-center gap-3">
              <Users className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-muted-foreground text-sm">Active Contacts</p>
                <h2 className="text-lg md:text-xl font-semibold">231</h2>
              </div>
            </div>

            <div className="bg-card border-border border rounded-lg p-4 flex items-center gap-3">
              <Clock className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-muted-foreground text-sm">Scheduled</p>
                <h2 className="text-lg md:text-xl font-semibold">0</h2>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button className="
  bg-green-500 
  hover:bg-green-600 
  text-white 
  px-4 py-2 
  rounded-lg 
  text-sm 
  font-medium 
  flex items-center justify-center gap-2 
  transition-colors duration-300
"
>
              Bulk Message
            </button>
            <button className="border-border border px-4 py-2 rounded-lg text-foreground hover:bg-muted text-sm font-medium">
              Schedule Message
            </button>
          </div>

          {/* Messaging Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[65vh]">
            {/* Contacts List */}
            <div className="bg-card border-border border rounded-lg p-4 overflow-y-auto">
              <h2 className="text-foreground font-semibold mb-3">Contacts</h2>
              <ul>
                {dummyContacts.map((c, i) => (
                  <li
                    key={i}
                    onClick={() => setSelectedContact(c)}
                    className={`p-3 rounded-lg cursor-pointer mb-2 transition-colors ${
                      selectedContact?.name === c.name
                        ? "bg-primary/10 border-primary/20 border"
                        : "hover:bg-muted"
                    }`}
                  >
                    <p className="font-medium text-foreground text-sm md:text-base">
                      {c.name}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">{c.phone}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-2 bg-card border-border border rounded-lg flex flex-col justify-center items-center text-muted-foreground text-sm">
              {selectedContact ? (
                <div className="flex flex-col w-full h-full justify-between">
                  {/* Chat Header */}
                  <div className="border-b border-border p-3 md:p-4 bg-muted flex justify-between items-center">
                    <div>
                      <h2 className="font-medium text-foreground text-sm md:text-base">
                        {selectedContact.name}
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        {selectedContact.phone}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      Chat Window
                    </span>
                  </div>

                  {/* Chat Body */}
                  <div className="flex-1 flex items-center justify-center text-gray-400 text-xs md:text-sm px-2 text-center">
                    Message history will appear here
                  </div>

                  {/* Chat Input */}
                  <div className="border-t border-border p-2 md:p-3 flex gap-2 md:gap-3">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 border-border border rounded-lg px-3 py-2 text-sm bg-card"
                    />
                    <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm">
                      Send
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs md:text-sm text-center p-4">
                  Select a contact to start messaging
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}