import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Users, 
  DollarSign, 
  CreditCard, 
  Building2, 
  Car, 
  Dog,
  Package, 
  FileText, 
  Calendar, 
  BarChart3, 
  Settings, 
  Bell,
  Menu,
  X,
  Bot,
  Heart,
  PiggyBank,
  ShoppingCart,
  ListTodo,
  TreePalm,
  Gem,
  Banknote,
  Stethoscope,
  FolderOpen,
  AlertTriangle,
  Bank
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Family', href: '/family', icon: Users },
  { name: 'Income', href: '/income', icon: DollarSign },
  { name: 'Expenses', href: '/expenses', icon: CreditCard },
  { name: 'Budget', href: '/budget', icon: PiggyBank },
  { name: 'Bills', href: '/bills', icon: FileText },
  { name: 'Loans', href: '/loans', icon: Banknote },
  { name: 'Properties', href: '/properties', icon: Building2 },
  { name: 'Animals', href: '/animals', icon: Dog },
  { name: 'Vehicles', href: '/vehicles', icon: Car },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Health', href: '/health', icon: Heart },
  { name: 'Documents', href: '/documents', icon: FolderOpen },
  { name: 'Emergency', href: '/emergency', icon: AlertTriangle },
  { name: 'Shopping', href: '/shopping', icon: ShoppingCart },
  { name: 'Tasks', href: '/tasks', icon: ListTodo },
  { name: 'Farm', href: '/farm', icon: TreePalm },
  { name: 'Assets', href: '/assets', icon: Gem },
  { name: 'Bank Accounts', href: '/bank-accounts', icon: Bank },
  { name: 'AI Assistant', href: '/ai', icon: Bot },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const bottomNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Family', href: '/family', icon: Users },
  { name: 'Finance', href: '/income', icon: DollarSign },
  { name: 'Properties', href: '/properties', icon: Building2 },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleNavigate = (href: string) => {
    navigate(href);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between h-16 px-4 safe-area-inset-top">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">HomeSphere</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            >
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              AR
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="fixed inset-0 bg-black/50 dark:bg-black/20"
              onClick={toggleSidebar}
            />
            <div className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-xl z-50">
              <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800">
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">HomeSphere</span>
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto hide-scrollbar">
                <ul className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.href);
                    return (
                      <li key={item.name}>
                        <button
                          onClick={() => handleNavigate(item.href)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        >
                          <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                          <span className="flex-1 text-left">{item.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-col z-40">
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800">
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">HomeSphere</span>
        </div>
        <div className="flex-1 p-4 overflow-y-auto hide-scrollbar">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigate(item.href)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                    <span className="flex-1 text-left">{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 safe-area-inset-bottom">
        <div className="flex justify-around py-2">
          {bottomNavItems.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.href)}
                className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${isActive ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-xs font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen pt-16 lg:pt-0 lg:pl-72 pb-16 lg:pb-0">
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}