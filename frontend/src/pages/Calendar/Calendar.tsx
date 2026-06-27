import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Plus, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isAdding, setIsAdding] = useState(false);

  const events = [
    { id: '1', title: 'Electricity Bill Due', date: '2026-06-30', type: 'bill', color: 'bg-red-100 dark:bg-red-900/20', textColor: 'text-red-600 dark:text-red-400' },
    { id: '2', title: "Ahmad's Birthday", date: '2026-07-05', type: 'birthday', color: 'bg-blue-100 dark:bg-blue-900/20', textColor: 'text-blue-600 dark:text-blue-400' },
    { id: '3', title: 'Cow #123 Vaccination', date: '2026-07-10', type: 'vaccination', color: 'bg-green-100 dark:bg-green-900/20', textColor: 'text-green-600 dark:text-green-400' },
    { id: '4', title: 'House Maintenance', date: '2026-07-15', type: 'maintenance', color: 'bg-yellow-100 dark:bg-yellow-900/20', textColor: 'text-yellow-600 dark:text-yellow-400' },
    { id: '5', title: 'Loan Payment Due', date: '2026-07-20', type: 'loan', color: 'bg-purple-100 dark:bg-purple-900/20', textColor: 'text-purple-600 dark:text-purple-400' },
  ];

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(e => e.date === dateStr);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">View your events and reminders</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-700 dark:to-indigo-800 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Event</span>
        </motion.button>
      </motion.div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
      >
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPreviousMonth}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </motion.button>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {monthNames[month]} {year}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNextMonth}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </motion.button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {dayNames.map(day => (
            <div key={day} className="text-center py-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{day}</p>
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before the first day of the month */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="p-2" />
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }).map((_, day) => {
            const date = new Date(year, month, day + 1);
            const dateEvents = getEventsForDate(date);
            return (
              <motion.div
                key={day}
                whileHover={{ scale: 1.05 }}
                className="p-2 relative cursor-pointer"
              >
                <div className={`w-full aspect-square rounded-xl flex items-center justify-center font-medium transition-all ${
                  date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0] 
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
                }`}>
                  {day + 1}
                </div>
                {dateEvents.length > 0 && (
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 flex flex-col gap-1">
                    {dateEvents.slice(0, 2).map((event, index) => (
                      <span key={event.id} className={`w-2 h-2 rounded-full ${event.color} ${index > 0 ? '-mt-1' : ''}`} />
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {events
            .filter(e => new Date(e.date) >= new Date())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5)
            .map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + 0.05 * index }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className={`p-2.5 rounded-xl ${event.color}`}>
                  <CalendarIcon className={`w-5 h-5 ${event.textColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">{event.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.date}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </motion.button>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* Add Event Modal */}
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
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add Event</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsAdding(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="text-xl">�</span>
              </motion.button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="Enter event title"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Type
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all">
                  <option>Select type</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Bill Due</option>
                  <option>Vaccination</option>
                  <option>Medical Visit</option>
                  <option>Property Maintenance</option>
                  <option>Meeting</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time (Optional)
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
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
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-700 dark:to-indigo-800 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all"
                >
                  Add Event
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
