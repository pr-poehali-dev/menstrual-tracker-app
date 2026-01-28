-- Добавление тестового пользователя для разработки
INSERT INTO users (id, email, name) 
VALUES (1, 'test@femcare.app', 'Мария Кузнецова') 
ON CONFLICT (id) DO UPDATE 
SET email = EXCLUDED.email, name = EXCLUDED.name;

-- Добавление настроек цикла для тестового пользователя
INSERT INTO cycle_settings (user_id, average_cycle_length, period_duration, last_period_date)
VALUES (1, 28, 5, CURRENT_DATE - INTERVAL '14 days')
ON CONFLICT (user_id) DO UPDATE
SET average_cycle_length = EXCLUDED.average_cycle_length,
    period_duration = EXCLUDED.period_duration,
    last_period_date = EXCLUDED.last_period_date;

-- Добавление примеров данных для демонстрации
INSERT INTO mood_entries (user_id, date, mood_level, mood_emoji)
VALUES 
  (1, CURRENT_DATE, 8, '😊'),
  (1, CURRENT_DATE - 1, 6, '😌'),
  (1, CURRENT_DATE - 2, 7, '😊'),
  (1, CURRENT_DATE - 3, 5, '😐'),
  (1, CURRENT_DATE - 4, 9, '😄'),
  (1, CURRENT_DATE - 5, 8, '😊'),
  (1, CURRENT_DATE - 6, 7, '😊');

INSERT INTO goals (user_id, title, description, target_value, current_value, goal_type)
VALUES
  (1, 'Водный баланс', 'Пить 8 стаканов воды в день', 8, 7, 'water'),
  (1, 'Йога', 'Заниматься йогой 5 дней в неделю', 5, 4, 'exercise'),
  (1, 'Сон 8 часов', 'Спать не менее 8 часов', 7, 5, 'sleep');

INSERT INTO community_posts (user_id, title, content, likes_count, comments_count)
VALUES
  (1, '', 'Как вы справляетесь с ПМС? Поделитесь советами!', 24, 12),
  (1, '', 'Начала заниматься йогой - боли стали меньше!', 45, 8),
  (1, '', 'Кто пробовал отслеживать питание по фазам цикла?', 18, 15);
