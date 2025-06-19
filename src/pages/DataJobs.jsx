
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, Plus, Eye, Download, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

function DataJobs() {
  const { jobs } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter(job =>
    job.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJobAction = (action, jobName) => {
    toast({
      title: `${action} - ${jobName}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
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

  const getStatusColor = (status) => {
    const colors = {
      completed: 'text-green-600',
      running: 'text-orange-600',
      failed: 'text-red-600',
      scheduled: 'text-blue-600'
    };
    return colors[status] || 'text-gray-600';
  };

  return (
    <>
      <Helmet>
        <title>Data Jobs - DataFlow Pro</title>
        <meta name="description" content="Manage and monitor your data processing jobs with real-time status updates and detailed analytics." />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Data Jobs</h1>
            <p className="text-gray-600 mt-1">Manage and monitor your data processing workflows</p>
          </div>
          <Button onClick={() => navigate('/create-job')} className="bg-slate-800 hover:bg-slate-900">
            <Plus className="w-4 h-4 mr-2" />
            Create New Job
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{job.name}</h3>
                        <Badge variant={getStatusBadge(job.status)}>
                          {job.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Records:</span> {job.records.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Source:</span> {job.source}
                        </div>
                        <div>
                          <span className="font-medium">Created:</span> {job.created}
                        </div>
                        <div>
                          <span className="font-medium">Last Run:</span> {job.lastRun}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleJobAction('View', job.name)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {job.status === 'completed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleJobAction('Export', job.name)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Export
                        </Button>
                      )}
                      {job.status === 'running' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-orange-50 text-orange-600 border-orange-200"
                          onClick={() => handleJobAction('View Running', job.name)}
                        >
                          Running...
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700 text-white"
                          onClick={() => handleJobAction('Run', job.name)}
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Run Now
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No jobs found matching your search.</p>
            <Button
              onClick={() => navigate('/create-job')}
              className="mt-4 bg-slate-800 hover:bg-slate-900"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Job
            </Button>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default DataJobs;
