import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Search, Filter, MoreVertical, CheckSquare, Clock, XSquare, Trash2, Tag, Calendar, ShoppingBag } from 'lucide-react';

export default function Shopping() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const shoppingLists = [
    { id: '1', name: 'Weekly Groceries', category: 'Groceries', items: 12, completed: 8, date: '2026-06-28', priority: 'high', budget: 15000 },
    { id: '2', name: 'Eid Shopping', category: 'Clothing', items: 5, completed: 2, date: '2026-07-05', priority: 'high', budget: 50000 },
    { id: '3', name: 'Home Essentials', category: 'Household', items: 8, completed: 5, date: '2026-06-30', priority: 'medium', budget: 20000 },
    { id: '4', name: 'Electronics', category: 'Electronics', items: 3, completed: 0, date: '2026-07-10', priority: 'low', budget: 100000 },
    { id: '5', name: 'Kids School Supplies', category: 'Education', items: 15, completed: 10, date: '2026-07-01', priority: 'medium', budget: 30000 },
  ];

  const filteredLists = shoppingLists.filter(list =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    list.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalLists = filteredLists.length;
  const totalItems = filteredLists.reduce((sum, list) => sum + list.items, 0);
  const totalPending = filteredLists.reduce((sum, list) => sum + (list.items - list.completed), 0);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return { bg: 'bg-red-100 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400' };
      case 'medium':
        return { bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-600 dark:text-yellow-400' };
      default:
        return { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400' };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Groceries':
        return ShoppingBag;
      case 'Clothing':
        return Tag;
      case 'Household':
        return ShoppingCart;
      case 'Electronics':
        return ShoppingCart;
      case 'Education':
        return ShoppingCart;
      default:
        return ShoppingCart;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Groceries': 'from-green-500 to-teal-500',
      'Clothing': 'from-pink-500 to-purple-500',
      'Household': 'from-blue-500 to-cyan-500',
      'Electronics': 'from-yellow-500 to-orange-500',
      'Education': 'from-indigo-500 to-violet-500',
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-700';
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping Lists</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your shopping lists and track purchases</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-700 dark:to-orange-800 text-white font-medium rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>New List</span>
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
              <ShoppingCart className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Lists</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalLists}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20">
              <ShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Items</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalItems}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/20">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending Items</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalPending}</p>
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
            placeholder="Search shopping lists..."
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

      {/* Shopping Lists */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
      >
        <div className="p-6">
          <div className="space-y-4">
            {filteredLists.map((list, index) => {
              const CategoryIcon = getCategoryIcon(list.category);
              const categoryColor = getCategoryColor(list.category);
              const priorityColors = getPriorityColor(list.priority);
              const progress = Math.round((list.completed / list.items) * 100);

              return (
                <motion.div
                  key={list.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + 0.05 * index }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${categoryColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <CategoryIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white truncate">{list.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{list.category}</p>
                        </div>
                        <span className={`text-xs font-medium ${priorityColors.bg} ${priorityColors.text} px-2 py-0.5 rounded-full`}>
                          {list.priority}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                          <span>{list.completed} of {list.items} items</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ delay: 0.5 + 0.05 * index, duration: 1 }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {list.date}
                          </span>
                          <span className="flex items-center gap-1">
                            Budget: PKR {list.budget.toLocaleString()}
                          </span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredLists.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No shopping lists found</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Add Shopping List Modal */}
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
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Create New Shopping List</h3>
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
                  List Name
                </label>
                <input
                  type="text"
                  placeholder="Enter list name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all">
                  <option>Select category</option>
                  <option>Groceries</option>
                  <option>Clothing</option>
                  <option>Household</option>
                  <option>Electronics</option>
                  <option>Education</option>
                  <option>Gifts</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Budget (PKR)
                </label>
                <input
                  type="number"
                  placeholder="Enter estimated budget"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all">
                  <option>Select priority</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter any notes about this shopping list"
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
                  Create List
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}