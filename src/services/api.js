const apiService = {
  async getDashboardOverview() {
    // Mock data for dashboard overview
    return { 
      overview: { 
        activeZones: '2/4', 
        waterUsageToday: 1250, 
        avgSoilMoisture: 65, 
        systemEfficiency: 94 
      } 
    };
  },

  async getDashboardZones() {
    // Mock data for irrigation zones
    return { 
      zones: [
        {
          id: 'zone1',
          name: 'North Field',
          cropType: 'Tomatoes',
          isActive: true,
          soilMoisture: 68,
          temperature: 24,
          lastWatered: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          nextScheduled: '6:00 AM',
          waterUsage: 320
        },
        {
          id: 'zone2',
          name: 'South Field',
          cropType: 'Corn',
          isActive: false,
          soilMoisture: 45,
          temperature: 26,
          lastWatered: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
          nextScheduled: '8:00 AM',
          waterUsage: 280
        },
        {
          id: 'zone3',
          name: 'East Garden',
          cropType: 'Vegetables',
          isActive: true,
          soilMoisture: 72,
          temperature: 23,
          lastWatered: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
          nextScheduled: '7:00 AM',
          waterUsage: 180
        },
        {
          id: 'zone4',
          name: 'West Orchard',
          cropType: 'Fruit Trees',
          isActive: false,
          soilMoisture: 58,
          temperature: 25,
          lastWatered: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
          nextScheduled: '5:30 AM',
          waterUsage: 450
        }
      ]
    };
  },

  async getLatestSensorReadings() {
    // Mock sensor data
    return { 
      sensors: [
        {
          id: 'sensor1',
          name: 'Soil Moisture',
          value: 65,
          unit: '%',
          status: 'normal',
          trend: 'up',
          lastUpdated: 'Just now'
        },
        {
          id: 'sensor2',
          name: 'Temperature',
          value: 24,
          unit: '°C',
          status: 'normal',
          trend: 'stable',
          lastUpdated: '2 min ago'
        },
        {
          id: 'sensor3',
          name: 'Humidity',
          value: 78,
          unit: '%',
          status: 'normal',
          trend: 'down',
          lastUpdated: '1 min ago'
        },
        {
          id: 'sensor4',
          name: 'pH Level',
          value: 6.8,
          unit: 'pH',
          status: 'normal',
          trend: 'stable',
          lastUpdated: '5 min ago'
        },
        {
          id: 'sensor5',
          name: 'Water Pressure',
          value: 2.3,
          unit: 'bar',
          status: 'warning',
          trend: 'down',
          lastUpdated: '3 min ago'
        },
        {
          id: 'sensor6',
          name: 'Flow Rate',
          value: 15.2,
          unit: 'L/min',
          status: 'normal',
          trend: 'up',
          lastUpdated: 'Just now'
        }
      ]
    };
  },

  async getRecommendations() {
    // Mock recommendations
    return { 
      recommendations: [
        {
          id: 'rec1',
          type: 'irrigation',
          priority: 'high',
          title: 'Zone 2 Needs Water',
          message: 'Soil moisture in South Field has dropped to 45%. Consider starting irrigation.',
          actionRequired: 'Start Irrigation',
          timestamp: '5 min ago'
        },
        {
          id: 'rec2',
          type: 'weather',
          priority: 'medium',
          title: 'Rain Expected Tomorrow',
          message: 'Weather forecast shows 15mm rainfall expected. Adjust irrigation schedule accordingly.',
          actionRequired: 'Modify Schedule',
          timestamp: '1 hour ago'
        },
        {
          id: 'rec3',
          type: 'maintenance',
          priority: 'low',
          title: 'Sensor Calibration Due',
          message: 'pH sensor in Zone 1 is due for calibration. Schedule maintenance to ensure accuracy.',
          actionRequired: 'Schedule Maintenance',
          timestamp: '2 hours ago'
        },
        {
          id: 'rec4',
          type: 'fertilizer',
          priority: 'medium',
          title: 'Nutrient Level Low',
          message: 'Nitrogen levels in East Garden are below optimal range. Consider fertilizer application.',
          actionRequired: 'Apply Fertilizer',
          timestamp: '3 hours ago'
        }
      ]
    };
  },

  async toggleZoneIrrigation(zoneId) {
    console.log(`Mock API: Toggling irrigation for zone ${zoneId}`);
    
    // Simulate API response
    const isActive = Math.random() > 0.5; // Random state for demo
    
    return { 
      success: true, 
      isActive: isActive, 
      message: `Irrigation for zone ${zoneId} ${isActive ? 'started' : 'stopped'}.`,
      zoneId: zoneId
    };
  },

  async emergencyStopAll() {
    console.log('Mock API: Emergency stop all irrigation zones');
    
    return { 
      success: true, 
      message: 'Emergency stop executed. All irrigation zones have been stopped.',
      stoppedZones: ['zone1', 'zone2', 'zone3', 'zone4']
    };
  }
};

export default apiService;