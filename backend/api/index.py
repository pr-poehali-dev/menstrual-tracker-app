"""
API для управления данными приложения FemCare.
Обрабатывает все запросы по работе с пользователями, циклом, симптомами, дневниками и сообществом.
"""

import json
import os
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    user_id = headers.get('X-User-Id', '1')
    path = event.get('queryStringParameters', {}).get('path', '')
    
    try:
        conn = get_db_connection()
        
        if method == 'GET':
            if path == 'dashboard':
                result = get_dashboard_data(conn, user_id)
            elif path == 'symptoms':
                result = get_symptoms(conn, user_id)
            elif path == 'mood':
                result = get_mood_data(conn, user_id)
            elif path == 'goals':
                result = get_goals(conn, user_id)
            elif path == 'diary':
                result = get_diary_entries(conn, user_id)
            elif path == 'community':
                result = get_community_posts(conn)
            elif path == 'profile':
                result = get_user_profile(conn, user_id)
            elif path == 'appointments':
                result = get_appointments(conn, user_id)
            else:
                result = {'error': 'Unknown path'}
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            if path == 'symptom':
                result = add_symptom(conn, user_id, body)
            elif path == 'mood':
                result = add_mood(conn, user_id, body)
            elif path == 'sleep':
                result = add_sleep(conn, user_id, body)
            elif path == 'workout':
                result = add_workout(conn, user_id, body)
            elif path == 'nutrition':
                result = add_nutrition(conn, user_id, body)
            elif path == 'goal':
                result = add_goal(conn, user_id, body)
            elif path == 'diary':
                result = add_diary_entry(conn, user_id, body)
            elif path == 'post':
                result = add_community_post(conn, user_id, body)
            elif path == 'comment':
                result = add_comment(conn, user_id, body)
            elif path == 'like':
                result = toggle_like(conn, user_id, body)
            elif path == 'appointment':
                result = add_appointment(conn, user_id, body)
            elif path == 'period':
                result = add_period(conn, user_id, body)
            elif path == 'medication':
                result = add_medication(conn, user_id, body)
            elif path == 'weight':
                result = add_weight(conn, user_id, body)
            elif path == 'temperature':
                result = add_temperature(conn, user_id, body)
            else:
                result = {'error': 'Unknown path'}
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            
            if path == 'goal':
                result = update_goal(conn, user_id, body)
            elif path == 'profile':
                result = update_profile(conn, user_id, body)
            elif path == 'cycle-settings':
                result = update_cycle_settings(conn, user_id, body)
            elif path == 'diary':
                result = update_diary_entry(conn, user_id, body)
            else:
                result = {'error': 'Unknown path'}
        
        else:
            result = {'error': 'Method not allowed'}
        
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result, default=str),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }

def get_dashboard_data(conn, user_id):
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("""
            SELECT average_cycle_length, period_duration, last_period_date
            FROM cycle_settings WHERE user_id = %s
        """, (user_id,))
        cycle_settings = cur.fetchone()
        
        if not cycle_settings:
            cycle_settings = {
                'average_cycle_length': 28,
                'period_duration': 5,
                'last_period_date': datetime.now().date()
            }
        
        cur.execute("""
            SELECT symptom_type, severity, date
            FROM symptoms 
            WHERE user_id = %s AND date >= CURRENT_DATE - INTERVAL '7 days'
            ORDER BY date DESC
        """, (user_id,))
        symptoms = cur.fetchall()
        
        cur.execute("""
            SELECT date, mood_level, mood_emoji
            FROM mood_entries
            WHERE user_id = %s AND date >= CURRENT_DATE - INTERVAL '7 days'
            ORDER BY date ASC
        """, (user_id,))
        mood_data = cur.fetchall()
        
        cur.execute("""
            SELECT title, current_value, target_value, goal_type
            FROM goals
            WHERE user_id = %s AND is_completed = false
            LIMIT 5
        """, (user_id,))
        goals = cur.fetchall()
        
        return {
            'cycle': cycle_settings,
            'symptoms': symptoms,
            'mood': mood_data,
            'goals': goals
        }

def get_symptoms(conn, user_id):
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("""
            SELECT id, date, symptom_type, severity, notes, created_at
            FROM symptoms
            WHERE user_id = %s
            ORDER BY date DESC
            LIMIT 50
        """, (user_id,))
        return cur.fetchall()

def add_symptom(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO symptoms (user_id, date, symptom_type, severity, notes)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
        """, (user_id, body['date'], body['symptom_type'], body.get('severity', 50), body.get('notes', '')))
        conn.commit()
        return {'id': cur.fetchone()[0], 'success': True}

def get_mood_data(conn, user_id):
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("""
            SELECT date, mood_level, mood_emoji, notes
            FROM mood_entries
            WHERE user_id = %s AND date >= CURRENT_DATE - INTERVAL '30 days'
            ORDER BY date DESC
        """, (user_id,))
        return cur.fetchall()

def add_mood(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO mood_entries (user_id, date, mood_level, mood_emoji, notes)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
        """, (user_id, body['date'], body['mood_level'], body.get('mood_emoji', '😊'), body.get('notes', '')))
        conn.commit()
        return {'id': cur.fetchone()[0], 'success': True}

def add_sleep(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO sleep_tracking (user_id, date, hours, quality, notes)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
        """, (user_id, body['date'], body['hours'], body.get('quality', 7), body.get('notes', '')))
        conn.commit()
        return {'id': cur.fetchone()[0], 'success': True}

def add_workout(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO workouts (user_id, date, workout_type, duration_minutes, intensity, notes)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (user_id, body['date'], body['workout_type'], body.get('duration_minutes', 30), 
              body.get('intensity', 'medium'), body.get('notes', '')))
        conn.commit()
        return {'id': cur.fetchone()[0], 'success': True}

def add_nutrition(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO nutrition_log (user_id, date, meal_type, description, calories, water_intake_ml)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (user_id, body['date'], body.get('meal_type', 'snack'), body.get('description', ''),
              body.get('calories', 0), body.get('water_intake_ml', 0)))
        conn.commit()
        return {'id': cur.fetchone()[0], 'success': True}

def get_goals(conn, user_id):
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("""
            SELECT id, title, description, target_value, current_value, goal_type, 
                   start_date, end_date, is_completed
            FROM goals
            WHERE user_id = %s
            ORDER BY is_completed ASC, created_at DESC
        """, (user_id,))
        return cur.fetchall()

def add_goal(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO goals (user_id, title, description, target_value, goal_type, start_date, end_date)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (user_id, body['title'], body.get('description', ''), body.get('target_value', 100),
              body.get('goal_type', 'general'), body.get('start_date'), body.get('end_date')))
        conn.commit()
        return {'id': cur.fetchone()[0], 'success': True}

def update_goal(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            UPDATE goals 
            SET current_value = %s, is_completed = %s
            WHERE id = %s AND user_id = %s
        """, (body['current_value'], body.get('is_completed', False), body['id'], user_id))
        conn.commit()
        return {'success': True}

def get_diary_entries(conn, user_id):
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("""
            SELECT id, date, mood_emoji, title, content, is_private, created_at, updated_at
            FROM diary_entries
            WHERE user_id = %s
            ORDER BY date DESC
            LIMIT 50
        """, (user_id,))
        return cur.fetchall()

def add_diary_entry(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO diary_entries (user_id, date, mood_emoji, title, content, is_private)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (user_id, body['date'], body.get('mood_emoji', '😊'), body.get('title', ''),
              body['content'], body.get('is_private', True)))
        conn.commit()
        return {'id': cur.fetchone()[0], 'success': True}

def update_diary_entry(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            UPDATE diary_entries
            SET title = %s, content = %s, mood_emoji = %s, updated_at = CURRENT_TIMESTAMP
            WHERE id = %s AND user_id = %s
        """, (body.get('title', ''), body['content'], body.get('mood_emoji', '😊'), body['id'], user_id))
        conn.commit()
        return {'success': True}

def get_community_posts(conn):
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("""
            SELECT cp.id, cp.title, cp.content, cp.likes_count, cp.comments_count, 
                   cp.created_at, u.name as author_name, u.email as author_email
            FROM community_posts cp
            JOIN users u ON cp.user_id = u.id
            WHERE cp.is_published = true
            ORDER BY cp.created_at DESC
            LIMIT 50
        """)
        return cur.fetchall()

def add_community_post(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO community_posts (user_id, title, content)
            VALUES (%s, %s, %s)
            RETURNING id
        """, (user_id, body.get('title', ''), body['content']))
        conn.commit()
        return {'id': cur.fetchone()[0], 'success': True}

def add_comment(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO post_comments (post_id, user_id, content)
            VALUES (%s, %s, %s)
            RETURNING id
        """, (body['post_id'], user_id, body['content']))
        
        cur.execute("""
            UPDATE community_posts 
            SET comments_count = comments_count + 1
            WHERE id = %s
        """, (body['post_id'],))
        
        conn.commit()
        return {'id': cur.fetchone()[0], 'success': True}

def toggle_like(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            SELECT id FROM post_likes 
            WHERE post_id = %s AND user_id = %s
        """, (body['post_id'], user_id))
        
        existing = cur.fetchone()
        
        if existing:
            cur.execute("""
                UPDATE community_posts 
                SET likes_count = likes_count - 1
                WHERE id = %s
            """, (body['post_id'],))
            return {'liked': False, 'success': True}
        else:
            cur.execute("""
                INSERT INTO post_likes (post_id, user_id)
                VALUES (%s, %s)
            """, (body['post_id'], user_id))
            
            cur.execute("""
                UPDATE community_posts 
                SET likes_count = likes_count + 1
                WHERE id = %s
            """, (body['post_id'],))
            
            conn.commit()
            return {'liked': True, 'success': True}

def get_user_profile(conn, user_id):
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("""
            SELECT id, email, name, avatar_url, created_at
            FROM users WHERE id = %s
        """, (user_id,))
        user = cur.fetchone()
        
        cur.execute("""
            SELECT average_cycle_length, period_duration, last_period_date
            FROM cycle_settings WHERE user_id = %s
        """, (user_id,))
        settings = cur.fetchone()
        
        cur.execute("""
            SELECT id, title, description, reminder_type, is_active
            FROM reminders WHERE user_id = %s
        """, (user_id,))
        reminders = cur.fetchall()
        
        return {
            'user': user,
            'cycle_settings': settings,
            'reminders': reminders
        }

def update_profile(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            UPDATE users
            SET name = %s, updated_at = CURRENT_TIMESTAMP
            WHERE id = %s
        """, (body['name'], user_id))
        conn.commit()
        return {'success': True}

def update_cycle_settings(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO cycle_settings (user_id, average_cycle_length, period_duration, last_period_date)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (user_id) 
            DO UPDATE SET 
                average_cycle_length = EXCLUDED.average_cycle_length,
                period_duration = EXCLUDED.period_duration,
                last_period_date = EXCLUDED.last_period_date,
                updated_at = CURRENT_TIMESTAMP
        """, (user_id, body['average_cycle_length'], body['period_duration'], body['last_period_date']))
        conn.commit()
        return {'success': True}

def get_appointments(conn, user_id):
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("""
            SELECT id, doctor_name, specialization, appointment_date, appointment_time, notes, is_completed
            FROM doctor_appointments
            WHERE user_id = %s
            ORDER BY appointment_date ASC
        """, (user_id,))
        return cur.fetchall()

def add_appointment(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO doctor_appointments (user_id, doctor_name, specialization, appointment_date, appointment_time, notes)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (user_id, body.get('doctor_name', ''), body.get('specialization', ''),
              body['appointment_date'], body.get('appointment_time'), body.get('notes', '')))
        conn.commit()
        return {'id': cur.fetchone()[0], 'success': True}

def add_period(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO periods (user_id, start_date, end_date, flow_level, notes)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
        """, (user_id, body['start_date'], body.get('end_date'), body.get('flow_level', 'medium'), body.get('notes', '')))
        conn.commit()
        return {'id': cur.fetchone()[0], 'success': True}

def add_medication(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO medications (user_id, name, dosage, frequency, start_date, end_date)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (user_id, body['name'], body.get('dosage', ''), body.get('frequency', ''),
              body.get('start_date'), body.get('end_date')))
        conn.commit()
        return {'id': cur.fetchone()[0], 'success': True}

def add_weight(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO weight_tracking (user_id, date, weight_kg, notes)
            VALUES (%s, %s, %s, %s)
            RETURNING id
        """, (user_id, body['date'], body['weight_kg'], body.get('notes', '')))
        conn.commit()
        return {'id': cur.fetchone()[0], 'success': True}

def add_temperature(conn, user_id, body):
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO temperature_tracking (user_id, date, time, temperature, measurement_type)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
        """, (user_id, body['date'], body.get('time'), body['temperature'], body.get('measurement_type', 'oral')))
        conn.commit()
        return {'id': cur.fetchone()[0], 'success': True}
