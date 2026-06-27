import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tractor, Plus, Search, Filter, MoreVertical, Calendar, User, Leaf, Droplets, Sun, Thermometer, Wind, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function Farm() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const farmActivities = [
    { id: '1', name: 'Wheat Harvest', type: 'Harvest', crop: 'Wheat', area: '5 Acres', status: 'completed', startDate: '2026-05-01', endDate: '2026-05-15', yield: '2500 kg', notes: 'Good quality harvest this season' },
    { id: '2', name: 'Rice Planting', type: 'Planting', crop: 'Rice', area: '3 Acres', status: 'in-progress', startDate: '2026-06-20', endDate: '2026-06-30', yield: 'N/A', notes: 'Planting in progress, weather favorable' },
    { id: '3', name: 'Vegetable Irrigation', type: 'Irrigation', crop: 'Vegetables', area: '2 Acres', status: 'pending', startDate: '2026-06-28', endDate: '2026-06-28', yield: 'N/A', notes: 'Scheduled for tomorrow morning' },
    { id: '4', name: 'Pest Control', type: 'Spraying', crop: 'All Crops', area: '10 Acres', status: 'completed', startDate: '2026-06-15', endDate: '2026-06-16', yield: 'N/A', notes: 'Pesticides applied successfully' },
    { id: '5', name: 'Fertilizer Application', type: 'Fertilizing', crop: 'Wheat', area: '5 Acres', status: 'in-progress', startDate: '2026-06-25', endDate: '2026-06-27', yield: 'N/A', notes: 'Applying organic fertilizer' },
    { id: '6', name: 'Soil Testing', type: 'Testing', crop: 'N/A', area: 'All Fields', status: 'pending', startDate: '2026-07-01', endDate: '2026-07-02', yield: 'N/A', notes: 'Scheduled soil analysis' },
    { id: '7', name: 'Livestock Feeding', type: 'Livestock', crop: 'Cattle', area: 'N/A', status: 'daily', startDate: '2026-06-01', endDate: '2026-06-30', yield: 'N/A', notes: 'Daily feeding schedule' },
    { id: '8', name: 'Equipment Maintenance', type: 'Maintenance', crop: 'N/A', area: 'N/A', status: 'pending', startDate: '2026-07-05', endDate: '2026-07-06', yield: 'N/A', notes: 'Tractor and plow maintenance' },
  ];

  const filteredActivities = farmActivities.filter(activity =>
    activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalActivities = filteredActivities.length;
  const completedActivities = filteredActivities.filter(a => a.status === 'completed').length;
  const inProgressActivities = filteredActivities.filter(a => a.status === 'in-progress').length;
  const pendingActivities = filteredActivities.filter(a => a.status === 'pending').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400', icon: CheckCircle };
      case 'in-progress':
        return { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', icon: Clock };
      case 'daily':
        return { bg: 'bg-purple-100 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', icon: Calendar };
      case 'pending':
      default:
        return { bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-600 dark:text-yellow-400', icon: AlertCircle };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Harvest':
        return Leaf;
      case 'Planting':
        return Leaf;
      case 'Irrigation':
        return Droplets;
      case 'Spraying':
        return Wind;
      case 'Fertilizing':
        return Thermometer;
      case 'Testing':
        return Tractor;
      case 'Livestock':
        return User;
      case 'Maintenance':
        return Tractor;
      default:
        return Tractor;
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Harvest': 'from-green-500 to-teal-500',
      'Planting': 'from-blue-500 to-cyan-500',
      'Irrigation': 'from-blue-400 to-blue-600',
      'Spraying': 'from-purple-500 to-violet-500',
      'Fertilizing': 'from-yellow-500 to-orange-500',
      'Testing': 'from-indigo-500 to-purple-500',
      'Livestock': 'from-pink-500 to-rose-500',
      'Maintenance': 'from-gray-500 to-gray-700',
    };
    return colors[type as keyof typeof colors] || 'from-gray-500 to-gray-700';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Farm Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage farm activities, crops, and livestock</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-700 dark:to-orange-800 text-white font-medium rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Activity</span>
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/20">
              <Tractor className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Activities</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalActivities}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedActivities}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{inProgressActivities}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/20">
              <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingActivities}</p>
        </div>
      </motion.div>

      {/* Weather Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Today's Weather</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Sun className="w-8 h-8" />
                <span className="text-2xl font-bold">32°C</span>
              </div>
              <div>
                <p className="text-sm opacity-90">Sunny</p>
                <p className="text-sm opacity-90">Humidity: 45%</p>
                <p className="text-sm opacity-90">Wind: 12 km/h</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Good day for farming</p>
            <p className="text-sm opacity-90">No rain expected</p>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search farm activities..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span>Filter</span>
        </motion.button>
      </motion.div>

      {/* Farm Activities List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
      >
        <div className="p-6">
          <div className="space-y-4">
            {filteredActivities.map((activity, index) => {
              const TypeIcon = getTypeIcon(activity.type);
              const typeColor = getTypeColor(activity.type);
              const statusInfo = getStatusColor(activity.status);
              const StatusIcon = statusInfo.icon;

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + 0.05 * index }}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${typeColor} rounded-xl flex items-center justify-center`}>
                    <TypeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">{activity.name}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Leaf className="w-4 h-4" />
                        {activity.crop}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {activity.startDate} to {activity.endDate}
                      </span>
                      <span className="flex items-center gap-1">
                        {activity.area}
                      </span>
                    </div>
                    {activity.notes && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">{activity.notes}</p>
                    )}
                  </div>
                  <div className="text-right">
                    {activity.yield !== 'N/A' && (
                      <p className="font-bold text-gray-900 dark:text-white">
                        Yield: {activity.yield}
                      </p>
                    )}
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <StatusIcon className={`w-4 h-4 ${statusInfo.text}`} />
                      <span className={`text-xs font-medium ${statusInfo.bg} ${statusInfo.text} px-2 py-0.5 rounded-full`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <Tractor className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No farm activities found</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Add Farm Activity Modal */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsAdding(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add Farm Activity</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsAdding(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="text-xl">×</span>
              </motion.button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Activity Name
                </label>
                <input
                  type="text"
                  placeholder="Enter activity name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Activity Type
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all">
                  <option>Select activity type</option>
                  <option>Harvest</option>
                  <option>Planting</option>
                  <option>Irrigation</option>
                  <option>Spraying</option>
                  <option>Fertilizing</option>
                  <option>Testing</option>
                  <option>Livestock</option>
                  <option>Maintenance</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Crop
                </label>
                <input
                  type="text"
                  placeholder="Enter crop name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Area
                </label>
                <input
                  type="text"
                  placeholder="Enter area (e.g. 5 Acres)"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all">
                  <option>Select status</option>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Daily</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter any notes or additional information"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-700 dark:to-orange-800 text-white font-medium rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all"
                >
                  Add Activity
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}