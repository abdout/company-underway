'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Plus, X } from 'lucide-react';
import ProjectCreateForm from './form';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export function ProjectCreateDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        className="flex items-center gap-2"
      >
        <Plus size={16} />
        Create Project
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-full h-screen p-0 overflow-hidden">
          {/* <DialogClose asChild className="absolute right-4 top-4">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose> */}
          <VisuallyHidden>
            <DialogTitle>Create Project</DialogTitle>
          </VisuallyHidden>
          <ProjectCreateForm onSuccess={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
} 