import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Loader2, Sparkles, Mic, Paperclip } from 'lucide-react';

export default function AIAssistant() {
  const [messages, setMessages] = useState<{id: string; role: 'user' | 'assistant'; content: string; timestamp: Date}[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your HomeSphere AI Assistant. How can I help you today? You can ask me questions like: "How much did I spend this month?", "Which property earns the most?", "Show my savings progress", or "List all upcoming bills"',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1000));

    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant' as const,
      content: getAIResponse(input.trim()),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('spend') || lowerQuery.includes('expense')) {
      return 'This month, you have spent PKR 85,000. Your biggest expense category is Rent (PKR 30,000), followed by Groceries (PKR 15,000) and Utilities (PKR 12,000).';
    }
    
    if (lowerQuery.includes('income') || lowerQuery.includes('earn')) {
      return 'This month, you have earned PKR 150,000. Your income sources include: Salary (PKR 50,000), Freelancing (PKR 30,000), Rental Income (PKR 25,000), and Investment (PKR 15,000).';
    }
    
    if (lowerQuery.includes('savings') || lowerQuery.includes('save')) {
      return 'Your current savings balance is PKR 2,450,000. You are on track with your savings goals. Your monthly savings rate is 25% of your income.';
    }
    
    if (lowerQuery.includes('property') || lowerQuery.includes('properties')) {
      return 'You have 3 properties with a total value of PKR 10,000,000. Your highest earning property is the Rental Apartment generating PKR 25,000/month.';
    }
    
    if (lowerQuery.includes('animal') || lowerQuery.includes('animals') || lowerQuery.includes('cow')) {
      return 'You have 4 animals: 2 pets (Dog, Cat) and 2 livestock (Cow, Buffalo). All animals are in good health. Cow #123 needs vaccination in 3 days.';
    }
    
    if (lowerQuery.includes('bill') || lowerQuery.includes('bills') || lowerQuery.includes('due')) {
      return 'You have 1 pending bill: Electricity bill of PKR 15,000 due on June 30, 2026. All other bills are paid.';
    }
    
    if (lowerQuery.includes('budget')) {
      return 'Your monthly budget is PKR 100,000. You have spent PKR 85,000 (85% of budget). You have PKR 15,000 remaining for this month.';
    }
    
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
      return 'Hello! 👋 How can I assist you with your household management today?';
    }
    
    return 'I can help you with managing your household, family, finances, properties, animals, and more. Try asking me specific questions about your data.';
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border-b border-gray-200 dark:border-gray-800"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
            <p className="text-gray-500 dark:text-gray-400">Ask me anything about your household</p>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex-1 overflow-y-auto p-6 space-y-4"
      >
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + 0.1 * index }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} max-w-[80%]`}
          >
            <div className={`flex items-end gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-md lg:max-w-lg ${message.role === 'user' ? 'order-1' : 'order-2'}`}>
                <div className={`px-4 py-3 rounded-2xl ${message.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-sm' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm'}`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-400 dark:text-gray-500'} text-right`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">AR</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start max-w-[80%]"
          >
            <div className="flex items-end gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="max-w-md lg:max-w-lg">
                <div className="px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-600 dark:text-gray-300" />
                    <span className="text-gray-600 dark:text-gray-300">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </motion.div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="px-6 pb-4"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Try these suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'How much did I spend this month?',
              'Which property earns the most?',
              'Show my savings progress',
              'List all upcoming bills',
              'Which animal needs vaccination?',
            ].map((suggestion, index) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + 0.05 * index }}
                onClick={() => setInput(suggestion)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
      >
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </motion.button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all pr-12"
            />
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
            >
              <Mic className="w-5 h-5 text-gray-400" />
            </motion.button>
          </div>
          <motion.button
            type="submit"
            disabled={!input.trim() || isLoading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-xl transition-all ${!input.trim() || isLoading ? 'bg-purple-200 dark:bg-purple-900/30 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'}`}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : <Send className="w-5 h-5 text-white" />}
          </motion.button>
        </form>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">
          AI Assistant can answer questions about your household data. All data is processed locally.
        </p>
      </motion.div>
    </div>
  );
}
