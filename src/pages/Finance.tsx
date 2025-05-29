
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Plus,
  PieChart,
  BarChart3,
  Calendar
} from 'lucide-react';
import TransactionForm from '@/components/finance/TransactionForm';
import BudgetManager from '@/components/finance/BudgetManager';
import ExpenseChart from '@/components/finance/ExpenseChart';
import TransactionList from '@/components/finance/TransactionList';
import CategoryManager from '@/components/finance/CategoryManager';
import FinancialOverview from '@/components/finance/FinancialOverview';
import { Transaction, Budget, Category, FinancialSummary } from '@/types/finance';

const Finance = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Default categories
  const defaultCategories: Category[] = [
    { id: '1', name: 'Food & Dining', color: '#ef4444', icon: '🍔', type: 'expense' },
    { id: '2', name: 'Transportation', color: '#3b82f6', icon: '🚗', type: 'expense' },
    { id: '3', name: 'Shopping', color: '#8b5cf6', icon: '🛍️', type: 'expense' },
    { id: '4', name: 'Entertainment', color: '#f59e0b', icon: '🎬', type: 'expense' },
    { id: '5', name: 'Bills & Utilities', color: '#ef4444', icon: '⚡', type: 'expense' },
    { id: '6', name: 'Healthcare', color: '#10b981', icon: '🏥', type: 'expense' },
    { id: '7', name: 'Salary', color: '#059669', icon: '💼', type: 'income' },
    { id: '8', name: 'Freelance', color: '#0891b2', icon: '💻', type: 'income' },
    { id: '9', name: 'Investments', color: '#7c3aed', icon: '📈', type: 'income' },
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('financeTransactions');
    const savedBudgets = localStorage.getItem('financeBudgets');
    const savedCategories = localStorage.getItem('financeCategories');

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets));
    }
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(defaultCategories);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('financeTransactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('financeBudgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('financeCategories', JSON.stringify(categories));
  }, [categories]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
    setShowTransactionForm(false);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addBudget = (budget: Omit<Budget, 'id' | 'spent'>) => {
    const newBudget: Budget = {
      ...budget,
      id: Date.now().toString(),
      spent: 0,
    };
    setBudgets(prev => [...prev, newBudget]);
  };

  const updateBudget = (id: string, updates: Partial<Budget>) => {
    setBudgets(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
  };

  // Calculate financial summary
  const calculateSummary = (): FinancialSummary => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpenses;
    
    const totalBudgetLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
    const budgetUtilization = totalBudgetLimit > 0 ? (totalExpenses / totalBudgetLimit) * 100 : 0;

    return {
      totalIncome,
      totalExpenses,
      balance,
      budgetUtilization,
    };
  };

  const summary = calculateSummary();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Personal Finance Tracker
              </h1>
              <p className="text-gray-600 mt-2">
                Take control of your finances with smart budgeting and expense tracking
              </p>
            </div>
            <Button 
              onClick={() => setShowTransactionForm(true)}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Financial Overview Cards */}
        <FinancialOverview summary={summary} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="budgets" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Budgets
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Categories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExpenseChart 
                transactions={transactions} 
                categories={categories}
                type="pie"
              />
              <ExpenseChart 
                transactions={transactions} 
                categories={categories}
                type="bar"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest financial activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <TransactionList 
                    transactions={transactions.slice(0, 5)}
                    categories={categories}
                    onDelete={deleteTransaction}
                    showAll={false}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Overview</CardTitle>
                  <CardDescription>Track your spending against budgets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {budgets.slice(0, 3).map(budget => {
                    const spent = transactions
                      .filter(t => t.type === 'expense' && t.category === budget.category)
                      .reduce((sum, t) => sum + t.amount, 0);
                    
                    const percentage = budget.limit > 0 ? (spent / budget.limit) * 100 : 0;
                    
                    return (
                      <div key={budget.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{budget.category}</span>
                          <span className="text-gray-600">
                            ${spent.toFixed(2)} / ${budget.limit.toFixed(2)}
                          </span>
                        </div>
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className="h-2"
                        />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionList 
              transactions={transactions}
              categories={categories}
              onDelete={deleteTransaction}
              showAll={true}
            />
          </TabsContent>

          <TabsContent value="budgets">
            <BudgetManager 
              budgets={budgets}
              categories={categories}
              transactions={transactions}
              onAdd={addBudget}
              onUpdate={updateBudget}
              onDelete={deleteBudget}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExpenseChart 
                transactions={transactions} 
                categories={categories}
                type="line"
              />
              <ExpenseChart 
                transactions={transactions} 
                categories={categories}
                type="area"
              />
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager 
              categories={categories}
              onUpdate={setCategories}
            />
          </TabsContent>
        </Tabs>

        {/* Transaction Form Modal */}
        {showTransactionForm && (
          <TransactionForm 
            categories={categories}
            onSubmit={addTransaction}
            onClose={() => setShowTransactionForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Finance;
