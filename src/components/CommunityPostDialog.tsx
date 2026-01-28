import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface CommunityPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const CommunityPostDialog = ({ open, onOpenChange, onSuccess }: CommunityPostDialogProps) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Напишите текст поста',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await api.addCommunityPost({
        content,
      });
      
      toast({
        title: 'Пост опубликован',
        description: 'Ваш пост появится в ленте сообщества',
      });
      
      onOpenChange(false);
      setContent('');
      onSuccess?.();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось опубликовать пост',
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
          <DialogTitle>Создать пост</DialogTitle>
          <DialogDescription>Поделитесь своим опытом с сообществом</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Текст поста</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Напишите о своем опыте, задайте вопрос или поделитесь советом..."
              rows={6}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Публикация...' : 'Опубликовать'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
