import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Search, Filter, MoreVertical, Calendar, User, Thermometer, Pill, Stethoscope, Activity, AlertCircle, CheckCircle } from 'lucide-react';

export default function Health() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const healthRecords = [
    { id: '1', name: 'Abdulraheem Nohari', type: 'Checkup', date: '2026-06-15', doctor: 'Dr. Ahmed Khan', hospital: 'Shaukat Khanum', status: 'completed', notes: 'General health checkup, all normal', temperature: 98.6, bloodPressure: '120/80' },
    { id: '2', name: 'Fatima Nohari', type: 'Vaccination', date: '2026-06-20', doctor: 'Dr. Maria Ali', hospital: 'Children Hospital', status: 'completed', notes: 'Flu vaccination', temperature: 98.4, bloodPressure: '110/75' },
    { id: '3', name: 'Abdulraheem Nohari', type: 'Dental', date: '2026-07-01', doctor: 'Dr. Sarfraz', hospital: 'Dental Care Clinic', status: 'scheduled', notes: 'Teeth cleaning and checkup', temperature: 0, bloodPressure: '' },
    { id: '4', name: 'Ahmed Nohari', type: 'Eye', date: '2026-06-10', doctor: 'Dr. Zia', hospital: 'Eye Specialist Hospital', status: 'completed', notes: 'Eye test, new glasses prescribed', temperature: 98.2, bloodPressure: '115/78' },
    { id: '5', name: 'Ayesha Nohari', type: 'Blood Test', date: '2026-05-25', doctor: 'Dr. Rehman', hospital: 'City Lab', status: 'completed', notes: 'Complete blood count, all normal', temperature: 98.7, bloodPressure: '125/82' },
  ];

  const filteredRecords = healthRecords.filter(record =>
    record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.hospital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const upcomingAppointments = filteredRecords.filter(r => r.status === 'scheduled').length;
  const totalRecords = filteredRecords.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400' };
      case 'scheduled':
        return { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400' };
      case 'urgent':
        return { bg: 'bg-red-100 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400' };
      default:
        return { bg: 'bg-gray-100 dark:bg-gray-900/20', text: 'text-gray-600 dark:text-gray-400' };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'scheduled':
        return Calendar;
      case 'urgent':
        return AlertCircle;
      default:
        return Activity;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Checkup':
        return Stethoscope;
      case 'Vaccination':
        return Pill;
      case 'Dental':
        return User;
      case 'Eye':
        return Activity;
      case 'Blood Test':
        return Thermometer;
      default:
        return Heart;
    }
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Health Records</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage family health records and appointments</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-700 dark:to-orange-800 text-white font-medium rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Record</span>
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/20">
              <Heart className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Records</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalRecords}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Upcoming Appointments</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{upcomingAppointments}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20">
              <User className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Family Members</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search health records..."
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

      {/* Health Records List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
      >
        <div className="p-6">
          <div className="space-y-4">
            {filteredRecords.map((record, index) => {
              const StatusIcon = getStatusIcon(record.status);
              const TypeIcon = getTypeIcon(record.type);
              const colors = getStatusColor(record.status);
              return (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + 0.05 * index }}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <TypeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">{record.name}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Stethoscope className="w-4 h-4" />
                        {record.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {record.date}
                      </span>
                      <span className="truncate">{record.doctor}</span>
                    </div>
                    {record.notes && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">{record.notes}</p>
                    )}
                  </div>
                  <div className="text-right">
                    {record.temperature > 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <Thermometer className="w-4 h-4 inline" /> {record.temperature}°F
                      </p>
                    )}
                    {record.bloodPressure && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <Heart className="w-4 h-4 inline" /> {record.bloodPressure}
                      </p>
                    )}
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <StatusIcon className={`w-4 h-4 ${colors.text}`} />
                      <span className={`text-xs font-medium ${colors.bg} ${colors.text} px-2 py-0.5 rounded-full`}>
                        {record.status}
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

          {filteredRecords.length === 0 && (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No health records found</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Add Health Record Modal */}
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
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add Health Record</h3>
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
                  Patient Name
                </label>
                <input
                  type="text"
                  placeholder="Enter patient name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Record Type
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all">
                  <option>Select record type</option>
                  <option>Checkup</option>
                  <option>Vaccination</option>
                  <option>Dental</option>
                  <option>Eye</option>
                  <option>Blood Test</option>
                  <option>X-Ray</option>
                  <option>MRI</option>
                  <option>Surgery</option>
                  <option>Emergency</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Doctor
                </label>
                <input
                  type="text"
                  placeholder="Enter doctor name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hospital/Clinic
                </label>
                <input
                  type="text"
                  placeholder="Enter hospital or clinic name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Temperature (°F)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Enter temperature"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Blood Pressure
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 120/80"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter any notes or observations"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all">
                  <option>Select status</option>
                  <option>Completed</option>
                  <option>Scheduled</option>
                  <option>Urgent</option>
                  <option>Follow-up</option>
                </select>
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
                  Add Record
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}