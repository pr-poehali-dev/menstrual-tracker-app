import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import SymptomDialog from '@/components/SymptomDialog';
import DiaryDialog from '@/components/DiaryDialog';
import CommunityPostDialog from '@/components/CommunityPostDialog';

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [symptomDialogOpen, setSymptomDialogOpen] = useState(false);
  const [diaryDialogOpen, setDiaryDialogOpen] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const { toast } = useToast();

  const [cycleDay, setCycleDay] = useState(14);
  const [cycleLength, setCycleLength] = useState(28);
  const [nextPeriodDays, setNextPeriodDays] = useState(14);
  const [symptoms, setSymptoms] = useState<any[]>([]);
  const [moodData, setMoodData] = useState<any[]>([]);
  const [tips, setTips] = useState<any[]>([]);
  const [community, setCommunity] = useState<any[]>([]);

  const loadDashboardData = async () => {
    try {
      const data = await api.getDashboard();
      if (data.cycle) {
        setCycleDay(data.cycle.cycle_day || 14);
        setCycleLength(data.cycle.cycle_length || 28);
        setNextPeriodDays(data.cycle.next_period_days || 14);
      }
      if (data.symptoms) {
        setSymptoms(data.symptoms);
      }
      if (data.mood_data) {
        setMoodData(data.mood_data);
      }
      if (data.tips) {
        setTips(data.tips);
      }
      if (data.community) {
        setCommunity(data.community);
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить данные',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleSymptomAdded = () => {
    setSymptomDialogOpen(false);
    loadDashboardData();
    toast({
      title: 'Успешно',
      description: 'Симптом добавлен',
    });
  };

  const handleDiaryAdded = () => {
    setDiaryDialogOpen(false);
    loadDashboardData();
    toast({
      title: 'Успешно',
      description: 'Запись добавлена',
    });
  };

  const handlePostAdded = () => {
    setPostDialogOpen(false);
    loadDashboardData();
    toast({
      title: 'Успешно',
      description: 'Пост создан',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-pink-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                <Icon name="Heart" className="text-white" size={20} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                FemCare
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Bell" size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white text-xs flex items-center justify-center">
                  3
                </span>
              </Button>
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white">МК</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-2 bg-white/60 backdrop-blur p-2 rounded-2xl shadow-lg">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              <span className="hidden sm:inline">Дашборд</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Icon name="Calendar" size={16} className="mr-2" />
              <span className="hidden sm:inline">Календарь</span>
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Icon name="Activity" size={16} className="mr-2" />
              <span className="hidden sm:inline">Симптомы</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Icon name="TrendingUp" size={16} className="mr-2" />
              <span className="hidden sm:inline">Аналитика</span>
            </TabsTrigger>
            <TabsTrigger value="tips" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Icon name="Lightbulb" size={16} className="mr-2" />
              <span className="hidden sm:inline">Советы</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Icon name="Users" size={16} className="mr-2" />
              <span className="hidden sm:inline">Сообщество</span>
            </TabsTrigger>
            <TabsTrigger value="diary" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Icon name="BookOpen" size={16} className="mr-2" />
              <span className="hidden sm:inline">Дневник</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Icon name="User" size={16} className="mr-2" />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-slide-up">
                <div className="h-2 bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Calendar" className="text-pink-500" />
                    Цикл
                  </CardTitle>
                  <CardDescription>Текущая фаза цикла</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">День цикла</span>
                    <Badge className="bg-gradient-to-r from-pink-400 to-purple-500 text-white">
                      {cycleDay} из {cycleLength}
                    </Badge>
                  </div>
                  <Progress value={(cycleDay / cycleLength) * 100} className="h-3" />
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-purple-700">Фолликулярная фаза</p>
                    <p className="text-xs text-purple-600 mt-1">Высокая энергия, хорошее настроение</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Clock" size={16} className="text-pink-500" />
                    <span>Следующая менструация через {nextPeriodDays} дней</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="h-2 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Heart" className="text-purple-500" />
                    Симптомы
                  </CardTitle>
                  <CardDescription>Отслеживание самочувствия</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {symptoms.map((symptom, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full ${symptom.color} flex items-center justify-center`}>
                            <Icon name={symptom.icon} size={16} className="text-white" />
                          </div>
                          <span className="text-sm font-medium">{symptom.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{symptom.level}%</span>
                      </div>
                      <Progress value={symptom.level} className="h-2" />
                    </div>
                  ))}
                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600"
                    onClick={() => setSymptomDialogOpen(true)}
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить симптом
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-cyan-500" />
                    Настроение
                  </CardTitle>
                  <CardDescription>График за неделю</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between h-32 gap-2">
                    {moodData.map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className={`w-full ${item.color} rounded-t-lg transition-all hover:opacity-80`}
                          style={{ height: `${(item.mood / 10) * 100}%` }}
                        />
                        <span className="text-xs text-muted-foreground">{item.day}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="animate-fade-in">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" className="text-pink-500" />
                  Календарь цикла
                </CardTitle>
                <CardDescription>Отмечайте важные события</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-xl border shadow-lg"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="symptoms" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Activity" className="text-red-500" />
                    Физические симптомы
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['Боль', 'Вздутие', 'Головная боль', 'Усталость'].map((symptom, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
                      <span className="font-medium">{symptom}</span>
                      <Button variant="outline" size="sm" onClick={() => setSymptomDialogOpen(true)}>
                        <Icon name="Plus" size={14} />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Heart" className="text-purple-500" />
                    Эмоциональные симптомы
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['Настроение', 'Тревожность', 'Раздражительность', 'Концентрация'].map((symptom, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <span className="font-medium">{symptom}</span>
                      <Button variant="outline" size="sm" onClick={() => setSymptomDialogOpen(true)}>
                        <Icon name="Plus" size={14} />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart3" className="text-blue-500" />
                    Статистика цикла
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <span className="text-sm">Средняя длина цикла</span>
                    <Badge>{cycleLength} дней</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <span className="text-sm">Регулярность</span>
                    <Badge className="bg-green-500">Высокая</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Target" className="text-pink-500" />
                    Цели здоровья
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Вода (8 стаканов)</span>
                      <span>6/8</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Физическая активность</span>
                      <span>3/5</span>
                    </div>
                    <Progress value={60} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center mb-2">
                      <Icon name={tip.icon} className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{tip.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6 animate-fade-in">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" className="text-purple-500" />
                    Сообщество
                  </CardTitle>
                  <Button 
                    className="bg-gradient-to-r from-pink-400 to-purple-500"
                    onClick={() => setPostDialogOpen(true)}
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать пост
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {community.map((post, index) => (
                  <div key={index}>
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white">
                          {post.author.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{post.author}</span>
                          <span className="text-xs text-muted-foreground">2 часа назад</span>
                        </div>
                        <p className="text-sm">{post.text}</p>
                        <div className="flex gap-4">
                          <Button variant="ghost" size="sm" className="text-pink-500 hover:text-pink-600">
                            <Icon name="Heart" size={16} className="mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-purple-500 hover:text-purple-600">
                            <Icon name="MessageCircle" size={16} className="mr-1" />
                            {post.comments}
                          </Button>
                        </div>
                      </div>
                    </div>
                    {index < community.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diary" className="space-y-6 animate-fade-in">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BookOpen" className="text-pink-500" />
                    Личный дневник
                  </CardTitle>
                  <Button 
                    className="bg-gradient-to-r from-pink-400 to-purple-500"
                    onClick={() => setDiaryDialogOpen(true)}
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Новая запись
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { date: '15 января 2026', entry: 'Сегодня отличное самочувствие! Энергии много, настроение позитивное.' },
                  { date: '14 января 2026', entry: 'Немного устала, но в целом день прошел хорошо. Начала пить больше воды.' },
                  { date: '13 января 2026', entry: 'Легкие спазмы, но йога помогла. Нужно не забывать делать растяжку.' },
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Calendar" size={14} />
                      {item.date}
                    </div>
                    <p className="text-sm">{item.entry}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="User" className="text-purple-500" />
                    Профиль
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-24 h-24">
                      <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white text-2xl">
                        МК
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">Мария Карпова</h3>
                      <p className="text-sm text-muted-foreground">maria.k@example.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Settings" className="text-pink-500" />
                    Настройки цикла
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                    <span className="text-sm">Длина цикла</span>
                    <Badge>{cycleLength} дней</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <span className="text-sm">Длина менструации</span>
                    <Badge>5 дней</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <SymptomDialog 
        open={symptomDialogOpen} 
        onOpenChange={setSymptomDialogOpen}
        onSuccess={handleSymptomAdded}
      />
      <DiaryDialog 
        open={diaryDialogOpen} 
        onOpenChange={setDiaryDialogOpen}
        onSuccess={handleDiaryAdded}
      />
      <CommunityPostDialog 
        open={postDialogOpen} 
        onOpenChange={setPostDialogOpen}
        onSuccess={handlePostAdded}
      />
    </div>
  );
};

export default Index;
