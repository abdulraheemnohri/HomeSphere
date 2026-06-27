import { useState } from 'react';
import { motion } from 'framer-motion';
import { PiggyBank, Plus, TrendingUp, TrendingDown, Calendar, Target, Edit, Trash2 } from 'lucide-react';

export default function Budget() {
  const [isAdding, setIsAdding] = useState(false);

  const budgets = [
    {
      id: '1',
      name: 'Monthly Budget',
      type: 'monthly',
      total: 100000,
      spent: 85000,
      startDate: '2026-06-01',
      endDate: '2026-06-30',
      progress: 85,
      categories: [
        { name: 'Food', allocated: 20000, spent: 18000, color: '#ef4444' },
        { name: 'Rent', allocated: 30000, spent: 30000, color: '#3b82f6' },
        { name: 'Utilities', allocated: 15000, spent: 12000, color: '#22c55e' },
        { name: 'Transport', allocated: 10000, spent: 8000, color: '#f59e0b' },
        { name: 'Entertainment', allocated: 10000, spent: 5000, color: '#8b5cf6' },
        { name: 'Savings', allocated: 15000, spent: 15000, color: '#ec4899' },
      ],
    },
  ];

  const currentBudget = budgets[0];
  const remaining = currentBudget.total - currentBudget.spent;
  const remainingPercentage = (remaining / currentBudget.total) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Budget</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track your spending and savings</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 text-white font-medium rounded-xl hover:from-green-700 hover:to-green-800 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Create Budget</span>
        </motion.button>
      </motion.div>

      {/* Budget Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{currentBudget.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {currentBudget.startDate} to {currentBudget.endDate}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Budget</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    PKR {currentBudget.total.toLocaleString()}
                  </p>
                </div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{currentBudget.progress}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Spent</p>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">
                    PKR {currentBudget.spent.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Remaining</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">
                    PKR {remaining.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${currentBudget.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                {remainingPercentage.toFixed(1)}% remaining
              </p>
            </div>
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Budget Categories</h4>
            <div className="space-y-3">
              {currentBudget.categories.map((category, index) => {
                const percentage = (category.spent / category.allocated) * 100;
                const isOver = percentage > 100;
                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + 0.05 * index }}
                    className="space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{category.name}</span>
                      </div>
                      <span className={`text-sm font-medium ${isOver ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-300'}`}>
                        PKR {category.spent.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${isOver ? 'bg-red-500' : 'bg-current'}`}
                        style={{ backgroundColor: category.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ duration: 1, delay: 0.7 + 0.05 * index }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Savings Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Savings Goals</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Goal</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Emergency Fund', target: 500000, saved: 250000, deadline: '2026-12-31', priority: 'high' },
            { name: 'New Car', target: 2000000, saved: 500000, deadline: '2027-06-30', priority: 'medium' },
            { name: 'Vacation', target: 300000, saved: 100000, deadline: '2026-09-30', priority: 'low' },
          ].map((goal, index) => {
            const percentage = (goal.saved / goal.target) * 100;
            const priorityColor = {
              high: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
              medium: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
              low: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
            };
            return (
              <motion.div
                key={goal.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + 0.05 * index }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white truncate">{goal.name}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColor[goal.priority]}`}>
                    {goal.priority}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  PKR {goal.saved.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  of PKR {goal.target.toLocaleString()}
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.9 + 0.05 * index }}
                  />
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {percentage.toFixed(1)}% complete " Due: {goal.deadline}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Add Budget Modal */}
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
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Create Budget</h3>
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
                  Budget Name
                </label>
                <input
                  type="text"
                  placeholder="Enter budget name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Amount (PKR)
                </label>
                <input
                  type="number"
                  placeholder="Enter total amount"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Budget Type
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Yearly</option>
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
                  className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 text-white font-medium rounded-xl hover:from-green-700 hover:to-green-800 transition-all"
                >
                  Create Budget
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
