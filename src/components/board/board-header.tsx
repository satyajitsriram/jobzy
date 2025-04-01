import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useStore } from '../../lib/store';
import { Tag } from '../../types';
import { Button } from '../ui/button';

export function BoardHeader() {
  const { 
    selectedTags, 
    setSelectedTags, 
    searchTerm, 
    setSearchTerm,
    columns,
    setSort,
    sort 
  } = useStore();

  const getTagCount = (tag: Tag) => {
    return columns.reduce((count, column) => {
      return count + column.cards.filter(card => card.tags.includes(tag)).length;
    }, 0);
  };

  const handleTagClick = (tag: Tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchTerm('');
  };

  const availableTags: Tag[] = [
    '🔥 Urgent',
    '🏠 Remote',
    '⭐ Dream Job',
    '⏳ Follow Up',
    '🤝 Referred',
  ];

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {tag} ({getTagCount(tag)})
            </button>
          ))}
          {(selectedTags.length > 0 || searchTerm) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="ml-2"
            >
              Clear Filters
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 rounded-md border border-input bg-transparent pl-9 pr-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as 'recent' | 'company')}
            className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="recent">Most Recent</option>
            <option value="company">Company A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}