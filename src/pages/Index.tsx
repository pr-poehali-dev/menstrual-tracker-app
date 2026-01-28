import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('dashboard');

  const cycleDay = 14;
  const cycleLength = 28;
  const nextPeriodDays = 14;

  const symptoms = [
    { name: 'Боль', level: 40, icon: 'AlertCircle', color: 'bg-red-500' },
    { name: 'Настроение', level: 70, icon: 'Smile', color: 'bg-yellow-500' },
    { name: 'Энергия', level: 85, icon: 'Zap', color: 'bg-green-500' },
    { name: 'Сон', level: 60, icon: 'Moon', color: 'bg-blue-500' },
  ];

  const moodData = [
    { day: 'Пн', mood: 8, color: 'bg-green-400' },
    { day: 'Вт', mood: 6, color: 'bg-yellow-400' },
    { day: 'Ср', mood: 7, color: 'bg-green-400' },
    { day: 'Чт', mood: 5, color: 'bg-orange-400' },
    { day: 'Пт', mood: 9, color: 'bg-green-500' },
    { day: 'Сб', mood: 8, color: 'bg-green-400' },
    { day: 'Вс', mood: 7, color: 'bg-green-400' },
  ];

  const tips = [
    { title: 'Пейте больше воды', desc: 'Гидратация помогает при ПМС', icon: 'Droplet' },
    { title: 'Йога и растяжка', desc: 'Облегчает менструальные боли', icon: 'Sparkles' },
    { title: 'Продукты с железом', desc: 'Восполните потерю железа', icon: 'Apple' },
  ];

  const community = [
    { author: 'Мария К.', text: 'Как вы справляетесь с ПМС? Поделитесь советами!', likes: 24, comments: 12 },
    { author: 'Анна С.', text: 'Начала заниматься йогой - боли стали меньше!', likes: 45, comments: 8 },
    { author: 'Елена П.', text: 'Кто пробовал отслеживать питание по фазам цикла?', likes: 18, comments: 15 },
  ];

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
                    Симптомы сегодня
                  </CardTitle>
                  <CardDescription>Отслеживание состояния</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {symptoms.map((symptom, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Icon name={symptom.icon as any} size={16} className="text-gray-600" />
                          <span className="text-sm font-medium">{symptom.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{symptom.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${symptom.color} transition-all duration-500`}
                          style={{ width: `${symptom.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить симптом
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-slide-up md:col-span-2 lg:col-span-1" style={{ animationDelay: '0.2s' }}>
                <div className="h-2 bg-gradient-to-r from-cyan-400 via-teal-500 to-green-400" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Target" className="text-cyan-500" />
                    Цели недели
                  </CardTitle>
                  <CardDescription>Ваш прогресс</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>💧 Водный баланс</span>
                      <span className="font-semibold text-cyan-600">7/8 стаканов</span>
                    </div>
                    <Progress value={87.5} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>🧘‍♀️ Йога</span>
                      <span className="font-semibold text-purple-600">4/5 дней</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>😴 Сон 8 часов</span>
                      <span className="font-semibold text-blue-600">5/7 дней</span>
                    </div>
                    <Progress value={71} className="h-2" />
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-cyan-50 p-3 rounded-lg mt-4">
                    <p className="text-sm font-semibold text-green-700">🎉 Отличная работа!</p>
                    <p className="text-xs text-green-600 mt-1">Вы на правильном пути к здоровью</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Smile" className="text-yellow-500" />
                    Настроение на неделе
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between gap-2 h-48">
                    {moodData.map((item, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className={`w-full ${item.color} rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer`}
                          style={{ height: `${item.mood * 10}%` }}
                        />
                        <span className="text-xs font-medium text-gray-600">{item.day}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-pink-500" />
                    Быстрая статистика
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl">
                      <Icon name="Droplet" className="text-pink-500 mb-2" />
                      <p className="text-2xl font-bold text-pink-700">28</p>
                      <p className="text-xs text-pink-600">Средняя длина цикла</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                      <Icon name="Moon" className="text-purple-500 mb-2" />
                      <p className="text-2xl font-bold text-purple-700">7.5</p>
                      <p className="text-xs text-purple-600">Часов сна в среднем</p>
                    </div>
                    <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-xl">
                      <Icon name="Activity" className="text-cyan-500 mb-2" />
                      <p className="text-2xl font-bold text-cyan-700">4</p>
                      <p className="text-xs text-cyan-600">Тренировок в неделю</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
                      <Icon name="Heart" className="text-orange-500 mb-2" />
                      <p className="text-2xl font-bold text-orange-700">85%</p>
                      <p className="text-xs text-orange-600">Общее самочувствие</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Calendar" className="text-pink-500" />
                    Календарь цикла
                  </CardTitle>
                  <CardDescription>Отслеживайте важные даты и события</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-xl border-0 shadow-inner bg-gradient-to-br from-pink-50 to-purple-50"
                  />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Прогнозы</CardTitle>
                  <CardDescription>Следующие события</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Droplet" className="text-pink-500" size={20} />
                      <span className="font-semibold text-pink-700">Менструация</span>
                    </div>
                    <p className="text-sm text-pink-600">14 февраля (через 14 дней)</p>
                    <Button variant="outline" className="mt-3 w-full border-pink-300">
                      Напомнить
                    </Button>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Sparkles" className="text-purple-500" size={20} />
                      <span className="font-semibold text-purple-700">Овуляция</span>
                    </div>
                    <p className="text-sm text-purple-600">7 февраля (через 7 дней)</p>
                    <Button variant="outline" className="mt-3 w-full border-purple-300">
                      Напомнить
                    </Button>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Stethoscope" className="text-cyan-500" size={20} />
                      <span className="font-semibold text-cyan-700">Визит к врачу</span>
                    </div>
                    <p className="text-sm text-cyan-600">25 февраля</p>
                    <Button variant="outline" className="mt-3 w-full border-cyan-300">
                      Изменить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="symptoms" className="animate-fade-in">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Activity" className="text-purple-500" />
                  Запись симптомов
                </CardTitle>
                <CardDescription>Отслеживайте физическое и эмоциональное состояние</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: 'HeartPulse', label: 'Боль', color: 'from-red-400 to-red-600' },
                    { icon: 'Smile', label: 'Настроение', color: 'from-yellow-400 to-yellow-600' },
                    { icon: 'Zap', label: 'Энергия', color: 'from-green-400 to-green-600' },
                    { icon: 'Moon', label: 'Сон', color: 'from-blue-400 to-blue-600' },
                    { icon: 'Apple', label: 'Питание', color: 'from-orange-400 to-orange-600' },
                    { icon: 'Dumbbell', label: 'Тренировки', color: 'from-purple-400 to-purple-600' },
                    { icon: 'Droplet', label: 'Вода', color: 'from-cyan-400 to-cyan-600' },
                    { icon: 'Thermometer', label: 'Температура', color: 'from-pink-400 to-pink-600' },
                  ].map((item, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="h-24 flex flex-col gap-2 hover:scale-105 transition-transform"
                    >
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                        <Icon name={item.icon as any} className="text-white" size={24} />
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </Button>
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Последние записи</h3>
                  {[
                    { date: 'Сегодня, 10:30', symptoms: ['Легкая боль', 'Хорошее настроение'], mood: '😊' },
                    { date: 'Вчера, 15:20', symptoms: ['Усталость', 'Сон 7ч'], mood: '😴' },
                    { date: '29 янв, 09:15', symptoms: ['Отличная энергия', 'Тренировка 45мин'], mood: '💪' },
                  ].map((record, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-white to-pink-50 p-4 rounded-xl border border-pink-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">{record.date}</span>
                        <span className="text-2xl">{record.mood}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {record.symptoms.map((symptom, sidx) => (
                          <Badge key={sidx} variant="secondary" className="bg-pink-100 text-pink-700">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-pink-500" />
                    Анализ цикла
                  </CardTitle>
                  <CardDescription>За последние 6 месяцев</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl">
                      <p className="text-sm text-muted-foreground">Средняя длина цикла</p>
                      <p className="text-3xl font-bold text-pink-600">28.2 дня</p>
                      <p className="text-xs text-green-600 mt-1">↑ Стабильный цикл</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-cyan-50 p-4 rounded-xl">
                      <p className="text-sm text-muted-foreground">Длительность менструации</p>
                      <p className="text-3xl font-bold text-purple-600">5.1 дня</p>
                      <p className="text-xs text-muted-foreground mt-1">Норма 3-7 дней</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart3" className="text-purple-500" />
                    Корреляция симптомов
                  </CardTitle>
                  <CardDescription>Связь с фазами цикла</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { symptom: 'Боль', phase: 'Менструация', level: 80 },
                    { symptom: 'Энергия', phase: 'Овуляция', level: 90 },
                    { symptom: 'Настроение', phase: 'Фолликулярная', level: 85 },
                    { symptom: 'Сон', phase: 'Лютеиновая', level: 65 },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.symptom}</span>
                        <span className="text-muted-foreground">{item.phase}</span>
                      </div>
                      <Progress value={item.level} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Activity" className="text-cyan-500" />
                  Общее самочувствие
                </CardTitle>
                <CardDescription>Динамика за месяц</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {Array.from({ length: 28 }, (_, i) => {
                    const height = Math.random() * 80 + 20;
                    const colors = ['bg-pink-400', 'bg-purple-400', 'bg-cyan-400', 'bg-green-400'];
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    return (
                      <div
                        key={i}
                        className={`flex-1 ${color} rounded-t hover:opacity-80 transition-all cursor-pointer`}
                        style={{ height: `${height}%` }}
                        title={`День ${i + 1}`}
                      />
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tips.map((tip, idx) => (
                <Card key={idx} className="border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center mb-3">
                      <Icon name={tip.icon as any} className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                    <CardDescription>{tip.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">Подробнее</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BookOpen" className="text-purple-500" />
                  Персональные рекомендации
                </CardTitle>
                <CardDescription>На основе вашего цикла и симптомов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-cyan-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-green-700 mb-2">🥗 Питание</h4>
                  <p className="text-sm text-green-600">
                    Во время фолликулярной фазы увеличьте потребление белка и железа. Отлично подойдут: курица, рыба, шпинат, бобовые.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-purple-700 mb-2">🏃‍♀️ Тренировки</h4>
                  <p className="text-sm text-purple-600">
                    Сейчас хорошее время для интенсивных тренировок - ваша энергия на пике! Попробуйте HIIT или силовые упражнения.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-blue-700 mb-2">😴 Сон</h4>
                  <p className="text-sm text-blue-600">
                    Старайтесь ложиться спать до 23:00 для восстановления гормонального баланса. Избегайте кофеина после 16:00.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="animate-fade-in">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" className="text-pink-500" />
                  Сообщество FemCare
                </CardTitle>
                <CardDescription>Общайтесь, делитесь опытом и получайте поддержку</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать пост
                </Button>

                <Separator />

                {community.map((post, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-white to-pink-50 p-5 rounded-xl border border-pink-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{post.author}</p>
                        <p className="text-xs text-muted-foreground">2 часа назад</p>
                      </div>
                    </div>
                    <p className="text-sm mb-3">{post.text}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Icon name="Heart" size={16} className="text-pink-500" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Icon name="MessageCircle" size={16} className="text-purple-500" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Share2" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diary" className="animate-fade-in">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BookOpen" className="text-purple-500" />
                  Личный дневник
                </CardTitle>
                <CardDescription>Записывайте мысли, чувства и наблюдения</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Новая запись
                </Button>

                <Separator />

                {[
                  { date: '31 января 2026', mood: '😊', text: 'Отличный день! Утром была на йоге, чувствую прилив энергии. Настроение стабильное.' },
                  { date: '30 января 2026', mood: '😌', text: 'Немного устала, но в целом всё хорошо. Пила травяной чай вечером, спалось лучше.' },
                  { date: '29 января 2026', mood: '💪', text: 'Начала пробовать интервальные тренировки - сложно, но интересно! Чувствую себя сильнее.' },
                ].map((entry, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-white via-purple-50 to-pink-50 p-5 rounded-xl border border-purple-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-purple-700">{entry.date}</span>
                      <span className="text-2xl">{entry.mood}</span>
                    </div>
                    <p className="text-sm text-gray-700">{entry.text}</p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit" size={14} className="mr-1" />
                        Изменить
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Lock" size={14} className="mr-1" />
                        Защищено
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Профиль</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-24 h-24">
                      <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white text-2xl">
                        МК
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">Мария Кузнецова</h3>
                      <p className="text-sm text-muted-foreground">maria@example.com</p>
                    </div>
                    <Button variant="outline" className="w-full">Изменить фото</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Settings" className="text-purple-500" />
                    Настройки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Параметры цикла</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Средняя длина цикла</label>
                        <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-3 rounded-lg">
                          <p className="text-lg font-semibold text-pink-700">28 дней</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Длительность менструации</label>
                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg">
                          <p className="text-lg font-semibold text-purple-700">5 дней</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Напоминания</h4>
                    <div className="space-y-2">
                      {[
                        { label: 'О начале менструации', enabled: true },
                        { label: 'О приёме витаминов', enabled: true },
                        { label: 'О визите к врачу', enabled: false },
                        { label: 'О питье воды', enabled: true },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm">{item.label}</span>
                          <div className={`w-10 h-6 rounded-full ${item.enabled ? 'bg-gradient-to-r from-pink-400 to-purple-500' : 'bg-gray-300'} relative transition-colors`}>
                            <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-all ${item.enabled ? 'right-1' : 'left-1'}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Приватность</h4>
                    <Button variant="outline" className="w-full justify-between">
                      <span>Экспорт данных</span>
                      <Icon name="Download" size={16} />
                    </Button>
                    <Button variant="outline" className="w-full justify-between text-red-600 border-red-200 hover:bg-red-50">
                      <span>Удалить все данные</span>
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="h-16" />
    </div>
  );
};

export default Index;
