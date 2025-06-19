
import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export function DataProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [integrations, setIntegrations] = useState([]);
  const [pipelines, setPipelines] = useState([]);

  useEffect(() => {
    // Initialize with mock data
    const mockJobs = [
      {
        id: '1',
        name: 'LinkedIn Profile Scraping',
        status: 'completed',
        records: 1250,
        source: 'Website',
        created: '2024-01-15',
        lastRun: '2h ago'
      },
      {
        id: '2',
        name: 'Company Email Enrichment',
        status: 'running',
        records: 847,
        source: 'API',
        created: '2024-01-14',
        lastRun: '30m ago'
      },
      {
        id: '3',
        name: 'Website Contact Extraction',
        status: 'failed',
        records: 0,
        source: 'Website',
        created: '2024-01-14',
        lastRun: '1h ago'
      },
      {
        id: '4',
        name: 'CRM Data Enhancement',
        status: 'completed',
        records: 2103,
        source: 'Upload',
        created: '2024-01-13',
        lastRun: '3h ago'
      },
      {
        id: '5',
        name: 'Social Media Profile Enrichment',
        status: 'scheduled',
        records: 0,
        source: 'API',
        created: '2024-01-13',
        lastRun: 'Never'
      }
    ];

    const mockIntegrations = [
      {
        id: '1',
        name: 'Salesforce',
        type: 'CRM',
        status: 'connected',
        description: 'Sync data with Salesforce CRM',
        lastSync: '2 hours ago'
      },
      {
        id: '2',
        name: 'Google Sheets',
        type: 'Storage',
        status: 'connected',
        description: 'Export data to Google Sheets',
        lastSync: '1 hour ago'
      },
      {
        id: '3',
        name: 'Webhooks',
        type: 'Custom',
        status: 'connected',
        description: 'Send data to custom endpoints',
        lastSync: '30 minutes ago'
      },
      {
        id: '4',
        name: 'HubSpot',
        type: 'CRM',
        status: 'available',
        description: 'Connect to HubSpot for lead management',
        lastSync: 'Never'
      },
      {
        id: '5',
        name: 'Slack',
        type: 'Communication',
        status: 'available',
        description: 'Get notifications in Slack',
        lastSync: 'Never'
      },
      {
        id: '6',
        name: 'Zapier',
        type: 'Automation',
        status: 'available',
        description: 'Connect to 5000+ apps via Zapier',
        lastSync: 'Never'
      }
    ];

    const mockPipelines = [
      {
        id: '1',
        name: 'Lead Enrichment Pipeline',
        status: 'active',
        lastRun: '2 hours ago',
        steps: ['Extract', 'Email Lookup', 'Company Info', 'Export']
      },
      {
        id: '2',
        name: 'Contact Enhancement',
        status: 'draft',
        lastRun: 'Never',
        steps: ['Upload', 'Phone Lookup', 'Social Profiles', 'CRM Push']
      }
    ];

    setJobs(mockJobs);
    setIntegrations(mockIntegrations);
    setPipelines(mockPipelines);
  }, []);

  const value = {
    jobs,
    setJobs,
    integrations,
    setIntegrations,
    pipelines,
    setPipelines
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
