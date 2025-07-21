import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import { 
  Droplets, 
  Thermometer, 
  Cloud, 
  Activity, 
  Zap,
  AlertTriangle,
  CheckCircle,
  Settings,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Wifi,
  Battery,
  MapPin,
  Calendar,
  Clock,
  Lightbulb,
  Leaf,
  Target,
  WifiOff,
  Power,
  PowerOff,
  Play,
  Pause,
  RotateCcw,
  Bell,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState('online');
  const [autoMode, setAutoMode] = useState(true);
  const [selectedZone, setSelectedZone] = useState('zone1');
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState({});
  const [zones, setZones] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Load all dashboard data in parallel
      const [overviewData, zonesData, sensorsData, recommendationsData] = await Promise.all([
        apiService.getDashboardOverview(),
        apiService.getDashboardZones(),
        apiService.getLatestSensorReadings(),
        apiService.getRecommendations()
      ]);

      setOverview(overviewData.overview || {});
      setZones(zonesData.zones || []);
      setSensorData(sensorsData.sensors || []);
      setRecommendations(recommendationsData.recommendations || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleZoneToggle = (zoneId) => {
    toggleZoneIrrigation(zoneId);
  };

  const toggleZoneIrrigation = async (zoneId) => {
    try {
      const response = await apiService.toggleZoneIrrigation(zoneId);
      
      // Update local state
      setZones(prevZones => 
        prevZones.map(zone => 
          zone.id === zoneId 
            ? { ...zone, isActive: response.isActive }
            : zone
        )
      );

      // Show success message
      const message = response.isActive ? 'Irrigation started' : 'Irrigation stopped';
      showToast(message, 'success');
    } catch (error) {
      console.error('Error toggling irrigation:', error);
      showToast('Failed to toggle irrigation. Please try again.', 'error');
    }
  };

  const handleEmergencyStop = () => {
    emergencyStopAll();
  };

  const emergencyStopAll = async () => {
    try {
      const response = await apiService.emergencyStopAll();
      
      // Update all zones to inactive
      setZones(prevZones => 
        prevZones.map(zone => ({ ...zone, isActive: false }))
      );

      showToast(response.message, 'success');
    } catch (error) {
      console.error('Error during emergency stop:', error);
      showToast('Failed to execute emergency stop. Please try again.', 'error');
    }
  };

  const handleRefreshData = () => {
    loadDashboardData();
  };

  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500 text-white' :
      type === 'error' ? 'bg-red-500 text-white' :
      'bg-blue-500 text-white'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 3000);
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return 'Never';
    
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffHours > 24) {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'normal': return 'bg-green-100';
      case 'warning': return 'bg-yellow-100';
      case 'critical': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <div className="h-4 w-4" />;
    }
  };

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'irrigation': return <Droplets className="h-5 w-5 text-blue-500" />;
      case 'weather': return <Cloud className="h-5 w-5 text-gray-500" />;
      case 'fertilizer': return <Leaf className="h-5 w-5 text-green-500" />;
      case 'maintenance': return <Settings className="h-5 w-5 text-orange-500" />;
      case 'pest': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <Lightbulb className="h-5 w-5 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Smart Irrigation Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user?.name}!</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${systemStatus === 'online' ? 'bg-green-500' : systemStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                <span className="text-sm font-medium text-gray-700 capitalize">{systemStatus}</span>
              </div>
              <div className="text-sm text-gray-600">
                {currentTime.toLocaleTimeString()}
              </div>
              <button
                onClick={handleRefreshData}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Zones</p>
                <p className="text-2xl font-bold text-green-600">
                  {overview.activeZones || `${zones.filter(z => z.isActive).length}/${zones.length}`}
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Water Usage Today</p>
                <p className="text-2xl font-bold text-blue-600">{overview.waterUsageToday || 0}L</p>
              </div>
              <Droplets className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Soil Moisture</p>
                <p className="text-2xl font-bold text-green-600">{overview.avgSoilMoisture || 60}%</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">System Efficiency</p>
                <p className="text-2xl font-bold text-purple-600">{overview.systemEfficiency || 94}%</p>
              </div>
              <Zap className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Sensor Data & Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sensor Readings */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Live Sensor Data</h2>
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">Connected</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sensorData.map((sensor) => (
                    <div key={sensor.id} className={`p-4 rounded-lg border-2 ${getStatusBgColor(sensor.status)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-700">{sensor.name}</h3>
                        {getTrendIcon(sensor.trend)}
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <span className={`text-2xl font-bold ${getStatusColor(sensor.status)}`}>
                          {sensor.value}
                        </span>
                        <span className="text-sm text-gray-500">{sensor.unit}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{sensor.lastUpdated}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Zone Controls */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Irrigation Zones</h2>
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={autoMode}
                        onChange={(e) => setAutoMode(e.target.checked)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Auto Mode</span>
                    </label>
                    <button
                      onClick={handleEmergencyStop}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                    >
                      Emergency Stop
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {zones.map((zone) => (
                    <div key={zone.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{zone.name}</h3>
                          <p className="text-sm text-gray-600">{zone.cropType}</p>
                        </div>
                        <button
                          onClick={() => handleZoneToggle(zone.id)}
                          className={`p-2 rounded-full transition-colors ${
                            zone.isActive 
                              ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {zone.isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Soil Moisture:</span>
                          <span className="font-medium">{zone.soilMoisture}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Temperature:</span>
                          <span className="font-medium">{zone.temperature}°C</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Last Watered:</span>
                          <span className="font-medium">{getTimeAgo(zone.lastWatered)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Next Scheduled:</span>
                          <span className="font-medium text-green-600">{zone.nextScheduled}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Water Usage:</span>
                          <span className="font-medium">{zone.waterUsage}L</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t">
                        <div className="flex space-x-2">
                          <button className="flex-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                            Start Now
                          </button>
                          <button className="flex-1 px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors">
                            Schedule
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Analytics Chart */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Water Usage Analytics</h2>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">7D</button>
                    <button className="px-3 py-1 text-sm bg-green-600 text-white rounded-md">30D</button>
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">90D</button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Water usage chart would be displayed here</p>
                    <p className="text-sm text-gray-400">Integration with charting library needed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Recommendations & Alerts */}
          <div className="space-y-6">
            {/* Smart Recommendations */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">AI Recommendations</h2>
                  <button
                    onClick={() => setShowRecommendations(!showRecommendations)}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    {showRecommendations ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              {showRecommendations && (
                <div className="p-4">
                  <div className="space-y-3">
                    {recommendations.map((rec) => (
                      <div key={rec.id} className={`p-3 rounded-lg border-l-4 ${getPriorityColor(rec.priority)}`}>
                        <div className="flex items-start space-x-3">
                          {getRecommendationIcon(rec.type)}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-sm font-medium text-gray-900">{rec.title}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                                rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {rec.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{rec.description || rec.message}</p>
                            <div className="flex items-center justify-between">
                              <button className="text-xs text-green-600 hover:text-green-700 font-medium">
                                {rec.action || rec.actionRequired}
                              </button>
                              <span className="text-xs text-gray-500">{rec.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {recommendations.length === 0 && (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <p className="text-gray-500">No recommendations at this time</p>
                        <p className="text-sm text-gray-400">Your system is running optimally</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Weather Widget */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Weather Forecast</h2>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Cloud className="h-8 w-8 text-gray-500" />
                      <div>
                        <p className="font-medium">Today</p>
                        <p className="text-sm text-gray-600">Partly Cloudy</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">32°C</p>
                      <p className="text-sm text-gray-600">Rain: 20%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Droplets className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-medium">Tomorrow</p>
                        <p className="text-sm text-gray-600">Light Rain</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">28°C</p>
                      <p className="text-sm text-gray-600">Rain: 80%</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">15mm rainfall expected tomorrow</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">Consider adjusting irrigation schedule</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wifi className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Network Connection</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">Online</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Battery className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Battery Level</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">85%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Last Maintenance</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">15 days ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-green-500" />
                      <span className="text-sm">System Uptime</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">99.2%</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <button className="w-full px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
                    Download System Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;