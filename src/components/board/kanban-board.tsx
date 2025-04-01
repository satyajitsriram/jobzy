import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { JobCard as JobCardType } from '../../types';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core';
import { useToast } from '../ui/use-toast';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu';
import { Copy, Trash2, Edit } from 'lucide-react';
import { AddJobDialog } from '../job/add-job-dialog';

const emptyStateMessages: Record<string, string> = {
  'job-list': 'Start your job hunt here',
  'referral': 'Reach out to your network',
  'applied': 'Hope is in the inbox',
  'assessment': 'Tests incoming?',
  'interview': 'Nail that next round!',
  'offer': 'Great news awaits',
  'rejected': 'Rejections ≠ Failure',
};

function DraggableJobCard({ card }: { card: JobCardType }) {
  const { deleteCard, duplicateCard } = useStore();
  const { toast } = useToast();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
    data: {
      columnId: card.columnId,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const handleDelete = () => {
    deleteCard(card.id);
    toast({
      title: '🗑️ Card deleted',
      description: 'The job card has been removed.',
    });
  };

  const handleDuplicate = () => {
    duplicateCard(card);
    toast({
      title: '✅ Card duplicated',
      description: 'A copy of the job card has been created.',
    });
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className="mb-3 cursor-grab rounded-lg border bg-card p-4 shadow-sm transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg hover:ring-1 hover:ring-primary/20 active:cursor-grabbing"
          >
            <h3 className="font-medium leading-snug">{card.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{card.company}</p>
            {card.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {card.jobLink && (
              <a
                href={card.jobLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-xs text-blue-500 hover:underline"
              >
                View Job Post →
              </a>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => setIsEditOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </ContextMenuItem>
          <ContextMenuItem onClick={handleDuplicate}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </ContextMenuItem>
          <ContextMenuItem onClick={handleDelete} className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <AddJobDialog 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen}
        editCard={card}
      />
    </>
  );
}

function DroppableColumn({ column, children }: { column: any; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex h-[calc(100vh-16rem)] w-[200px] shrink-0 flex-col rounded-lg border bg-card shadow-sm transition-all duration-200 ease-in-out hover:shadow-md hover:ring-1 hover:ring-primary/10"
    >
      <div className="flex h-14 items-center gap-2 border-b px-4">
        <span className="text-lg leading-none">{column.icon}</span>
        <h2 className="text-sm font-semibold tracking-wide">{column.title}</h2>
        <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {column.cards.length}
        </span>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-3">
        {children}
      </div>
    </div>
  );
}

export function KanbanBoard() {
  const { columns, selectedTags, searchTerm, sort, moveCard } = useStore();
  const { toast } = useToast();
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    
    if (!over) return;

    const cardId = active.id as string;
    const sourceColumnId = active.data.current?.columnId;
    const targetColumnId = over.id as string;

    if (sourceColumnId !== targetColumnId) {
      moveCard(cardId, sourceColumnId, targetColumnId);
      const targetColumn = columns.find((col) => col.id === targetColumnId);
      toast({
        title: '✅ Card moved',
        description: `Moved to ${targetColumn?.title}`,
      });
    }
  };

  const filterCards = (cards: JobCardType[]) => {
    return cards
      .filter((card) => {
        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.every((tag) => card.tags.includes(tag));
        const matchesSearch =
          !searchTerm ||
          card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.company.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTags && matchesSearch;
      })
      .sort((a, b) => {
        if (sort === 'recent') {
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
        }
        return a.company.localeCompare(b.company);
      });
  };

  return (
    <DndContext 
      sensors={sensors} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="mx-auto max-w-[1800px] rounded-lg border bg-gradient-to-b from-gray-50/80 to-gray-50/30 p-4 shadow-sm dark:from-neutral-900/80 dark:to-neutral-900/30">
        <div className="flex gap-3 overflow-x-auto pb-4">
          {columns.map((column) => {
            const filteredCards = filterCards(column.cards);
            return (
              <DroppableColumn key={column.id} column={column}>
                {filteredCards.length === 0 ? (
                  <p className="p-4 text-center text-sm italic text-muted-foreground">
                    {emptyStateMessages[column.id]}
                  </p>
                ) : (
                  filteredCards.map((card) => (
                    <DraggableJobCard key={card.id} card={card} />
                  ))
                )}
              </DroppableColumn>
            );
          })}
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <div className="rounded-lg border bg-card p-4 shadow-lg">
            {columns.map(col => 
              col.cards.find(card => card.id === activeId)
            ).filter(Boolean)[0]?.title}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}