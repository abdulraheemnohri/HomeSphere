// Common utility functions

export function formatCurrency(amount: number, currency: string = 'PKR'): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatShortDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-PK', {
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('en-PK', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getInitials(name: string): string {
  return name.split(' ').map((part) => part[0]?.toUpperCase()).join('');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function getStatusColor(status: string) {
  switch (status) {
    case 'paid':
      return { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400' };
    case 'overdue':
      return { bg: 'bg-red-100 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400' };
    case 'active':
      return { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400' };
    case 'pending':
      return { bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-600 dark:text-yellow-400' };
    case 'completed':
      return { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400' };
    case 'excellent':
      return { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400' };
    case 'good':
      return { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400' };
    case 'fair':
      return { bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-600 dark:text-yellow-400' };
    case 'poor':
      return { bg: 'bg-orange-100 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400' };
    case 'critical':
      return { bg: 'bg-red-100 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400' };
    default:
      return { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-300' };
  }
}

export function getCategoryIcon(category: string) {
  const icons: Record<string, string> = {
    salary: '💰',
    business: '🏢',
    rental: '🏠',
    agriculture: '🌾',
    freelancing: '💻',
    online_earnings: '🌐',
    investment: '📈',
    dividends: '💵',
    government_benefits: '🏛️',
    donations: '🤝',
    food: '🍽️',
    rent: '🏠',
    utilities: '💡',
    education: '🎓',
    medical: '🏥',
    travel: '✈️',
    shopping: '🛍️',
    entertainment: '🎬',
    fuel: '⛽',
    animals: '🐄',
    farm: '🌱',
    maintenance: '🔧',
    taxes: '📋',
    loans: '💳',
    subscriptions: '📺',
    emergency: '⚠️',
  };
  return icons[category.toLowerCase()] || '📄';
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    salary: '#22c55e',
    business: '#3b82f6',
    rental: '#8b5cf6',
    agriculture: '#16a34a',
    freelancing: '#06b6d4',
    online_earnings: '#0891b2',
    investment: '#7c3aed',
    dividends: '#a855f7',
    government_benefits: '#f59e0b',
    donations: '#ef4444',
    food: '#ef4444',
    rent: '#3b82f6',
    utilities: '#f59e0b',
    education: '#8b5cf6',
    medical: '#ec4899',
    travel: '#10b981',
    shopping: '#f97316',
    entertainment: '#eab308',
    fuel: '#f97316',
    animals: '#10b981',
    farm: '#22c55e',
    maintenance: '#6b7280',
    taxes: '#991b1b',
    loans: '#7c2d12',
    subscriptions: '#06b6d4',
    emergency: '#dc2626',
  };
  return colors[category.toLowerCase()] || '#6b7280';
}

export function calculateProgress(current: number, target: number): number {
  return Math.min(Math.max((current / target) * 100, 0), 100);
}

export function getProgressColor(progress: number): string {
  if (progress >= 75) return 'bg-green-500';
  if (progress >= 50) return 'bg-blue-500';
  if (progress >= 25) return 'bg-yellow-500';
  return 'bg-red-500';
}
