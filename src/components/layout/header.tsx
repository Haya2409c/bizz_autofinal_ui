import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, Sparkles, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const navLinks = [
    { href: "/features", label: "Features" },
    { href: "/modules", label: "Modules" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    // initialize theme from localStorage or system preference
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">BA</span>
            </div>
            <span className="text-xl font-bold">BizzAuto</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href={"/signin"}>
            <Button variant="ghost" className="hidden md:inline-flex">
              Sign In
            </Button>
            </Link>

            {/* Theme toggle button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              aria-pressed={theme === "dark"}
              className="hidden sm:inline-flex"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Get Started - always visible, with clear text color */}
            <Link href="/signUp">
              <Button
                className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-[#7C3AED] to-[#EC4899] text-white rounded-md shadow-md hover:brightness-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C3AED]/40"
                aria-label="Get Started Free"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Get Started Free</span>
              </Button>
            </Link>
            
            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium hover:text-primary transition-colors py-2"
                    >
                      {link.label}
                    </a>
                  ))}

                  {/* Mobile theme toggle inside sheet */}
                  <div className="mt-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        toggleTheme();
                        setOpen(false);
                      }}
                      className="w-full justify-start"
                    >
                      {theme === "dark" ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                      {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </Button>
                  </div>

                  <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                    <Link href={"/signin"} onClick={() => setOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        Sign In
                      </Button>
                    </Link>
                    <Button className="w-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] text-white rounded-md shadow-md hover:brightness-95 transition-opacity">
                      <Sparkles className="w-4 h-4 mr-2" />
                      <Link href={"/signUp"}>Get Started Free</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
