
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import { Category } from '@/types/finance';

interface CategoryManagerProps {
  categories: Category[];
  onUpdate: (categories: Category[]) => void;
}

const CategoryManager = ({ categories, onUpdate }: CategoryManagerProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    color: '#3b82f6',
    icon: '🏷️',
    type: 'expense' as 'income' | 'expense',
  });

  const commonIcons = {
    expense: ['🍔', '🚗', '🛍️', '🎬', '⚡', '🏥', '🏠', '📱', '🎓', '💊'],
    income: ['💼', '💻', '📈', '🏦', '💰', '🎯', '🎨', '📊', '🔧', '🎪'],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter a category name');
      return;
    }

    if (editingCategory) {
      const updatedCategories = categories.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, ...formData }
          : cat
      );
      onUpdate(updatedCategories);
      setEditingCategory(null);
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData,
      };
      onUpdate([...categories, newCategory]);
    }

    setFormData({ name: '', color: '#3b82f6', icon: '🏷️', type: 'expense' });
    setShowForm(false);
  };

  const startEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      color: category.color,
      icon: category.icon,
      type: category.type,
    });
    setShowForm(true);
  };

  const deleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      onUpdate(categories.filter(cat => cat.id !== id));
    }
  };

  const incomeCategories = categories.filter(cat => cat.type === 'income');
  const expenseCategories = categories.filter(cat => cat.type === 'expense');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Category Management</h2>
          <p className="text-gray-600">Organize your transactions with custom categories</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      {/* Category Form */}
      {showForm && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle>{editingCategory ? 'Edit Category' : 'Create New Category'}</CardTitle>
            <CardDescription>
              {editingCategory ? 'Update category details' : 'Add a new category for your transactions'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="e.g., Groceries"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: 'income' | 'expense') => 
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
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

                <div>
                  <Label htmlFor="icon">Icon</Label>
                  <Select
                    value={formData.icon}
                    onValueChange={(value) => setFormData({ ...formData, icon: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {commonIcons[formData.type].map(icon => (
                        <SelectItem key={icon} value={icon}>
                          <span className="text-lg">{icon}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingCategory(null);
                    setFormData({ name: '', color: '#3b82f6', icon: '🏷️', type: 'expense' });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-5 h-5" />
              Income Categories ({incomeCategories.length})
            </CardTitle>
            <CardDescription>Categories for tracking your income sources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {incomeCategories.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Tag className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>No income categories yet</p>
              </div>
            ) : (
              incomeCategories.map(category => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{category.icon}</span>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <Badge 
                        style={{ backgroundColor: category.color, color: 'white' }}
                        className="text-xs"
                      >
                        Income
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(category)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteCategory(category.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <TrendingDown className="w-5 h-5" />
              Expense Categories ({expenseCategories.length})
            </CardTitle>
            <CardDescription>Categories for tracking your expenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {expenseCategories.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Tag className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>No expense categories yet</p>
              </div>
            ) : (
              expenseCategories.map(category => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{category.icon}</span>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <Badge 
                        style={{ backgroundColor: category.color, color: 'white' }}
                        className="text-xs"
                      >
                        Expense
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(category)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteCategory(category.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CategoryManager;
