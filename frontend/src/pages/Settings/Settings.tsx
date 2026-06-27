import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Moon, Sun, Globe, Bell, Shield, Database, Cloud, User, LogOut } from 'lucide-react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    bills: true,
    birthdays: true,
    maintenance: true,
    medicine: true,
    vaccinations: true,
    loanDue: true,
    savingsGoal: true,
    inventoryLowStock: true,
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleNotification = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <Settings className="w-8 h-8 text-gray-600 dark:text-gray-300" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">Configure your preferences</p>
        </div>
      </motion.div>

      {/* Settings Categories */}
      <div className="space-y-6">
        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Appearance</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                  {darkMode ? <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" /> : <Sun className="w-6 h-6 text-gray-600 dark:text-gray-300" />}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Dark Mode</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Enable dark theme</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className={`relative w-14 h-7 rounded-full transition-all ${
                  darkMode ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <motion.span
                  className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md"
                  animate={{ x: darkMode ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                  <Globe className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Language</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">English (US)</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                Change
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Notifications</h2>
          </div>
          <div className="p-6 space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {getNotificationDescription(key)}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleNotification(key)}
                  className={`relative w-12 h-6 rounded-full transition-all ${
                    value ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <motion.span
                    className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{ x: value ? 18 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Security</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                  <Shield className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">PIN Login</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Enable PIN authentication</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-14 h-7 rounded-full transition-all bg-purple-600`}
              >
                <motion.span
                  className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md"
                  animate={{ x: 24 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                  <Database className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Auto Backup</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Automatically backup data</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-14 h-7 rounded-full transition-all bg-purple-600`}
              >
                <motion.span
                  className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md"
                  animate={{ x: 24 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                  <Cloud className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Cloud Sync</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Sync with cloud storage</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-14 h-7 rounded-full transition-all bg-gray-300 dark:bg-gray-600"
              >
                <motion.span
                  className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md"
                  animate={{ x: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Account */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Account</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                AR
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">Abdulraheem Nohari</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Owner</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                Edit Profile
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 w-full p-4 rounded-xl border border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="font-medium text-red-600 dark:text-red-400">Sign Out</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function getNotificationDescription(key: string): string {
  const descriptions: Record<string, string> = {
    bills: 'Get notified about upcoming bills',
    birthdays: 'Get notified about family birthdays',
    maintenance: 'Get notified about property maintenance',
    medicine: 'Get notified about medicine schedules',
    vaccinations: 'Get notified about animal vaccinations',
    loanDue: 'Get notified about loan payments',
    savingsGoal: 'Get notified about savings goals',
    inventoryLowStock: 'Get notified about low inventory',
  };
  return descriptions[key] || '';
}
