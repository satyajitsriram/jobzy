import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { useStore } from '../../lib/store';
import { Tag, JobCard } from '../../types';
import { useToast } from '../ui/use-toast';

interface AddJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editCard?: JobCard;
}

export function AddJobDialog({ open, onOpenChange, editCard }: AddJobDialogProps) {
  const { addCard, updateCard } = useStore();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    jobLink: '',
    minExperience: '',
    tags: [] as Tag[],
    isPinned: false,
    actionTask: '',
    actionDate: '',
  });

  useEffect(() => {
    if (editCard) {
      setFormData({
        title: editCard.title,
        company: editCard.company,
        description: editCard.description || '',
        jobLink: editCard.jobLink || '',
        minExperience: editCard.minExperience || '',
        tags: editCard.tags,
        isPinned: editCard.isPinned,
        actionTask: editCard.actionTask || '',
        actionDate: editCard.actionDate || '',
      });
    } else {
      setFormData({
        title: '',
        company: '',
        description: '',
        jobLink: '',
        minExperience: '',
        tags: [],
        isPinned: false,
        actionTask: '',
        actionDate: '',
      });
    }
  }, [editCard, open]);

  const isValid = formData.title.trim() !== '' && formData.company.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    if (editCard) {
      updateCard({
        ...editCard,
        ...formData,
      });
      toast({
        title: '✅ Card updated',
        description: 'The job card has been updated successfully.',
      });
    } else {
      addCard({
        ...formData,
        columnId: 'job-list',
      });
      toast({
        title: '✅ Job added',
        description: 'New job card has been created.',
      });
    }

    onOpenChange(false);
  };

  const availableTags: Tag[] = [
    '🔥 Urgent',
    '🏠 Remote',
    '⭐ Dream Job',
    '⏳ Follow Up',
    '🤝 Referred',
  ];

  const toggleTag = (tag: Tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editCard ? 'Edit Job' : 'Add New Job'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Job Title *</Label>
            <input
              id="title"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Company Name *</Label>
            <input
              id="company"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.company}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, company: e.target.value }))
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="jobLink">Job Link</Label>
            <input
              id="jobLink"
              type="url"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.jobLink}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, jobLink: e.target.value }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="minExperience">Minimum Experience</Label>
            <input
              id="minExperience"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.minExperience}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  minExperience: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-lg border px-3 py-1 text-sm transition-colors ${
                    formData.tags.includes(tag)
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-input hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="actionTask">Action Task</Label>
            <input
              id="actionTask"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.actionTask}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, actionTask: e.target.value }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="actionDate">Action Date</Label>
            <input
              id="actionDate"
              type="date"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.actionDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, actionDate: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isPinned"
              checked={formData.isPinned}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, isPinned: checked as boolean }))
              }
            />
            <Label htmlFor="isPinned">Pin to top of column</Label>
          </div>
          {!isValid && (
            <p className="text-sm text-destructive">
              Please fill in required fields before saving.
            </p>
          )}
        </form>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={!isValid}>
            {editCard ? 'Save Changes' : 'Save Job'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}