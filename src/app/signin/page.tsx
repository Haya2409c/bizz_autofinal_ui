"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthCard from "@/components/AuthCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SignIn = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Fields",
        description: "Please enter email and password",
        variant: "destructive",
      });
      return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmail.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      toast({
        title: "Welcome Back!",
        description: "Signed in successfully",
      });

      if (formData.remember) {
        localStorage.setItem("user_email", formData.email);
      } else {
        localStorage.removeItem("user_email");
      }

      router.push("/dashboard");
      setLoading(false);
    }, 1500);
  };

  return (
    <AuthCard
      title="AutoBiz"
      description="AI-Powered Business Automation Platform"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div className="space-y-1">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="trader@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

     {/* PASSWORD */}
        <div className="space-y-1">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="h-11 bg-gray-100 border border-gray-200 focus:bg-white"
          />
        </div>

        {/* Remember Me */}
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={formData.remember}
            onCheckedChange={(val) =>
              setFormData({ ...formData, remember: val as boolean })
            }
          />
          <Label className="cursor-pointer">Remember me</Label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        {/* Link */}
        <div className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/signUp")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="p-3 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg text-center text-xs">
          Demo: any email / any password
        </div>
      </form>
    </AuthCard>
  );
};

export default SignIn;
