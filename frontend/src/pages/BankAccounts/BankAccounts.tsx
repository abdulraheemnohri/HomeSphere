import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bank, Plus, Search, Filter, MoreVertical, Calendar, DollarSign, CreditCard, TrendingUp, TrendingDown, Eye, User, Tag, Clock } from 'lucide-react';

export default function BankAccounts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const bankAccounts = [
    { id: '1', name: 'HBL Savings Account', bank: 'Habib Bank Limited', accountNumber: 'PK01HBL1234567890', accountType: 'Savings', balance: 500000, currency: 'PKR', branch: 'DHA Phase 5', status: 'active', lastTransaction: '2026-06-25', notes: 'Primary savings account' },
    { id: '2', name: 'UBL Current Account', bank: 'United Bank Limited', accountNumber: 'PK02UBL9876543210', accountType: 'Current', balance: 2500000, currency: 'PKR', branch: 'Main Boulevard', status: 'active', lastTransaction: '2026-06-26', notes: 'Business account' },
    { id: '3', name: 'Meezan Islamic Account', bank: 'Meezan Bank', accountNumber: 'PK03MEZ1122334455', accountType: 'Savings', balance: 1000000, currency: 'PKR', branch: 'Gulberg', status: 'active', lastTransaction: '2026-06-24', notes: 'Islamic banking account' },
    { id: '4', name: 'JazzCash Mobile Account', bank: 'JazzCash', accountNumber: '03001234567', accountType: 'Mobile', balance: 50000, currency: 'PKR', branch: 'Mobile', status: 'active', lastTransaction: '2026-06-27', notes: 'Mobile wallet' },
    { id: '5', name: 'EasyPaisa Account', bank: 'Telenor Microfinance', accountNumber: '03456789012', accountType: 'Mobile', balance: 30000, currency: 'PKR', branch: 'Mobile', status: 'active', lastTransaction: '2026-06-26', notes: 'Digital wallet' },
    { id: '6', name: 'HBL Foreign Currency Account', bank: 'Habib Bank Limited', accountNumber: 'PK01HBLUSD123456', accountType: 'Foreign', balance: 10000, currency: 'USD', branch: 'DHA Phase 5', status: 'active', lastTransaction: '2026-06-20', notes: 'USD savings account' },
  ];

  const filteredAccounts = bankAccounts.filter(account =>
    account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.accountNumber.includes(searchQuery) ||
    account.accountType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalAccounts = filteredAccounts.length;
  const totalBalancePKR = filteredAccounts
    .filter(acc => acc.currency === 'PKR')
    .reduce((sum, acc) => sum + acc.balance, 0);
  const totalBalanceUSD = filteredAccounts
    .filter(acc => acc.currency === 'USD')
    .reduce((sum, acc) => sum + acc.balance, 0);

  const getBankColor = (bank: string) => {
    const colors = {
      'Habib Bank Limited': 'from-blue-500 to-blue-700',
      'United Bank Limited': 'from-green-500 to-teal-500',
      'Meezan Bank': 'from-red-500 to-rose-500',
      'JazzCash': 'from-red-500 to-pink-500',
      'Telenor Microfinance': 'from-green-500 to-emerald-500',
    };
    return colors[bank as keyof typeof colors] || 'from-gray-500 to-gray-700';
  };

  const getAccountTypeIcon = (type: string) => {
    switch (type) {
      case 'Savings':
        return DollarSign;
      case 'Current':
        return CreditCard;
      case 'Mobile':
        return User;
      case 'Foreign':
        return DollarSign;
      default:
        return Bank;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400';
      case 'inactive':
        return 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400';
      case 'frozen':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400';
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bank Accounts</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage all your bank accounts and digital wallets</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-700 dark:to-orange-800 text-white font-medium rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Account</span>
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
              <Bank className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Accounts</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalAccounts}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Balance (PKR)</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">PKR {totalBalancePKR.toLocaleString()}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Balance (USD)</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">$ {totalBalanceUSD.toLocaleString()}</p>
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
            placeholder="Search bank accounts..."
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

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Transfer</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Deposit</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Withdraw</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Pay Bill</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Bank Accounts List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
      >
        <div className="p-6">
          <div className="space-y-4">
            {filteredAccounts.map((account, index) => {
              const AccountTypeIcon = getAccountTypeIcon(account.accountType);
              const bankColor = getBankColor(account.bank);
              const statusColor = getStatusColor(account.status);

              return (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + 0.05 * index }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${bankColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <AccountTypeIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white truncate">{account.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{account.bank}</p>
                        </div>
                        <span className={`text-xs font-medium ${statusColor} px-2 py-0.5 rounded-full`}>
                          {account.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          {account.accountType}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Last: {account.lastTransaction}
                        </span>
                      </div>

                      {account.notes && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">{account.notes}</p>
                      )}

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Account #: {account.accountNumber}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{account.branch}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 dark:text-white">
                            {account.currency} {account.balance.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredAccounts.length === 0 && (
            <div className="text-center py-12">
              <Bank className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No bank accounts found</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Add Bank Account Modal */}
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
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add Bank Account</h3>
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
                  Account Name
                </label>
                <input
                  type="text"
                  placeholder="Enter account name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bank Name
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all">
                  <option>Select bank</option>
                  <option>Habib Bank Limited</option>
                  <option>United Bank Limited</option>
                  <option>Meezan Bank</option>
                  <option>National Bank of Pakistan</option>
                  <option>MCB Bank</option>
                  <option>Allied Bank</option>
                  <option>Bank Alfalah</option>
                  <option>Standard Chartered</option>
                  <option>JazzCash</option>
                  <option>Telenor Microfinance</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="Enter account number"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Account Type
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all">
                    <option>Select type</option>
                    <option>Savings</option>
                    <option>Current</option>
                    <option>Fixed Deposit</option>
                    <option>Mobile</option>
                    <option>Foreign</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Currency
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all">
                    <option>Select currency</option>
                    <option>PKR</option>
                    <option>USD</option>
                    <option>GBP</option>
                    <option>EUR</option>
                    <option>AED</option>
                    <option>SAR</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Balance
                </label>
                <input
                  type="number"
                  placeholder="Enter current balance"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Branch
                </label>
                <input
                  type="text"
                  placeholder="Enter branch name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
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

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all">
                  <option>Select status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Frozen</option>
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
                  Add Account
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}