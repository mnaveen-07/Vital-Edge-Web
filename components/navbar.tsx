"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, Activity, Wifi, WifiOff, User, ChevronDown, Lightbulb, Cross, Pill, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"

interface NavbarProps {
  isOffline?: boolean
}

export function Navbar({ isOffline = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { t, language } = useLanguage()

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/analyze", label: t("analyze") },
    { href: "/emergency", label: t("emergency") },
    { href: "/hospitals", label: t("hospitals") },
    { href: "/dashboard", label: t("dashboard") },
  ]

  const moreLinks = [
    { href: "/history", label: t("history"), icon: null },
    { href: "/health-tips", label: t("healthTips"), icon: Lightbulb },
    { href: "/first-aid", label: t("firstAid"), icon: Cross },
    { href: "/medications", label: t("medicationReminder"), icon: Pill },
    { href: "/ai-assistant", label: t("aiAssistant"), icon: MessageSquare },
    { href: "/alerts", label: language === "en" ? "Alerts" : language === "ta" ? "எச்சரிக்கைகள்" : "अलर्ट", icon: null },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">VitalEdge</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          {/* More dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground">
                {language === "en" ? "More" : language === "ta" ? "மேலும்" : "अधिक"}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {moreLinks.map((link, index) => (
                <div key={link.href}>
                  <DropdownMenuItem asChild>
                    <Link href={link.href} className="flex items-center gap-2 cursor-pointer">
                      {link.icon && <link.icon className="h-4 w-4" />}
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                  {index === 0 && <DropdownMenuSeparator />}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-3">
          <Badge variant={isOffline ? "secondary" : "outline"} className="hidden items-center gap-1.5 sm:flex">
            {isOffline ? (
              <>
                <WifiOff className="h-3 w-3" />
                {t("offline")}
              </>
            ) : (
              <>
                <Wifi className="h-3 w-3 text-success" />
                {t("online")}
              </>
            )}
          </Badge>

          <div className="hidden lg:flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                {t("login")}
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">
                <User className="mr-1.5 h-4 w-4" />
                {t("signup")}
              </Button>
            </Link>
          </div>

          <Link href="/settings" className="hidden lg:block">
            <Button variant="outline" size="sm" className="bg-transparent">
              {t("settings")}
            </Button>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 overflow-y-auto">
              <div className="flex flex-col gap-4 pt-8">
                <Badge variant={isOffline ? "secondary" : "outline"} className="w-fit flex items-center gap-1.5">
                  {isOffline ? (
                    <>
                      <WifiOff className="h-3 w-3" />
                      {t("offline")}
                    </>
                  ) : (
                    <>
                      <Wifi className="h-3 w-3 text-success" />
                      {t("online")}
                    </>
                  )}
                </Badge>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    {language === "en" ? "Main" : language === "ta" ? "முக்கிய" : "मुख्य"}
                  </p>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-base font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    {language === "en" ? "Features" : language === "ta" ? "அம்சங்கள்" : "विशेषताएं"}
                  </p>
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 py-2 text-base font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.icon && <link.icon className="h-4 w-4" />}
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="border-t pt-4 mt-2 space-y-3">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full bg-transparent">
                      {t("login")}
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">
                      <User className="mr-1.5 h-4 w-4" />
                      {t("signup")}
                    </Button>
                  </Link>
                </div>
                <Link href="/settings" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full mt-2 bg-transparent">
                    {t("settings")}
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
