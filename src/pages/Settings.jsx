
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { User, Key, Bell, Database, Shield, Camera, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    fullName: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    company: user?.company || 'DataFlow Corp',
    role: user?.role || 'Admin'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    slack: false,
    webhook: true,
    jobCompletion: true,
    jobFailures: true,
    weeklyReports: false
  });

  const [dataSettings, setDataSettings] = useState({
    retentionPeriod: '90',
    exportFormat: 'CSV'
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully."
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Preferences Saved",
      description: "Your notification settings have been updated."
    });
  };

  const handleGenerateApiKey = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleEnable2FA = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleDeleteAllData = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleChangeAvatar = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Settings - DataFlow Pro</title>
        <meta name="description" content="Manage your account settings, API keys, notifications, and security preferences in DataFlow Pro." />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account and application preferences</p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="api-keys" className="flex items-center space-x-2">
              <Key className="w-4 h-4" />
              <span className="hidden sm:inline">API Keys</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Data</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <p className="text-gray-600">Manage your account information and preferences</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-medium">
                        {profileData.fullName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <Button variant="outline" onClick={handleChangeAvatar}>
                        <Camera className="w-4 h-4 mr-2" />
                        Change Avatar
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF, max 2MB</p>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={profileData.company}
                        onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select value={profileData.role} onValueChange={(value) => setProfileData({ ...profileData, role: value })}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="User">User</SelectItem>
                          <SelectItem value="Viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} className="bg-teal-600 hover:bg-teal-700">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* API Keys */}
          <TabsContent value="api-keys">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>API Keys</CardTitle>
                    <p className="text-gray-600">Manage your API keys for integrations</p>
                  </div>
                  <Button onClick={handleGenerateApiKey} className="bg-teal-600 hover:bg-teal-700">
                    Generate New Key
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Production API Key */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Production API</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Active</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 p-2 bg-gray-100 rounded text-sm font-mono">
                        df_prod_...***...23...789
                      </code>
                      <Button variant="outline" size="sm">
                        <Key className="w-4 h-4 mr-1" />
                        Show
                      </Button>
                      <Button variant="outline" size="sm">
                        Copy
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Created: 2024-01-15 • Last used: 2 hours ago
                    </p>
                  </div>

                  {/* Development API Key */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Development API</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Active</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 p-2 bg-gray-100 rounded text-sm font-mono">
                        df_dev_4...***...56...012
                      </code>
                      <Button variant="outline" size="sm">
                        <Key className="w-4 h-4 mr-1" />
                        Show
                      </Button>
                      <Button variant="outline" size="sm">
                        Copy
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Created: 2024-01-10 • Last used: 1 day ago
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <p className="text-gray-600">Choose how you want to be notified</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Notification Channels */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Notification Channels</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-gray-600">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Slack Integration</h4>
                          <p className="text-sm text-gray-600">Send notifications to Slack</p>
                        </div>
                        <Switch
                          checked={notifications.slack}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, slack: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Webhook Notifications</h4>
                          <p className="text-sm text-gray-600">Send to custom webhook endpoints</p>
                        </div>
                        <Switch
                          checked={notifications.webhook}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, webhook: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Event Types */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Event Types</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Job Completion</h4>
                          <p className="text-sm text-gray-600">When jobs finish successfully</p>
                        </div>
                        <Switch
                          checked={notifications.jobCompletion}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, jobCompletion: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Job Failures</h4>
                          <p className="text-sm text-gray-600">When jobs fail or encounter errors</p>
                        </div>
                        <Switch
                          checked={notifications.jobFailures}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, jobFailures: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Weekly Reports</h4>
                          <p className="text-sm text-gray-600">Weekly summary of your activities</p>
                        </div>
                        <Switch
                          checked={notifications.weeklyReports}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSaveNotifications} className="bg-teal-600 hover:bg-teal-700">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Data Management */}
          <TabsContent value="data">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <p className="text-gray-600">Configure data retention and storage options</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="retention">Data Retention Period</Label>
                    <Select value={dataSettings.retentionPeriod} onValueChange={(value) => setDataSettings({ ...dataSettings, retentionPeriod: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="exportFormat">Default Export Format</Label>
                    <Select value={dataSettings.exportFormat} onValueChange={(value) => setDataSettings({ ...dataSettings, exportFormat: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CSV">CSV</SelectItem>
                        <SelectItem value="JSON">JSON</SelectItem>
                        <SelectItem value="Excel">Excel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Danger Zone */}
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h3>
                    <p className="text-sm text-gray-600 mb-4">These actions cannot be undone. Please proceed with caution.</p>
                    
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteAllData}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete All Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <p className="text-gray-600">Manage your account security and access</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Change Password */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" className="mt-1" />
                      </div>
                      <Button onClick={handleChangePassword} className="bg-slate-800 hover:bg-slate-900">
                        Update Password
                      </Button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="pt-6 border-t">
                    <h3 className="font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">2FA Status</h4>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                      <Button onClick={handleEnable2FA} className="bg-teal-600 hover:bg-teal-700">
                        Enable 2FA
                      </Button>
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div className="pt-6 border-t">
                    <h3 className="font-semibold text-gray-900 mb-4">Active Sessions</h3>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Current Session</h4>
                          <p className="text-sm text-gray-600">Chrome on macOS • 192.168.1.100</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Active</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Settings;
