
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit, Target } from 'lucide-react';
import { Budget, Category, Transaction } from '@/types/finance';

interface BudgetManagerProps {
  budgets: Budget[];
  categories: Category[];
  transactions: Transaction[];
  onAdd: (budget: Omit<Budget, 'id' | 'spent'>) => void;
  onUpdate: (id: string, updates: Partial<Budget>) => void;
  onDelete: (id: string) => void;
}

const BudgetManager = ({ budgets, categories, transactions, onAdd, onUpdate, onDelete }: BudgetManagerProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [formData, setFormData] = useState({
    category: '',
    limit: '',
    period: 'monthly' as 'monthly' | 'weekly' | 'yearly',
    color: '#3b82f6',
  });

  const expenseCategories = categories.filter(c => c.type === 'expense');

  const calculateSpent = (budget: Budget) => {
    return transactions
      .filter(t => t.type === 'expense' && t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.limit) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingBudget) {
      onUpdate(editingBudget.id, {
        category: formData.category,
        limit: parseFloat(formData.limit),
        period: formData.period,
        color: formData.color,
      });
      setEditingBudget(null);
    } else {
      onAdd({
        category: formData.category,
        limit: parseFloat(formData.limit),
        period: formData.period,
        color: formData.color,
      });
    }

    setFormData({ category: '', limit: '', period: 'monthly', color: '#3b82f6' });
    setShowForm(false);
  };

  const startEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setFormData({
      category: budget.category,
      limit: budget.limit.toString(),
      period: budget.period,
      color: budget.color,
    });
    setShowForm(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Budget Management</h2>
          <p className="text-gray-600">Set spending limits and track your progress</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Budget
        </Button>
      </div>

      {/* Budget Form */}
      {showForm && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle>{editingBudget ? 'Edit Budget' : 'Create New Budget'}</CardTitle>
            <CardDescription>
              {editingBudget ? 'Update your budget settings' : 'Set spending limits for your categories'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories.map(category => (
                        <SelectItem key={category.id} value={category.name}>
                          <span className="flex items-center gap-2">
                            <span>{category.icon}</span>
                            {category.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="limit">Budget Limit</Label>
                  <Input
                    id="limit"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.limit}
                    onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="period">Period</Label>
                  <Select
                    value={formData.period}
                    onValueChange={(value: 'monthly' | 'weekly' | 'yearly') => 
                      setFormData({ ...formData, period: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="h-10"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingBudget ? 'Update Budget' : 'Create Budget'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingBudget(null);
                    setFormData({ category: '', limit: '', period: 'monthly', color: '#3b82f6' });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Budget List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Target className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No budgets yet</h3>
              <p className="text-gray-500 mb-4">
                Create your first budget to start tracking your spending limits
              </p>
              <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Budget
              </Button>
            </CardContent>
          </Card>
        ) : (
          budgets.map((budget) => {
            const spent = calculateSpent(budget);
            const percentage = budget.limit > 0 ? (spent / budget.limit) * 100 : 0;
            const remaining = budget.limit - spent;
            const categoryInfo = categories.find(c => c.name === budget.category);

            return (
              <Card key={budget.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{categoryInfo?.icon}</span>
                      <CardTitle className="text-lg">{budget.category}</CardTitle>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEdit(budget)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(budget.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {budget.period}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Spent</span>
                      <span className="font-medium">
                        {formatCurrency(spent)} / {formatCurrency(budget.limit)}
                      </span>
                    </div>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className="h-3"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {percentage.toFixed(1)}% used
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Remaining</span>
                    <span className={`font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(remaining)}
                    </span>
                  </div>

                  {percentage > 80 && (
                    <div className={`text-xs p-2 rounded ${
                      percentage > 100 ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      {percentage > 100 ? '⚠️ Budget exceeded!' : '⚠️ Approaching budget limit'}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BudgetManager;
