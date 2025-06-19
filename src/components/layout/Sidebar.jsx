
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Database, 
  Plus, 
  GitBranch, 
  Link as LinkIcon, 
  BarChart3, 
  Settings,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Data Jobs', href: '/data-jobs', icon: Database },
  { name: 'Create Job', href: '/create-job', icon: Plus },
  { name: 'Enrichment Pipelines', href: '/enrichment-pipelines', icon: GitBranch },
  { name: 'Integrations', href: '/integrations', icon: LinkIcon },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar-gradient w-64 flex flex-col">
      <div className="p-6">
        <Link to="/dashboard" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Layers className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <span className="text-white text-xl font-bold">DataFlow Pro</span>
            <p className="text-blue-200 text-sm">Data Automation</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <p className="text-blue-200 text-xs font-medium uppercase tracking-wider px-3 py-2">
          Navigation
        </p>
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors relative',
                isActive
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              )}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-blue-700 rounded-lg"
                  layoutId="activeTab"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <item.icon className="w-5 h-5 mr-3 relative z-10" />
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-blue-700">
        <p className="text-blue-200 text-xs">© 2024 DataFlow Pro</p>
      </div>
    </div>
  );
}

export default Sidebar;
