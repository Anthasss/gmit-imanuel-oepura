class DashboardService {
  constructor() {
    this.baseURL = '/api';
  }

  async getMajelisDashboard() {
    try {
      const response = await fetch(`${this.baseURL}/dashboard/majelis`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch majelis dashboard');
      }
      
      return result.data;
    } catch (error) {
      console.error('Majelis Dashboard Service Error:', error);
      throw error;
    }
  }

  async getDashboardStats() {
    try {
      const response = await fetch(`${this.baseURL}/statistics/overview`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch dashboard statistics');
      }
      
      return result.data;
    } catch (error) {
      console.error('Dashboard Service Error:', error);
      throw error;
    }
  }

  async getRecentActivities() {
    try {
      // Get recent baptis, sidi activities
      const [baptisResponse, sidiResponse] = await Promise.all([
        fetch(`${this.baseURL}/baptis?limit=5`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'application/json',
          },
        }),
        fetch(`${this.baseURL}/sidi?limit=5`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'application/json',
          },
        })
      ]);

      const baptisResult = baptisResponse.ok ? await baptisResponse.json() : { success: false, data: null };
      const sidiResult = sidiResponse.ok ? await sidiResponse.json() : { success: false, data: null };

      const activities = [];

      // Process baptis data
      if (baptisResult.success && baptisResult.data?.items) {
        const baptisActivities = baptisResult.data.items.map(baptis => ({
          id: `baptis-${baptis.id}`,
          type: 'baptis',
          member: baptis.jemaat?.nama || 'Unknown',
          date: baptis.tanggal,
          status: 'completed'
        }));
        activities.push(...baptisActivities);
      }

      // Process sidi data
      if (sidiResult.success && sidiResult.data?.items) {
        const sidiActivities = sidiResult.data.items.map(sidi => ({
          id: `sidi-${sidi.id}`,
          type: 'sidi',
          member: sidi.jemaat?.nama || 'Unknown',
          date: sidi.tanggal,
          status: 'completed'
        }));
        activities.push(...sidiActivities);
      }

      // Sort by date and take the 10 most recent
      return activities
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);
        
    } catch (error) {
      console.error('Recent Activities Service Error:', error);
      return [];
    }
  }

  async getUpcomingEvents() {
    try {
      // Since we don't have a specific events table in schema, 
      // we'll create mock upcoming events based on worship schedules
      const currentDate = new Date();
      const nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

      // Mock upcoming events based on common church activities
      const upcomingEvents = [
        {
          id: 1,
          title: "Ibadah Minggu",
          date: this.getNextSunday(),
          time: "08:00",
          type: "worship",
        },
        {
          id: 2,
          title: "Persekutuan Remaja",
          date: this.getNextDay(6), // Saturday
          time: "19:00",
          type: "fellowship",
        },
        {
          id: 3,
          title: "Doa Pagi",
          date: this.getNextWeekday(),
          time: "06:00",
          type: "prayer",
        },
        {
          id: 4,
          title: "Persekutuan Wanita",
          date: this.getNextDay(3), // Wednesday
          time: "14:00",
          type: "fellowship",
        }
      ];

      return upcomingEvents.filter(event => new Date(event.date) <= nextWeek);
    } catch (error) {
      console.error('Upcoming Events Service Error:', error);
      return [];
    }
  }

  // Helper methods for date calculations
  getNextSunday() {
    const today = new Date();
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + (7 - today.getDay()));
    return nextSunday.toISOString().split('T')[0];
  }

  getNextWeekday() {
    const today = new Date();
    const nextWeekday = new Date(today);
    
    if (today.getDay() === 5) { // Friday
      nextWeekday.setDate(today.getDate() + 3); // Monday
    } else if (today.getDay() === 6) { // Saturday
      nextWeekday.setDate(today.getDate() + 2); // Monday
    } else {
      nextWeekday.setDate(today.getDate() + 1); // Next day
    }
    
    return nextWeekday.toISOString().split('T')[0];
  }

  getNextDay(dayOfWeek) {
    const today = new Date();
    const nextDay = new Date(today);
    const daysUntil = (dayOfWeek - today.getDay() + 7) % 7;
    nextDay.setDate(today.getDate() + (daysUntil === 0 ? 7 : daysUntil));
    return nextDay.toISOString().split('T')[0];
  }
}

const dashboardService = new DashboardService();
export default dashboardService;