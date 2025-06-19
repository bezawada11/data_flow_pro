
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Play, Settings, Trash2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';

function EnrichmentPipelines() {
  const { pipelines } = useData();
  const { toast } = useToast();

  const handlePipelineAction = (action, pipelineName) => {
    toast({
      title: `${action} - ${pipelineName}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: 'active',
      draft: 'draft'
    };
    return variants[status] || 'default';
  };

  return (
    <>
      <Helmet>
        <title>Enrichment Pipelines - DataFlow Pro</title>
        <meta name="description" content="Create and manage visual data enrichment workflows with drag-and-drop pipeline builder." />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Enrichment Pipelines</h1>
            <p className="text-gray-600 mt-1">Create and manage visual data enrichment workflows</p>
          </div>
          <Button 
            onClick={() => handlePipelineAction('Create', 'New Pipeline')}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Pipeline
          </Button>
        </div>

        {/* Pipeline Builder Header */}
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Builder</CardTitle>
            <p className="text-gray-600">Create visual data enrichment workflows</p>
          </CardHeader>
        </Card>

        {/* Existing Pipelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pipelines.map((pipeline, index) => (
            <motion.div
              key={pipeline.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg">{pipeline.name}</CardTitle>
                    <Badge variant={getStatusBadge(pipeline.status)}>
                      {pipeline.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePipelineAction('Configure', pipeline.name)}
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePipelineAction('Delete', pipeline.name)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Last run: {pipeline.lastRun}</p>
                  
                  {/* Pipeline Steps Visualization */}
                  <div className="flex items-center space-x-2 mb-4 overflow-x-auto">
                    {pipeline.steps.map((step, stepIndex) => (
                      <React.Fragment key={stepIndex}>
                        <div className="flex-shrink-0 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
                          {step}
                        </div>
                        {stepIndex < pipeline.steps.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePipelineAction('Edit', pipeline.name)}
                    >
                      Edit Pipeline
                    </Button>
                    <Button
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-700"
                      onClick={() => handlePipelineAction('Run', pipeline.name)}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Run Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pipeline Builder Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Visual Pipeline Builder</CardTitle>
              <p className="text-gray-600">Drag and drop blocks to create your workflow</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[400px]">
                {/* Building Blocks */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Building Blocks</h3>
                  <p className="text-sm text-gray-600">Drag blocks to build your pipeline</p>
                  
                  <div className="space-y-2">
                    {[
                      { name: 'Extract Data', color: 'bg-blue-100 text-blue-800' },
                      { name: 'Upload Data', color: 'bg-green-100 text-green-800' },
                      { name: 'Email Lookup', color: 'bg-orange-100 text-orange-800' },
                      { name: 'Company Info', color: 'bg-purple-100 text-purple-800' },
                      { name: 'Profile Match', color: 'bg-pink-100 text-pink-800' },
                      { name: 'Export Data', color: 'bg-teal-100 text-teal-800' }
                    ].map((block, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg cursor-move ${block.color} text-sm font-medium`}
                      >
                        {block.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pipeline Canvas */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">Pipeline Canvas</h3>
                    <p className="text-sm text-gray-600 mb-4">Drop blocks here to create your workflow</p>
                    <p className="text-xs text-gray-500">Start with an input block (Extract or Upload)</p>
                  </div>
                </div>

                {/* Configuration */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Configuration</h3>
                  <p className="text-sm text-gray-600">Configure selected block</p>
                  
                  <div className="p-6 bg-gray-50 rounded-lg text-center">
                    <Settings className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Select a block to configure</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6 pt-6 border-t">
                <Button variant="outline">Cancel</Button>
                <div className="space-x-2">
                  <Button variant="outline">Save Draft</Button>
                  <Button className="bg-teal-600 hover:bg-teal-700">Save & Activate</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}

export default EnrichmentPipelines;
