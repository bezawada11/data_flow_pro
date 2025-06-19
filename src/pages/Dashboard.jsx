
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { CheckCircle, Clock, AlertTriangle, Plus, Link, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { jobs } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();

  const completedJobs = jobs.filter(job => job.status === 'completed').length;
  const runningJobs = jobs.filter(job => job.status === 'running').length;
  const failedJobs = jobs.filter(job => job.status === 'failed').length;

  const recentJobs = jobs.slice(0, 4);

  const handleQuickAction = (action) => {
    if (action === 'create-job') {
      navigate('/create-job');
    } else if (action === 'setup-integration') {
      navigate('/integrations');
    } else if (action === 'view-reports') {
      navigate('/reports');
    } else {
      toast({
        title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
      });
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      completed: 'completed',
      running: 'running',
      failed: 'failed',
      scheduled: 'scheduled'
    };
    return variants[status] || 'default';
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - DataFlow Pro</title>
        <meta name="description" content="Monitor your data automation workflows and track performance metrics in real-time." />
      </Helmet>

      <div className="space-y-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Jobs Completed</p>
                    <p className="text-3xl font-bold text-green-900">{completedJobs}</p>
                    <p className="text-green-600 text-sm">+12% from last month</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Jobs Running</p>
                    <p className="text-3xl font-bold text-blue-900">{runningJobs}</p>
                    <p className="text-blue-600 text-sm">Active processes</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-600 text-sm font-medium">Jobs Failed</p>
                    <p className="text-3xl font-bold text-red-900">{failedJobs}</p>
                    <p className="text-red-600 text-sm">Needs attention</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resource Usage */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Resource Usage</span>
                </CardTitle>
                <p className="text-sm text-gray-600">Current system resource utilization</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CPU Usage</span>
                    <span>67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Memory</span>
                    <span>43%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '43%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Bandwidth</span>
                    <span>82%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Jobs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>Recent Jobs</span>
                    </CardTitle>
                    <p className="text-sm text-gray-600">Latest data processing activities</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/data-jobs')}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{job.name}</p>
                      <p className="text-xs text-gray-500">{job.lastRun}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusBadge(job.status)}>
                        {job.status}
                      </Badge>
                      <span className="text-xs text-gray-500">{job.records} records</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <p className="text-sm text-gray-600">Start your data automation workflows</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => handleQuickAction('create-job')}
                  className="h-20 flex flex-col items-center justify-center space-y-2 bg-slate-800 hover:bg-slate-900"
                >
                  <Plus className="w-6 h-6" />
                  <span>Create New Job</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleQuickAction('setup-integration')}
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <Link className="w-6 h-6" />
                  <span>Setup Integration</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleQuickAction('view-reports')}
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <BarChart3 className="w-6 h-6" />
                  <span>View Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}

export default Dashboard;
