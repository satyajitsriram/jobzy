import React from 'react';
import { useStore } from '../../lib/store';
import { 
  Briefcase, 
  Send, 
  MessageSquare, 
  Trophy,
  XCircle,
  Pin
} from 'lucide-react';

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  className = '' 
}: { 
  icon: React.ElementType;
  label: string;
  value: number;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border bg-card p-6 transition-all duration-200 ease-in-out hover:shadow-md hover:ring-1 hover:ring-primary/10 ${className}`}>
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-sm font-medium tracking-wide text-muted-foreground">{label}</h3>
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}

export function DashboardView() {
  const { columns } = useStore();

  const totalJobs = columns.reduce((acc, col) => acc + col.cards.length, 0);
  const appliedJobs = columns.find((col) => col.id === 'applied')?.cards.length || 0;
  const interviewJobs = columns.find((col) => col.id === 'interview')?.cards.length || 0;
  const offers = columns.find((col) => col.id === 'offer')?.cards.length || 0;
  const rejections = columns.find((col) => col.id === 'rejected')?.cards.length || 0;
  const pinnedJobs = columns.reduce(
    (acc, col) => acc + col.cards.filter((card) => card.isPinned).length,
    0
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={Briefcase}
          label="Total Jobs"
          value={totalJobs}
        />
        <StatCard
          icon={Send}
          label="Applications"
          value={appliedJobs}
        />
        <StatCard
          icon={MessageSquare}
          label="Interviews"
          value={interviewJobs}
        />
        <StatCard
          icon={Trophy}
          label="Offers"
          value={offers}
          className="text-green-500"
        />
        <StatCard
          icon={XCircle}
          label="Rejections"
          value={rejections}
        />
        <StatCard
          icon={Pin}
          label="Pinned Jobs"
          value={pinnedJobs}
        />
      </div>
      <p className="text-center text-sm italic text-muted-foreground">
        📈 More rejections just mean you're applying like a champ.
      </p>
    </div>
  );
}