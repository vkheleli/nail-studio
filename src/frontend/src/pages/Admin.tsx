import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  CalendarCheck,
  Image,
  LogIn,
  LogOut,
  MessageSquare,
  Phone,
  Scissors,
  ShieldCheck,
} from "lucide-react";
import { AdminBookingsTab } from "../components/admin/AdminBookingsTab";
import { AdminContactTab } from "../components/admin/AdminContactTab";
import { AdminGalleryTab } from "../components/admin/AdminGalleryTab";
import { AdminMessagesTab } from "../components/admin/AdminMessagesTab";
import { AdminServicesTab } from "../components/admin/AdminServicesTab";
import { useListBookings } from "../hooks/useBookings";
import { useIsAdmin } from "../hooks/useContactInfo";

export default function Admin() {
  const { loginStatus, login, clear } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: allBookings } = useListBookings();
  const pendingCount = (allBookings ?? []).filter(
    (b) => b.status === "Pending",
  ).length;

  const isAuthenticated = loginStatus === "success";

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-card border border-border rounded-2xl p-10 shadow-elevated max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl text-foreground mb-2">
              Admin Access
            </h1>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              Sign in with Internet Identity to manage your nail salon content.
            </p>
          </div>
          <Button
            data-ocid="admin-login-btn"
            onClick={() => login()}
            className="w-full h-11"
            size="lg"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Sign in with Internet Identity
          </Button>
        </div>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-card border border-border rounded-2xl p-10 shadow-elevated max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8 text-destructive" />
          </div>
          <div>
            <h1 className="font-display text-2xl text-foreground mb-2">
              Access Denied
            </h1>
            <p className="text-muted-foreground font-body text-sm">
              Your account does not have admin privileges.
            </p>
          </div>
          <Button variant="outline" onClick={() => clear()} className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground font-body text-sm mt-1">
            Manage services, gallery, and contact information
          </p>
        </div>
        <Button
          data-ocid="admin-signout-btn"
          variant="outline"
          size="sm"
          onClick={() => clear()}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="bookings" className="w-full">
        <TabsList
          data-ocid="admin-tabs"
          className="w-full grid grid-cols-3 sm:grid-cols-5 h-auto gap-1 bg-muted p-1 rounded-xl"
        >
          <TabsTrigger
            value="bookings"
            className="gap-2 py-2.5 rounded-lg text-sm font-body relative"
            data-ocid="admin-tab.bookings"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Bookings</span>
            {pendingCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] font-body rounded-full bg-amber-500 text-white border-0">
                {pendingCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="services"
            className="gap-2 py-2.5 rounded-lg text-sm font-body"
            data-ocid="admin-tab.services"
          >
            <Scissors className="w-4 h-4" />
            <span>Services</span>
          </TabsTrigger>
          <TabsTrigger
            value="gallery"
            className="gap-2 py-2.5 rounded-lg text-sm font-body"
            data-ocid="admin-tab.gallery"
          >
            <Image className="w-4 h-4" />
            <span>Gallery</span>
          </TabsTrigger>
          <TabsTrigger
            value="contact"
            className="gap-2 py-2.5 rounded-lg text-sm font-body"
            data-ocid="admin-tab.contact"
          >
            <Phone className="w-4 h-4" />
            <span>Contact</span>
          </TabsTrigger>
          <TabsTrigger
            value="messages"
            className="gap-2 py-2.5 rounded-lg text-sm font-body"
            data-ocid="admin-tab.messages"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Messages</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="mt-6">
          <AdminBookingsTab />
        </TabsContent>
        <TabsContent value="services" className="mt-6">
          <AdminServicesTab />
        </TabsContent>
        <TabsContent value="gallery" className="mt-6">
          <AdminGalleryTab />
        </TabsContent>
        <TabsContent value="contact" className="mt-6">
          <AdminContactTab />
        </TabsContent>
        <TabsContent value="messages" className="mt-6">
          <AdminMessagesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
