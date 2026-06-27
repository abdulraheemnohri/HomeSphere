import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Users, DollarSign, TrendingUp, TrendingDown, PiggyBank, BarChart3, Sun } from 'lucide-react';
import { useDashboardHook } from '@/hooks';
import { useAuth } from '@/store';

export default function Dashboard() {
  const { user } = useAuth();
  const { stats, isLoading, error, fetchDashboardStats } = useDashboardHook();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const quickActions = [
    { title: 'Add Income', icon: DollarSign, color: 'bg-green-100 dark:bg-green-900/20', iconColor: 'text-green-600 dark:text-green-400' },
    { title: 'Add Expense', icon: DollarSign, color: 'bg-red-100 dark:bg-red-900/20', iconColor: 'text-red-600 dark:text-red-400' },
    { title: 'Add Family', icon: Users, color: 'bg-blue-100 dark:bg-blue-900/20', iconColor: 'text-blue-600 dark:text-blue-400' },
    { title: 'Add Property', icon: Home, color: 'bg-yellow-100 dark:bg-yellow-900/20', iconColor: 'text-yellow-600 dark:text-yellow-400' }
  ];

  const dashboardStats = stats || {
    finance: {
      total_income: 150000,
      total_expenses: 85000,
      net_balance: 65000,
      total_bank_balance: 2450000
    },
    recent_transactions: {
      incomes: [
        { id: '1', amount: 50000, date: '2026-06-27', category: 'Salary' },
        { id: '2', amount: 25000, date: '2026-06-26', category: 'Bonus' }
      ],
      expenses: [
        { id: '1', amount: 15000, date: '2026-06-27', category: 'Groceries' },
        { id: '2', amount: 8000, date: '2026-06-26', category: 'Utilities' }
      ]
    }
  };

  const totalIncome = dashboardStats.finance.total_income;
  const totalExpenses = dashboardStats.finance.total_expenses;
  const netBalance = dashboardStats.finance.net_balance;
  const bankBalance = dashboardStats.finance.total_bank_balance;

  const incomeExpenseRatio = totalIncome > 0 
    ? (totalExpenses / totalIncome * 100).toFixed(1)
    : '0';

  const savingsPercentage = (netBalance / totalIncome * 100).toFixed(1);

  const statsData = [
    {
      title: 'Monthly Income',
      value: 'PKR ' + totalIncome.toLocaleString(),
      change: '+12%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Expenses',
      value: 'PKR ' + totalExpenses.toLocaleString(),
      change: '-' + incomeExpenseRatio + '%',
      icon: TrendingDown,
      color: 'text-red-600'
    },
    {
      title: 'Savings',
      value: 'PKR ' + netBalance.toLocaleString(),
      change: '+' + savingsPercentage + '%',
      icon: PiggyBank,
      color: 'text-blue-600'
    },
    {
      title: 'Bank Balance',
      value: 'PKR ' + bankBalance.toLocaleString(),
      change: 'On Track',
      icon: BarChart3,
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {user?.full_name || 'User'}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Here is an overview of your household management
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl mb-6"
        >
          <p className="text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <p className={'text-sm font-medium ' + stat.color}>{stat.change}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-gray-600 dark:text-gray-300">Loading dashboard data...</span>
        </div>
      )}

      {!isLoading && (
        <>
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
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.title}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={'flex flex-col items-center gap-2 p-4 rounded-xl ' + action.color + ' hover:shadow-md transition-all'}
                  >
                    <Icon className={'w-6 h-6 ' + action.iconColor} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{action.title}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Recent Incomes
              </h3>
              {dashboardStats.recent_transactions.incomes.length > 0 ? (
                <div className="space-y-3">
                  {dashboardStats.recent_transactions.incomes.slice(0, 3).map((income) => (
                    <div key={income.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                        <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{income.category}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{income.date}</p>
                      </div>
                      <p className="font-bold text-green-600 dark:text-green-400">+PKR {income.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No recent incomes</p>
              )}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Recent Expenses
              </h3>
              {dashboardStats.recent_transactions.expenses.length > 0 ? (
                <div className="space-y-3">
                  {dashboardStats.recent_transactions.expenses.slice(0, 3).map((expense) => (
                    <div key={expense.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20">
                        <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{expense.category}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{expense.date}</p>
                      </div>
                      <p className="font-bold text-red-600 dark:text-red-400">-PKR {expense.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No recent expenses</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
