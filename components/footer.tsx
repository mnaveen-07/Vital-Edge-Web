import Link from "next/link"
import { Activity } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Activity className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">VitalEdge</span>
            </Link>
            <p className="text-sm text-muted-foreground">AI-powered health risk and emergency intelligence platform.</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/analyze" className="hover:text-foreground transition-colors">
                  Symptom Analysis
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="hover:text-foreground transition-colors">
                  Emergency Help
                </Link>
              </li>
              <li>
                <Link href="/hospitals" className="hover:text-foreground transition-colors">
                  Find Hospitals
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-foreground transition-colors">
                  Health History
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-foreground transition-colors">
                  Settings
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-muted-foreground">
              <strong>Disclaimer:</strong> VitalEdge does not replace professional medical diagnosis. Always consult a
              healthcare provider for medical advice.
            </p>
            <p className="text-xs text-muted-foreground">© 2025 VitalEdge. Hackathon Prototype. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
