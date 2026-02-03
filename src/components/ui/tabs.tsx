"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

// Utility (typed)
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 rounded-xl bg-slate-100 p-1.5 text-slate-600",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ae5708] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 data-[state=active]:bg-[#fef3e8] data-[state=active]:text-[#ae5708] data-[state=active]:shadow-sm hover:text-[#ae5708]",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ae5708] focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

// Demo Component (optional – can delete if not needed)
export default function TabsDemo() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-8">
      <div className="w-full max-w-2xl">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
              Account Settings
            </div>
          </TabsContent>

          <TabsContent value="password">
            <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
              Password Settings
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
              General Settings
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
              Notifications
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
