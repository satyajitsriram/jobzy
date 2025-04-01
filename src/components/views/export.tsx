import React from 'react';
import { useStore } from '../../lib/store';
import { Button } from '../ui/button';
import { Download } from 'lucide-react';

export function ExportView() {
  const { columns } = useStore();

  const handleExport = () => {
    // Prepare CSV data
    const headers = [
      'Job Title',
      'Company',
      'Status',
      'Description',
      'Job Link',
      'Min Experience',
      'Tags',
      'Action Task',
      'Action Date',
      'Date Created',
    ].join(',');

    const rows = columns.flatMap((column) =>
      column.cards.map((card) => [
        `"${card.title}"`,
        `"${card.company}"`,
        `"${column.title}"`,
        `"${card.description || ''}"`,
        `"${card.jobLink || ''}"`,
        `"${card.minExperience || ''}"`,
        `"${card.tags.join(', ')}"`,
        `"${card.actionTask || ''}"`,
        `"${card.actionDate || ''}"`,
        `"${new Date(card.dateCreated).toLocaleDateString()}"`,
      ].join(','))
    );

    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `jobzy-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Export Data</h1>
      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-xl font-semibold">Export to CSV</h2>
        <p className="mt-2 text-muted-foreground">
          Download all your job application data in CSV format. This file can be opened
          in Excel, Google Sheets, or any spreadsheet application.
        </p>
        <Button onClick={handleExport} className="mt-4">
          <Download className="mr-2 h-4 w-4" />
          Export to CSV
        </Button>
      </div>
    </div>
  );
}