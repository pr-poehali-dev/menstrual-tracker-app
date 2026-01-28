import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface SymptomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  symptomType: string;
  onSuccess?: () => void;
}

export const SymptomDialog = ({ open, onOpenChange, symptomType, onSuccess }: SymptomDialogProps) => {
  const [severity, setSeverity] = useState([50]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.addSymptom({
        date: new Date().toISOString().split('T')[0],
        symptom_type: symptomType,
        severity: severity[0],
        notes,
      });
      
      toast({
        title: 'Симптом добавлен',
        description: 'Запись успешно сохранена',
      });
      
      onOpenChange(false);
      setSeverity([50]);
      setNotes('');
      onSuccess?.();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить симптом',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить {symptomType}</DialogTitle>
          <DialogDescription>Укажите уровень и заметки</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Уровень: {severity[0]}%</Label>
            <Slider
              value={severity}
              onValueChange={setSeverity}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Заметки</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Дополнительная информация..."
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
