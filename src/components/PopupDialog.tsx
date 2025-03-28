import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface PopupDialogProps {
  title: string;
  description: string;
  placeholder?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (value: string) => void;
  validate?: (value: string) => string | null;
  submitLabel?: string;
  submitVariant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
}

export const PopupDialog: React.FC<PopupDialogProps> = ({
  title,
  description,
  placeholder,
  open,
  onOpenChange,
  onSubmit,
  validate,
  submitLabel,
  submitVariant
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (validate) {
      const validationError = validate(value);
      if (validationError) {
        setError(validationError);
        return;
      }
    }
    
    onSubmit(value);
    setValue('');
    setError(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Input
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant={submitVariant}>
              {submitLabel || 'Create'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};