import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Mail,
  Phone,
  CreditCard,
  Key,
  Download,
  Trash2,
  Settings as SettingsIcon,
  Zap,
  CheckCircle,
  TrendingUp,
  BarChart3,
} from "lucide-react"
import KYCFlow from "@/components/KYCFlow"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30 hover:bg-white/20"
            >
              <SettingsIcon className="w-4 h-4 mr-2" />
              Account Settings
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-3">Settings</h1>
          <p className="text-slate-200 text-lg">
            Manage your account preferences, security settings, and platform
            configuration
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <div className="bg-white rounded-2xl p-2 shadow-md border-0">
          <TabsList className="grid w-full grid-cols-2 bg-transparent gap-1">
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 data-[state=active]:bg-slate-100 rounded-xl"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="kyc"
              className="flex items-center gap-2 data-[state=active]:bg-slate-100 rounded-xl"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">KYC</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-emerald-600" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      defaultValue="paul.vanmierlo@example.com"
                      className="pl-10 bg-slate-50 border-slate-200"
                    />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 flex items-center gap-1"
                  >
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="pl-10 bg-slate-50 border-slate-200"
                  />
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* KYC Tab (was Notifications) */}
        <TabsContent value="kyc" className="space-y-6">
          <KYCFlow />
        </TabsContent>
      </Tabs>
    </div>
  )
}
