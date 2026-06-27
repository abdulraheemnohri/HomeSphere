import { motion } from 'framer-motion';
import { Home, Users, DollarSign, TrendingUp, TrendingDown, PiggyBank, BarChart3, Sun, Calendar, Bell } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to HomeSphere! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your household with ease
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[{
          title: 'Monthly Income',
          value: 'PKR 150,000',
          change: '+12%',
          icon: TrendingUp,
          color: 'text-green-600'
        }, {
          title: 'Monthly Expenses',
          value: 'PKR 85,000',
          change: '-5%',
          icon: TrendingDown,
          color: 'text-red-600'
        }, {
          title: 'Savings',
          value: 'PKR 2,450,000',
          change: '+8%',
          icon: PiggyBank,
          color: 'text-blue-600'
        }, {
          title: 'Budget Progress',
          value: '75%',
          change: 'On Track',
          icon: BarChart3,
          color: 'text-yellow-600'
        }].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20">
                <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <p className={`text-sm font-medium ${stat.color}`}>{stat.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Income vs Expenses (2026)
          </h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Chart will be displayed here</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Weather
          </h3>
          <div className="text-center">
            <Sun className="w-16 h-16 text-yellow-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900 dark:text-white">32°C</p>
            <p className="text-gray-500 dark:text-gray-400">Sunny</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Lahore, PK</p>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{
            title: 'Add Income',
            icon: DollarSign,
            color: 'bg-green-100 dark:bg-green-900/20',
            iconColor: 'text-green-600 dark:text-green-400'
          }, {
            title: 'Add Expense',
            icon: DollarSign,
            color: 'bg-red-100 dark:bg-red-900/20',
            iconColor: 'text-red-600 dark:text-red-400'
          }, {
            title: 'Add Family',
            icon: Users,
            color: 'bg-blue-100 dark:bg-blue-900/20',
            iconColor: 'text-blue-600 dark:text-blue-400'
          }, {
            title: 'Add Property',
            icon: Home,
            color: 'bg-yellow-100 dark:bg-yellow-900/20',
            iconColor: 'text-yellow-600 dark:text-yellow-400'
          }].map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.title}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl ${action.color} hover:shadow-md transition-all`}
              >
                <Icon className={`w-6 h-6 ${action.iconColor}`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{action.title}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
