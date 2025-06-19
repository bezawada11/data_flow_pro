
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, CheckCircle, Plus, Link as LinkIcon, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';

const filterTabs = ['All', 'CRM', 'Storage', 'Communication', 'Custom', 'Automation'];

function Integrations() {
  const { integrations } = useData();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const connectedIntegrations = integrations.filter(i => i.status === 'connected');
  const availableIntegrations = integrations.filter(i => i.status === 'available');

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || integration.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleIntegrationAction = (action, integrationName) => {
    toast({
      title: `${action} - ${integrationName}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const getIntegrationIcon = (name) => {
    // In a real app, you'd have actual icons for each service
    return name.charAt(0).toUpperCase();
  };

  const getStatusBadge = (status) => {
    return status === 'connected' ? 'connected' : 'available';
  };

  return (
    <>
      <Helmet>
        <title>Integrations - DataFlow Pro</title>
        <meta name="description" content="Connect DataFlow Pro with your favorite tools and services for seamless data automation." />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
            <p className="text-gray-600 mt-1">Connect with your favorite tools and services</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-900">{connectedIntegrations.length}</p>
                <p className="text-green-600 text-sm">Connected</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <Plus className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-900">{availableIntegrations.length}</p>
                <p className="text-blue-600 text-sm">Available</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-6 text-center">
                <LinkIcon className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{integrations.length}</p>
                <p className="text-gray-600 text-sm">Total Available</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search integrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => (
                <Button
                  key={tab}
                  variant={activeFilter === tab ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(tab)}
                  className={activeFilter === tab ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration, index) => (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="font-semibold text-gray-600">
                        {getIntegrationIcon(integration.name)}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <Badge variant={getStatusBadge(integration.status)} className="text-xs">
                        {integration.type}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant={getStatusBadge(integration.status)}>
                    {integration.status === 'connected' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <Plus className="w-3 h-3 mr-1" />
                    )}
                    {integration.status === 'connected' ? 'Connected' : 'Available'}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                  <p className="text-xs text-gray-500 mb-4">
                    Last sync: {integration.lastSync}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    {integration.status === 'connected' ? (
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={true}
                          onCheckedChange={() => handleIntegrationAction('Disconnect', integration.name)}
                        />
                        <span className="text-sm text-gray-600">Disconnect</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={false}
                          onCheckedChange={() => handleIntegrationAction('Connect', integration.name)}
                        />
                        <span className="text-sm text-gray-600">Connect</span>
                      </div>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleIntegrationAction('Configure', integration.name)}
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No integrations found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default Integrations;
