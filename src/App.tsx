import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Heart, Activity, Thermometer, Scale, AlertTriangle, Users, TrendingUp, Clock, CheckCircle, XCircle, Wifi } from 'lucide-react';

// Types
interface VitalData {
  date: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  temperature: number;
  weight: number;
  oxygenSat: number;
  glucose: number;
}

interface Patient {
  id: number;
  name: string;
  age: number;
  conditions: string[];
  lastReading: string;
  status: 'alert' | 'warning' | 'normal';
  devices: string[];
  riskScore: number;
}

interface DeviceType {
  name: string;
  count: number;
  online: number;
}

interface PieData {
  name: string;
  value: number;
  color: string;
}

// Simulated patient data
const generateVitalData = (days: number = 30): VitalData[] => {
  const data: VitalData[] = [];
  const baseDate = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      systolic: 120 + Math.random() * 40 - 20,
      diastolic: 80 + Math.random() * 20 - 10,
      heartRate: 70 + Math.random() * 30 - 15,
      temperature: 36.5 + Math.random() * 2 - 1,
      weight: 70 + Math.random() * 10 - 5,
      oxygenSat: 95 + Math.random() * 5,
      glucose: 90 + Math.random() * 40 - 20
    });
  }
  return data;
};

const patients: Patient[] = [
  {
    id: 1,
    name: "Margaret Thompson",
    age: 74,
    conditions: ["Hypertension", "Type 2 Diabetes"],
    lastReading: "2 hours ago",
    status: "alert",
    devices: ["BP Monitor", "Glucometer", "Weight Scale"],
    riskScore: 85
  },
  {
    id: 2,
    name: "James Wilson",
    age: 58,
    conditions: ["COPD", "Heart Disease"],
    lastReading: "30 minutes ago",
    status: "normal",
    devices: ["Pulse Oximeter", "BP Monitor", "Smart Inhaler"],
    riskScore: 65
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    age: 45,
    conditions: ["Post-surgical recovery"],
    lastReading: "1 hour ago",
    status: "warning",
    devices: ["Temperature Sensor", "Activity Tracker"],
    riskScore: 45
  },
  {
    id: 4,
    name: "Robert Clarke",
    age: 82,
    conditions: ["Atrial Fibrillation"],
    lastReading: "15 minutes ago",
    status: "normal",
    devices: ["ECG Monitor", "BP Monitor"],
    riskScore: 72
  }
];

const deviceTypes: DeviceType[] = [
  { name: "Blood Pressure Monitors", count: 156, online: 142 },
  { name: "Glucometers", count: 89, online: 85 },
  { name: "Pulse Oximeters", count: 73, online: 68 },
  { name: "Weight Scales", count: 67, online: 63 },
  { name: "Temperature Sensors", count: 45, online: 42 },
  { name: "ECG Monitors", count: 34, online: 31 }
];

const CareConnectDashboard: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>(patients[0]);
  const [vitalData, setVitalData] = useState<VitalData[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const alertsCount = 3;

  useEffect(() => {
    setVitalData(generateVitalData());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: 'alert' | 'warning' | 'normal'): string => {
    switch (status) {
      case 'alert': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'normal': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (score: number): string => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const totalDevices = deviceTypes.reduce((sum, device) => sum + device.count, 0);
  const onlineDevices = deviceTypes.reduce((sum, device) => sum + device.online, 0);

  const pieData: PieData[] = [
    { name: 'Normal', value: 67, color: '#10B981' },
    { name: 'Warning', value: 23, color: '#F59E0B' },
    { name: 'Alert', value: 10, color: '#EF4444' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CareConnect Dashboard</h1>
            <p className="text-gray-600 mt-1">Remote Patient Monitoring System - Bristol NHS Trust</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last updated: {currentTime.toLocaleTimeString()}</p>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center space-x-1">
                <Wifi className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">{onlineDevices}/{totalDevices} devices online</span>
              </div>
              <div className="flex items-center space-x-1">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-600">{alertsCount} active alerts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">342</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Improved Outcomes</p>
              <p className="text-2xl font-bold text-gray-900">89%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900">12 min</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Monitors</p>
              <p className="text-2xl font-bold text-gray-900">{onlineDevices}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Patient Monitoring</h2>
          <div className="space-y-4">
            {patients.map(patient => (
              <div 
                key={patient.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  selectedPatient.id === patient.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-600">Age: {patient.age}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                      {patient.status.toUpperCase()}
                    </span>
                    <span className={`text-sm font-bold ${getRiskColor(patient.riskScore)}`}>
                      {patient.riskScore}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-2">{patient.conditions.join(', ')}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">Last reading: {patient.lastReading}</p>
                  <div className="flex space-x-1">
                    {patient.devices.length > 2 ? (
                      <>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-gray-500">+{patient.devices.length - 2}</span>
                      </>
                    ) : (
                      patient.devices.map((_, idx) => (
                        <div key={idx} className="w-2 h-2 bg-green-400 rounded-full"></div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Selected Patient Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedPatient.name}</h2>
                <p className="text-gray-600">Age: {selectedPatient.age} | Conditions: {selectedPatient.conditions.join(', ')}</p>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${getRiskColor(selectedPatient.riskScore)}`}>
                  Risk Score: {selectedPatient.riskScore}%
                </p>
                <p className="text-sm text-gray-500">AI-powered assessment</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              {selectedPatient.devices.map((device, idx) => (
                <div key={idx} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-700">{device}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vital Signs Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vital Signs Trends (30 days)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vitalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{fontSize: 12}} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="systolic" stroke="#EF4444" name="Systolic BP" strokeWidth={2} />
                  <Line type="monotone" dataKey="diastolic" stroke="#F59E0B" name="Diastolic BP" strokeWidth={2} />
                  <Line type="monotone" dataKey="heartRate" stroke="#10B981" name="Heart Rate" strokeWidth={2} />
                  <Line type="monotone" dataKey="oxygenSat" stroke="#3B82F6" name="O2 Saturation" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Current Readings */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Readings</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Heart, label: "Blood Pressure", value: "142/89", unit: "mmHg", status: "warning" },
                { icon: Activity, label: "Heart Rate", value: "78", unit: "bpm", status: "normal" },
                { icon: Thermometer, label: "Temperature", value: "36.8", unit: "°C", status: "normal" },
                { icon: Scale, label: "Weight", value: "73.2", unit: "kg", status: "normal" }
              ].map((reading, idx) => (
                <div key={idx} className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <reading.icon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{reading.label}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{reading.value}</p>
                  <p className="text-sm text-gray-500">{reading.unit}</p>
                  <div className="mt-2">
                    {reading.status === 'normal' ? 
                      <CheckCircle className="w-4 h-4 text-green-500" /> : 
                      <XCircle className="w-4 h-4 text-yellow-500" />
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Device Status & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Connectivity Status</h3>
          <div className="space-y-3">
            {deviceTypes.map((device, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${device.online === device.count ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                  <span className="font-medium text-gray-700">{device.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{device.online}/{device.count} online</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{width: `${(device.online / device.count) * 100}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg shadow mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI Clinical Decision Support</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Early Warning</h4>
            <p className="text-sm text-gray-600">Margaret Thompson's BP readings show increasing trend. Consider medication adjustment.</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Medication Adherence</h4>
            <p className="text-sm text-gray-600">James Wilson's inhaler usage pattern suggests good COPD management compliance.</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Predictive Analytics</h4>
            <p className="text-sm text-gray-600">Risk models indicate 3 patients may need intervention within 48 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareConnectDashboard;