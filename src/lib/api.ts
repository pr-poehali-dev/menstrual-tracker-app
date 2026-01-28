const API_URL = 'https://functions.poehali.dev/bdfc1a9d-f131-41cb-89cd-9ccfe004caec';
const USER_ID = '1';

interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

async function apiCall(path: string, options: ApiOptions = {}) {
  const { method = 'GET', body, headers = {} } = options;
  
  const url = `${API_URL}?path=${path}`;
  
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': USER_ID,
      ...headers,
    },
  };
  
  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }
  
  const response = await fetch(url, fetchOptions);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return response.json();
}

export const api = {
  getDashboard: () => apiCall('dashboard'),
  
  getSymptoms: () => apiCall('symptoms'),
  addSymptom: (data: any) => apiCall('symptom', { method: 'POST', body: data }),
  
  getMood: () => apiCall('mood'),
  addMood: (data: any) => apiCall('mood', { method: 'POST', body: data }),
  
  addSleep: (data: any) => apiCall('sleep', { method: 'POST', body: data }),
  
  addWorkout: (data: any) => apiCall('workout', { method: 'POST', body: data }),
  
  addNutrition: (data: any) => apiCall('nutrition', { method: 'POST', body: data }),
  
  getGoals: () => apiCall('goals'),
  addGoal: (data: any) => apiCall('goal', { method: 'POST', body: data }),
  updateGoal: (data: any) => apiCall('goal', { method: 'PUT', body: data }),
  
  getDiary: () => apiCall('diary'),
  addDiaryEntry: (data: any) => apiCall('diary', { method: 'POST', body: data }),
  updateDiaryEntry: (data: any) => apiCall('diary', { method: 'PUT', body: data }),
  
  getCommunityPosts: () => apiCall('community'),
  addCommunityPost: (data: any) => apiCall('post', { method: 'POST', body: data }),
  addComment: (data: any) => apiCall('comment', { method: 'POST', body: data }),
  toggleLike: (data: any) => apiCall('like', { method: 'POST', body: data }),
  
  getProfile: () => apiCall('profile'),
  updateProfile: (data: any) => apiCall('profile', { method: 'PUT', body: data }),
  updateCycleSettings: (data: any) => apiCall('cycle-settings', { method: 'PUT', body: data }),
  
  getAppointments: () => apiCall('appointments'),
  addAppointment: (data: any) => apiCall('appointment', { method: 'POST', body: data }),
  
  addPeriod: (data: any) => apiCall('period', { method: 'POST', body: data }),
  addMedication: (data: any) => apiCall('medication', { method: 'POST', body: data }),
  addWeight: (data: any) => apiCall('weight', { method: 'POST', body: data }),
  addTemperature: (data: any) => apiCall('temperature', { method: 'POST', body: data }),
};
