
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, ArrowRight, Globe, Database, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const steps = [
  { id: 1, name: 'Data Source', description: 'Choose where to get your data' },
  { id: 2, name: 'Extraction Rules', description: 'Define what data to extract' },
  { id: 3, name: 'Enrichment', description: 'Select enrichment options' },
  { id: 4, name: 'Output & Schedule', description: 'Configure output and scheduling' },
  { id: 5, name: 'Review', description: 'Review and create your job' }
];

const dataSourceTypes = [
  {
    id: 'website',
    name: 'Website',
    description: 'Scrape from websites',
    icon: Globe
  },
  {
    id: 'api',
    name: 'API',
    description: 'Connect to APIs',
    icon: Database
  },
  {
    id: 'upload',
    name: 'Upload',
    description: 'Upload CSV/Excel files',
    icon: Upload
  }
];

const enrichmentOptions = [
  {
    id: 'email',
    name: 'Email Lookup',
    description: 'Find email addresses',
    enabled: true
  },
  {
    id: 'company',
    name: 'Company Info',
    description: 'Get company details',
    enabled: false
  },
  {
    id: 'social',
    name: 'Social Profiles',
    description: 'Find social media profiles',
    enabled: false
  },
  {
    id: 'phone',
    name: 'Phone Numbers',
    description: 'Lookup phone numbers',
    enabled: false
  }
];

function CreateJob() {
  const [currentStep, setCurrentStep] = useState(1);
  const [jobData, setJobData] = useState({
    name: '',
    dataSource: '',
    enrichment: {
      email: true,
      company: false,
      social: false,
      phone: false
    }
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataSourceSelect = (sourceId) => {
    setJobData({ ...jobData, dataSource: sourceId });
  };

  const handleEnrichmentToggle = (optionId) => {
    setJobData({
      ...jobData,
      enrichment: {
        ...jobData.enrichment,
        [optionId]: !jobData.enrichment[optionId]
      }
    });
  };

  const handleFinish = () => {
    toast({
      title: "Job Created Successfully!",
      description: `${jobData.name} has been created and is ready to run.`
    });
    navigate('/data-jobs');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="jobName">Job Name</Label>
              <Input
                id="jobName"
                value={jobData.name}
                onChange={(e) => setJobData({ ...jobData, name: e.target.value })}
                placeholder="Enter job name"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label>Data Source Type</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {dataSourceTypes.map((source) => (
                  <Card
                    key={source.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      jobData.dataSource === source.id
                        ? 'ring-2 ring-blue-500 bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleDataSourceSelect(source.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <source.icon className="w-12 h-12 mx-auto mb-3 text-teal-600" />
                      <h3 className="font-semibold text-gray-900">{source.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{source.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Extraction Rules</h3>
              <p className="text-gray-600">Configure data extraction parameters for your selected source.</p>
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">
                  🚧 This step isn't fully implemented yet—but don't worry! You can request it in your next prompt! 🚀
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Enrichment Options</h3>
              <p className="text-gray-600 mb-6">Choose which data enrichment services to apply</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enrichmentOptions.map((option) => (
                  <Card key={option.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{option.name}</h4>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                      <Switch
                        checked={jobData.enrichment[option.id]}
                        onCheckedChange={() => handleEnrichmentToggle(option.id)}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Output & Schedule</h3>
              <p className="text-gray-600">Configure output format and scheduling options.</p>
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">
                  🚧 This step isn't fully implemented yet—but don't worry! You can request it in your next prompt! 🚀
                </p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Job</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <span className="font-medium">Job Name:</span> {jobData.name || 'Untitled Job'}
                  </div>
                  <div>
                    <span className="font-medium">Data Source:</span> {
                      dataSourceTypes.find(s => s.id === jobData.dataSource)?.name || 'Not selected'
                    }
                  </div>
                  <div>
                    <span className="font-medium">Enrichment Options:</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {Object.entries(jobData.enrichment)
                        .filter(([_, enabled]) => enabled)
                        .map(([key, _]) => (
                          <span key={key} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                            {enrichmentOptions.find(o => o.id === key)?.name}
                          </span>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Create New Job - DataFlow Pro</title>
        <meta name="description" content="Create a new data processing job with custom extraction rules and enrichment options." />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/data-jobs')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Job</h1>
            <p className="text-gray-600 mt-1">Set up a new data processing workflow</p>
          </div>
        </div>

        {/* Progress Steps */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    currentStep === step.id
                      ? 'bg-teal-600 text-white'
                      : currentStep > step.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.id}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].name}</CardTitle>
              <p className="text-gray-600">{steps[currentStep - 1].description}</p>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep === steps.length ? (
            <Button onClick={handleFinish} className="bg-teal-600 hover:bg-teal-700">
              Create Job
            </Button>
          ) : (
            <Button onClick={handleNext} className="bg-slate-800 hover:bg-slate-900">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateJob;
