import React from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Settings,
  HelpCircle,
  Download,
  Menu,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

const sidebarItems = [
  { id: 'board', icon: ClipboardList, label: 'Job Board' },
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'guide', icon: HelpCircle, label: 'Guide' },
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'export', icon: Download, label: 'Export CSV' },
];

export function Sidebar({
  isOpen,
  onToggle,
  currentView,
  onViewChange,
}: SidebarProps) {
  return (
    <>
      <button
        onClick={onToggle}
        className="fixed left-4 top-4 z-50 rounded-lg border bg-background p-2 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 transform bg-background shadow-lg transition-transform duration-200 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-14 items-center border-b px-6">
          <span className="text-xl font-bold">📋 Jobzy</span>
        </div>
        <nav className="space-y-1 p-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                currentView === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-primary/10 hover:text-primary'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}