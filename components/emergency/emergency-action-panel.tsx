"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle, Phone, Users, MapPin, CheckCircle2, Loader2, Siren } from "lucide-react"
import { toast } from "sonner"

export function EmergencyActionPanel() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isTriggering, setIsTriggering] = useState(false)
  const [isTriggered, setIsTriggered] = useState(false)

  const handleEmergencyTrigger = async () => {
    setIsTriggering(true)

    // Simulate emergency alert
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsTriggering(false)
    setIsTriggered(true)
    setIsDialogOpen(false)

    toast.success("Emergency alert sent successfully", {
      description: "Family members and nearby hospitals have been notified.",
    })
  }

  return (
    <>
      <Card className="border-2 border-emergency/30 bg-emergency/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emergency">
            <Siren className="h-6 w-6" />
            Emergency Action
          </CardTitle>
          <CardDescription className="text-foreground/70">
            Trigger an emergency alert to notify your emergency contacts and nearby hospitals.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg bg-background p-4">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Family Notification</p>
                <p className="text-sm text-muted-foreground">
                  Your emergency contacts will receive an immediate SMS and app notification.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-background p-4">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Hospital Alert</p>
                <p className="text-sm text-muted-foreground">
                  Nearby hospitals will be notified with your location and health data.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-background p-4">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Emergency Services</p>
                <p className="text-sm text-muted-foreground">
                  Local emergency services (ambulance) will be dispatched to your location.
                </p>
              </div>
            </div>
          </div>

          {isTriggered ? (
            <div className="rounded-lg bg-success/10 border border-success/30 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-success" />
                <div>
                  <p className="font-semibold text-success">Emergency Alert Sent</p>
                  <p className="text-sm text-muted-foreground">Help is on the way. Stay calm and stay where you are.</p>
                </div>
              </div>
            </div>
          ) : (
            <Button
              size="lg"
              variant="destructive"
              className="w-full h-16 text-lg bg-emergency hover:bg-emergency/90"
              onClick={() => setIsDialogOpen(true)}
            >
              <AlertTriangle className="mr-2 h-6 w-6" />
              Trigger Emergency Alert
            </Button>
          )}

          <p className="text-xs text-center text-muted-foreground">
            Only use in genuine emergencies. False alerts may result in account restrictions.
          </p>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emergency">
              <AlertTriangle className="h-5 w-5" />
              Confirm Emergency Alert
            </DialogTitle>
            <DialogDescription>
              This will immediately notify your emergency contacts and nearby hospitals. Only proceed if you require
              urgent medical assistance.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg bg-emergency/10 p-4 my-4">
            <p className="text-sm font-medium">This action will:</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• Send SMS alerts to all emergency contacts</li>
              <li>• Share your current location with responders</li>
              <li>• Alert the 3 nearest hospitals</li>
              <li>• Request ambulance dispatch</li>
            </ul>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isTriggering}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleEmergencyTrigger}
              disabled={isTriggering}
              className="bg-emergency hover:bg-emergency/90"
            >
              {isTriggering ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Alert...
                </>
              ) : (
                <>
                  <Siren className="mr-2 h-4 w-4" />
                  Confirm Emergency
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
