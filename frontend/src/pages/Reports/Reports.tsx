import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, LineChart, FileText, Download, Calendar, Filter } from 'lucide-react';

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState('income');
  const [timeRange, setTimeRange] = useState('month');

  const reportTypes = [
    { id: 'income', name: 'Income Report', icon: BarChart3 },
    { id: 'expense', name: 'Expense Report', icon: PieChart },
    { id: 'profit', name: 'Profit & Loss', icon: LineChart },
    { id: 'property', name: 'Property Value', icon: FileText },
  ];

  const timeRanges = [
    { id: 'month', name: 'This Month' },
    { id: 'quarter', name: 'This Quarter' },
    { id: 'year', name: 'This Year' },
    { id: 'custom', name: 'Custom Range' },
  ];

  const getReportData = () => {
    switch (selectedReport) {
      case 'income':
        return {
          title: 'Income Report',
          description: 'Monthly income breakdown by category',
          stats: [
            { label: 'Total Income', value: 'PKR 150,000', change: '+12%' },
            { label: 'Average Income', value: 'PKR 50,000', change: '+5%' },
            { label: 'Highest Source', value: 'Salary', change: '' },
          ],
          chartType: 'bar',
          chartData: [
            { label: 'Salary', value: 50000, color: '#3b82f6' },
            { label: 'Freelancing', value: 30000, color: '#8b5cf6' },
            { label: 'Rental', value: 25000, color: '#ec4899' },
            { label: 'Investment', value: 15000, color: '#f59e0b' },
          ],
        };
      case 'expense':
        return {
          title: 'Expense Report',
          description: 'Monthly expense breakdown by category',
          stats: [
            { label: 'Total Expenses', value: 'PKR 85,000', change: '-5%' },
            { label: 'Average Expense', value: 'PKR 28,333', change: '-2%' },
            { label: 'Highest Category', value: 'Rent', change: '' },
          ],
          chartType: 'pie',
          chartData: [
            { label: 'Rent', value: 30000, color: '#ef4444' },
            { label: 'Groceries', value: 15000, color: '#f97316' },
            { label: 'Utilities', value: 12000, color: '#eab308' },
            { label: 'Fuel', value: 8000, color: '#22c55e' },
          ],
        };
      case 'profit':
        return {
          title: 'Profit & Loss',
          description: 'Net profit/loss for the selected period',
          stats: [
            { label: 'Net Profit', value: 'PKR 65,000', change: '+18%' },
            { label: 'Income', value: 'PKR 150,000', change: '+12%' },
            { label: 'Expenses', value: 'PKR 85,000', change: '-5%' },
          ],
          chartType: 'line',
          chartData: [
            { label: 'Jan', income: 120000, expense: 80000 },
            { label: 'Feb', income: 130000, expense: 85000 },
            { label: 'Mar', income: 140000, expense: 90000 },
            { label: 'Apr', income: 150000, expense: 85000 },
          ],
        };
      case 'property':
        return {
          title: 'Property Value',
          description: 'Current value of all properties',
          stats: [
            { label: 'Total Value', value: 'PKR 10,000,000', change: '+8%' },
            { label: 'Properties', value: '3', change: '' },
            { label: 'Avg. Value', value: 'PKR 3,333,333', change: '' },
          ],
          chartType: 'bar',
          chartData: [
            { label: 'Main House', value: 5000000, color: '#3b82f6' },
            { label: 'Farm Land', value: 2000000, color: '#22c55e' },
            { label: 'Rental Apt', value: 3000000, color: '#8b5cf6' },
          ],
        };
      default:
        return getReportData();
    }
  };

  const reportData = getReportData();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">View your financial and asset reports</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 text-white font-medium rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all"
        >
          <Download className="w-5 h-5" />
          <span>Export Report</span>
        </motion.button>
      </motion.div>

      {/* Report Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Report Type</h3>
            <div className="grid grid-cols-2 gap-3">
              {reportTypes.map((report) => {
                const Icon = report.icon;
                return (
                  <motion.button
                    key={report.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedReport(report.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                      selectedReport === report.id
                        ? 'bg-purple-100 dark:bg-purple-900/20 border border-purple-500'
                        : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${selectedReport === report.id ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`} />
                    <span className={`font-medium ${selectedReport === report.id ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-200'}`}>
                      {report.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Time Range</h3>
            <div className="flex flex-wrap gap-2">
              {timeRanges.map((range) => (
                <motion.button
                  key={range.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTimeRange(range.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    timeRange === range.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {range.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Report Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {reportData.stats.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
            {stat.change && (
              <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stat.change}
              </p>
            )}
          </div>
        ))}
      </motion.div>

      {/* Report Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{reportData.title}</h3>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {timeRanges.find(r => r.id === timeRange)?.name}
            </span>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{reportData.description}</p>
        
        {/* Chart Placeholder */}
        <div className="h-96 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              {reportData.chartType === 'bar' && <BarChart3 className="w-10 h-10 text-purple-600 dark:text-purple-400" />}
              {reportData.chartType === 'pie' && <PieChart className="w-10 h-10 text-purple-600 dark:text-purple-400" />}
              {reportData.chartType === 'line' && <LineChart className="w-10 h-10 text-purple-600 dark:text-purple-400" />}
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              {reportData.chartType.charAt(0).toUpperCase() + reportData.chartType.slice(1)} Chart
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Chart will be rendered here with actual data
            </p>
          </div>
        </div>
      </motion.div>

      {/* Report Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Detailed Data</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </motion.button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Category</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {reportData.chartData.map((item: any, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + 0.05 * index }}
                  className="border-b border-gray-100 dark:border-gray-800"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-medium text-gray-900 dark:text-white">
                      PKR {item.value.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {((item.value / reportData.chartData.reduce((sum: number, i: any) => sum + i.value, 0)) * 100).toFixed(1)}%
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
