"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  Activity,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Shield,
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Heart,
  CheckCircle2,
  Copy,
} from "lucide-react"
import { toast } from "sonner"

type Step = 1 | 2 | 3 | 4

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [generatedMedicalId, setGeneratedMedicalId] = useState("")

  const [formData, setFormData] = useState({
    // Step 1 - Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",

    // Step 2 - Address
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    // Step 3 - Medical Info
    bloodType: "",
    allergies: "",
    medications: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",

    // Step 4 - Security
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreePrivacy: false,
    receiveAlerts: true,
  })

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateMedicalId = () => {
    const prefix = "VE"
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `${prefix}-${timestamp.slice(-4)}${random}`
  }

  const getStepProgress = () => {
    return (step / 4) * 100
  }

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.dateOfBirth) {
          toast.error("Please fill in all required fields")
          return false
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          toast.error("Please enter a valid email address")
          return false
        }
        return true
      case 2:
        if (!formData.address || !formData.city || !formData.state || !formData.zipCode) {
          toast.error("Please fill in your complete address")
          return false
        }
        return true
      case 3:
        if (!formData.emergencyContactName || !formData.emergencyContactPhone) {
          toast.error("Emergency contact information is required")
          return false
        }
        return true
      case 4:
        if (formData.password.length < 8) {
          toast.error("Password must be at least 8 characters")
          return false
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match")
          return false
        }
        if (!formData.agreeTerms || !formData.agreePrivacy) {
          toast.error("Please agree to the terms and privacy policy")
          return false
        }
        return true
      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, 4) as Step)
    }
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1) as Step)
  }

  const handleSubmit = async () => {
    if (!validateStep()) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const medicalId = generateMedicalId()
    setGeneratedMedicalId(medicalId)
    setIsLoading(false)
  }

  const copyMedicalId = () => {
    navigator.clipboard.writeText(generatedMedicalId)
    toast.success("Medical ID copied to clipboard!")
  }

  const stepTitles = {
    1: "Personal Information",
    2: "Address Details",
    3: "Medical Information",
    4: "Create Password",
  }

  const stepDescriptions = {
    1: "Tell us about yourself",
    2: "Where can we reach you?",
    3: "Important health information",
    4: "Secure your account",
  }

  // Success Screen
  if (generatedMedicalId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <Card className="w-full max-w-lg border-0 shadow-xl text-center">
          <CardContent className="pt-10 pb-8">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>

            <h1 className="text-2xl font-bold mb-2">Registration Complete!</h1>
            <p className="text-muted-foreground mb-8">Your VitalEdge Medical ID has been created successfully.</p>

            <div className="bg-muted rounded-xl p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-2">Your Medical ID</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl font-mono font-bold tracking-wider text-primary">{generatedMedicalId}</span>
                <Button variant="ghost" size="icon" onClick={copyMedicalId}>
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Save this ID - you&apos;ll need it to log in</p>
            </div>

            <div className="bg-warning/10 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm font-medium text-warning mb-1">Important</p>
              <p className="text-sm text-muted-foreground">
                Keep your Medical ID safe. It&apos;s your unique identifier for all VitalEdge services and emergency
                situations.
              </p>
            </div>

            <div className="space-y-3">
              <Button className="w-full h-12" onClick={() => router.push("/login")}>
                Continue to Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full h-12 bg-transparent" onClick={() => router.push("/")}>
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-2/5 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/healthcare-technology-abstract.jpg')] opacity-10" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                <Activity className="h-7 w-7" />
              </div>
              <span className="text-2xl font-bold">VitalEdge</span>
            </Link>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold leading-tight mb-4">
                Create Your
                <br />
                Medical ID
              </h1>
              <p className="text-lg text-white/70">
                Your personal health passport for instant access to AI-powered health services.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Secure & Private</p>
                  <p className="text-sm text-white/60">Your data is encrypted and HIPAA compliant</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">24/7 Access</p>
                  <p className="text-sm text-white/60">Emergency services available anytime</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-white/60">
            Already have an account?{" "}
            <Link href="/login" className="text-white underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background overflow-y-auto">
        <div className="w-full max-w-xl">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-6 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Activity className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">VitalEdge</span>
            </Link>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Step {step} of 4</span>
              <span className="text-sm text-muted-foreground">{Math.round(getStepProgress())}% complete</span>
            </div>
            <Progress value={getStepProgress()} className="h-2" />
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">{stepTitles[step]}</CardTitle>
              <CardDescription>{stepDescriptions[step]}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => updateFormData("firstName", e.target.value)}
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => updateFormData("lastName", e.target.value)}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        className="pl-10 h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        className="pl-10 h-11"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Address */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="address"
                        placeholder="123 Main Street, Apt 4B"
                        value={formData.address}
                        onChange={(e) => updateFormData("address", e.target.value)}
                        className="pl-10 min-h-[80px] resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={(e) => updateFormData("city", e.target.value)}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        placeholder="NY"
                        value={formData.state}
                        onChange={(e) => updateFormData("state", e.target.value)}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        placeholder="10001"
                        value={formData.zipCode}
                        onChange={(e) => updateFormData("zipCode", e.target.value)}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select value={formData.country} onValueChange={(value) => updateFormData("country", value)}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="in">India</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Your address helps us locate nearby hospitals and emergency services.
                  </p>
                </div>
              )}

              {/* Step 3: Medical Info */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select value={formData.bloodType} onValueChange={(value) => updateFormData("bloodType", value)}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a+">A+</SelectItem>
                          <SelectItem value="a-">A-</SelectItem>
                          <SelectItem value="b+">B+</SelectItem>
                          <SelectItem value="b-">B-</SelectItem>
                          <SelectItem value="ab+">AB+</SelectItem>
                          <SelectItem value="ab-">AB-</SelectItem>
                          <SelectItem value="o+">O+</SelectItem>
                          <SelectItem value="o-">O-</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allergies">Known Allergies</Label>
                    <Textarea
                      id="allergies"
                      placeholder="e.g., Penicillin, Peanuts, Latex"
                      value={formData.allergies}
                      onChange={(e) => updateFormData("allergies", e.target.value)}
                      className="min-h-[70px] resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      placeholder="e.g., Aspirin 81mg daily, Metformin 500mg twice daily"
                      value={formData.medications}
                      onChange={(e) => updateFormData("medications", e.target.value)}
                      className="min-h-[70px] resize-none"
                    />
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <p className="font-medium mb-3">Emergency Contact *</p>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactName">Contact Name *</Label>
                        <Input
                          id="emergencyContactName"
                          placeholder="Jane Doe"
                          value={formData.emergencyContactName}
                          onChange={(e) => updateFormData("emergencyContactName", e.target.value)}
                          className="h-11"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContactPhone">Phone *</Label>
                          <Input
                            id="emergencyContactPhone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.emergencyContactPhone}
                            onChange={(e) => updateFormData("emergencyContactPhone", e.target.value)}
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContactRelation">Relationship</Label>
                          <Select
                            value={formData.emergencyContactRelation}
                            onValueChange={(value) => updateFormData("emergencyContactRelation", value)}
                          >
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="spouse">Spouse</SelectItem>
                              <SelectItem value="parent">Parent</SelectItem>
                              <SelectItem value="sibling">Sibling</SelectItem>
                              <SelectItem value="child">Child</SelectItem>
                              <SelectItem value="friend">Friend</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Security */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => updateFormData("password", e.target.value)}
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">At least 8 characters with numbers and symbols</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => updateFormData("agreeTerms", checked as boolean)}
                      />
                      <Label htmlFor="agreeTerms" className="text-sm leading-tight cursor-pointer">
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        *
                      </Label>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="agreePrivacy"
                        checked={formData.agreePrivacy}
                        onCheckedChange={(checked) => updateFormData("agreePrivacy", checked as boolean)}
                      />
                      <Label htmlFor="agreePrivacy" className="text-sm leading-tight cursor-pointer">
                        I agree to the{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>{" "}
                        and consent to data processing *
                      </Label>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="receiveAlerts"
                        checked={formData.receiveAlerts}
                        onCheckedChange={(checked) => updateFormData("receiveAlerts", checked as boolean)}
                      />
                      <Label htmlFor="receiveAlerts" className="text-sm leading-tight cursor-pointer">
                        Receive emergency health alerts and updates
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t">
                {step > 1 && (
                  <Button variant="outline" onClick={handleBack} className="flex-1 h-11 bg-transparent">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                )}
                {step < 4 ? (
                  <Button onClick={handleNext} className="flex-1 h-11">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="flex-1 h-11" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Medical ID
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
