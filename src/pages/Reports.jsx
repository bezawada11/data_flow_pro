
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Download, Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useToast } from '@/components/ui/use-toast';

const jobsOverTimeData = [
  { month: 'Jan', successful: 45, failed: 2 },
  { month: 'Feb', successful: 52, failed: 3 },
  { month: 'Mar', successful: 61, failed: 2 },
  { month: 'Apr', successful: 58, failed: 4 },
  { month: 'May', successful: 67, failed: 3 },
  { month: 'Jun', successful: 73, failed: 2 }
];

const enrichmentTypesData = [
  { name: 'Email Lookup', value: 35, color: '#10b981' },
  { name: 'Company Info', value: 28, color: '#3b82f6' },
  { name: 'Phone Numbers', value: 15, color: '#ef4444' },
  { name: 'Social Profiles', value: 22, color: '#8b5cf6' }
];

const metricsData = [
  {
    title: 'Jobs Success Rate',
    value: '94.2',
    unit: '%',
    change: '+2.1%',
    trend: 'up'
  },
  {
    title: 'Avg Processing Time',
    value: '3.4',
    unit: 'm',
    change: '-0.8%',
    trend: 'down'
  },
  {
    title: 'Data Accuracy',
    value: '97.8',
    unit: '%',
    change: '+1.2%',
    trend: 'up'
  },
  {
    title: 'API Usage',
    value: '89',
    unit: '%',
    change: '+5.2%',
    trend: 'up'
  }
];

const recentJobActivity = [
  {
    name: 'LinkedIn Profile Scraping',
    duration: '2h 15m',
    records: 1250,
    status: 'completed'
  },
  {
    name: 'Company Email Enrichment',
    duration: '1h 30m',
    records: 847,
    status: 'running'
  },
  {
    name: 'Website Contact Extraction',
    duration: '45m',
    records: 0,
    status: 'failed'
  },
  {
    name: 'CRM Data Enhancement',
    duration: '3h 20m',
    records: 2103,
    status: 'completed'
  }
];

const successRateData = [
  { label: 'Completed Jobs', value: 94.2, color: '#10b981' },
  { label: 'Data Accuracy', value: 97.8, color: '#3b82f6' },
  { label: 'API Reliability', value: 99.1, color: '#8b5cf6' }
];

function Reports() {
  const [timeRange, setTimeRange] = useState('30');
  const { toast } = useToast();

  const handleExport = (format) => {
    toast({
      title: `Export ${format}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      running: 'bg-orange-100 text-orange-800',
      failed: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <Helmet>
        <title>Reports & Analytics - DataFlow Pro</title>
        <meta name="description" content="Comprehensive analytics and reporting for your data automation workflows with detailed performance metrics." />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Monitor your data automation performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => handleExport('Report')} className="bg-slate-800 hover:bg-slate-900">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Analytics Dashboard Header */}
        <Card>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
            <p className="text-gray-600">Monitor your data automation performance</p>
          </CardHeader>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {metric.value}
                        <span className="text-lg text-gray-500">{metric.unit}</span>
                      </p>
                      <div className={`flex items-center space-x-1 text-sm ${getTrendColor(metric.trend)}`}>
                        {getTrendIcon(metric.trend)}
                        <span>{metric.change}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Jobs Over Time Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Jobs Over Time</span>
                </CardTitle>
                <p className="text-sm text-gray-600">Monthly job execution trends</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={jobsOverTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="successful" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Successful"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="failed" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="Failed"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enrichment Types Usage */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Enrichment Types Usage</CardTitle>
                <p className="text-sm text-gray-600">Distribution of enrichment services</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={enrichmentTypesData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name} ${value}%`}
                    >
                      {enrichmentTypesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Success Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Success Rate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {successRateData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${item.value}%`,
                          backgroundColor: item.color
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Job Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Job Activity</CardTitle>
                <p className="text-sm text-gray-600">Latest job executions and their status</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentJobActivity.map((job, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{job.name}</p>
                      <p className="text-xs text-gray-500">Duration: {job.duration}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-gray-600">{job.records} records</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(job.status)}`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Export Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Export Reports</CardTitle>
              <p className="text-gray-600">Download detailed reports in various formats</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleExport('PDF')}
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <Download className="w-6 h-6" />
                  <span>PDF Report</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleExport('Excel')}
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <Download className="w-6 h-6" />
                  <span>Excel Dashboard</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleExport('CSV')}
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <Download className="w-6 h-6" />
                  <span>Raw Data (CSV)</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}

export default Reports;
