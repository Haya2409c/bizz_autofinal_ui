"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthCard from "@/components/AuthCard";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.role) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    toast.success("Account created successfully!");
    router.push("/signin");
  };

  return (
    <AuthCard
      title="BizzAuto"
      description="Create your business account"
    >
      <form onSubmit={handleSubmit} className="space-y-5 mt-2">

        {/* FULL NAME */}
        <div className="space-y-1">
          <Label htmlFor="fullName" className="text-sm font-medium">
            Full Name
          </Label>
          <Input
            id="fullName"
            placeholder="Ahmed Khan"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="h-11 bg-gray-100 border border-gray-200 focus:bg-white"
          />
        </div>

        {/* EMAIL */}
        <div className="space-y-1">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="ahmed@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-11 bg-gray-100 border border-gray-200 focus:bg-white"
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

        {/* ROLE */}
        <div className="space-y-1">
          <Label htmlFor="role" className="text-sm font-medium">
            Role
          </Label>
          <Select
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
          >
            <SelectTrigger id="role" className="h-11 bg-gray-100 border border-gray-200 focus:bg-white">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="trader">Trader</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* SUBMIT */}
        <Button
          type="submit"
          className="w-full h-11 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-md"
        >
          Create Account
        </Button>

        {/* FOOTER */}
        <div className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/signin")}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign In
          </button>
        </div>
      </form>
    </AuthCard>
  );
};

export default SignUp;
