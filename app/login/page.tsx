"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Eye, EyeOff, ArrowRight, Shield, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    medicalId: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (formData.medicalId && formData.password) {
      toast.success("Welcome back! Redirecting to dashboard...")
      router.push("/dashboard")
    } else {
      toast.error("Please enter your Medical ID and password")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/medical-healthcare-abstract-pattern.jpg')] opacity-10" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                <Activity className="h-7 w-7" />
              </div>
              <span className="text-2xl font-bold">VitalEdge</span>
            </Link>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Your Health,
              <br />
              <span className="text-white/80">Our Priority</span>
            </h1>
            <p className="text-lg text-white/70 max-w-md">
              Access AI-powered symptom analysis, emergency services, and connect with healthcare providers instantly.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Shield className="h-5 w-5" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="h-4 w-px bg-white/30" />
              <div className="text-sm text-white/80">256-bit Encryption</div>
            </div>
          </div>

          <div className="text-sm text-white/60">&copy; {new Date().getFullYear()} VitalEdge Health Technologies</div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Activity className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">VitalEdge</span>
            </Link>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1 text-center pb-6">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>Sign in with your Medical ID to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medicalId">Medical ID</Label>
                  <Input
                    id="medicalId"
                    placeholder="VE-XXXXXXXX"
                    value={formData.medicalId}
                    onChange={(e) => setFormData({ ...formData, medicalId: e.target.value })}
                    className="h-12"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Your unique VitalEdge Medical ID</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="h-12 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Don&apos;t have an account? </span>
                <Link href="/signup" className="text-primary font-medium hover:underline">
                  Create Medical ID
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-center text-muted-foreground">
                  By signing in, you agree to our{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Access */}
          <div className="mt-6 text-center">
            <Link
              href="/emergency"
              className="inline-flex items-center gap-2 text-emergency font-medium hover:underline"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emergency opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emergency"></span>
              </span>
              Emergency? Access without login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
