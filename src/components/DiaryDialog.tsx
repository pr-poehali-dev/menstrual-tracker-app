import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface DiaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const DiaryDialog = ({ open, onOpenChange, onSuccess }: DiaryDialogProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [moodEmoji, setMoodEmoji] = useState('😊');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const moods = ['😊', '😄', '😌', '😐', '😔', '😢', '😴', '💪', '🤗', '😍'];

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Заполните текст записи',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await api.addDiaryEntry({
        date: new Date().toISOString().split('T')[0],
        title,
        content,
        mood_emoji: moodEmoji,
        is_private: true,
      });
      
      toast({
        title: 'Запись добавлена',
        description: 'Ваша запись сохранена в дневнике',
      });
      
      onOpenChange(false);
      setTitle('');
      setContent('');
      setMoodEmoji('😊');
      onSuccess?.();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить запись',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Новая запись в дневнике</DialogTitle>
          <DialogDescription>Сохраните свои мысли и переживания</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Настроение</Label>
            <div className="flex gap-2 flex-wrap">
              {moods.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setMoodEmoji(emoji)}
                  className={`text-3xl p-2 rounded-lg transition-all ${
                    moodEmoji === emoji ? 'bg-pink-100 scale-110' : 'hover:bg-gray-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Заголовок (необязательно)</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Отличный день!"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Запись</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Напишите о своих мыслях, чувствах, событиях дня..."
              rows={6}
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
