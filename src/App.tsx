import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { useStore } from './lib/store';
import { Plus, Trash2 } from 'lucide-react';
import { Sidebar } from './components/layout/sidebar';
import { AddJobDialog } from './components/job/add-job-dialog';
import { DashboardView } from './components/views/dashboard';
import { GuideView } from './components/views/guide';
import { SettingsView } from './components/views/settings';
import { ExportView } from './components/views/export';
import { BoardHeader } from './components/board/board-header';
import { KanbanBoard } from './components/board/kanban-board';
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
} from './components/ui/toast';
import { useToast } from './components/ui/use-toast';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('board');
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const { toast } = useToast();

  const resetBoard = () => {
    localStorage.removeItem('jobzy-storage');
    window.location.reload();
    toast({
      title: '🧹 Board reset successfully!',
      description: 'All job data has been cleared.',
    });
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'guide':
        return <GuideView />;
      case 'settings':
        return <SettingsView />;
      case 'export':
        return <ExportView />;
      default:
        return (
          <>
            <div className="mb-8 flex flex-col items-center justify-between gap-4">
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Job Board</h1>
                <p className="mt-2 text-sm italic text-muted-foreground">
                  Your next offer is just a planned process away.
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsAddJobOpen(true)}
                  className="transition-all duration-200 ease-in-out hover:bg-opacity-90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Job
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={resetBoard}
                  className="transition-all duration-200 ease-in-out hover:bg-opacity-90"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Reset Board
                </Button>
              </div>
            </div>
            <BoardHeader />
            <div className="max-w-full overflow-x-auto px-6 lg:px-8">
              <div className="min-w-[1200px]">
                <KanbanBoard />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        <main className="transition-all duration-200 ease-in-out lg:pl-64">
          <div className="mx-auto px-6 py-8">
            {renderView()}
          </div>
        </main>
        <AddJobDialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen} />
        <ToastViewport />
      </div>
    </ToastProvider>
  );
}

export default App