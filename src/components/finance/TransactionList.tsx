
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trash2, Search, TrendingUp, TrendingDown } from 'lucide-react';
import { Transaction, Category } from '@/types/finance';

interface TransactionListProps {
  transactions: Transaction[];
  categories: Category[];
  onDelete: (id: string) => void;
  showAll: boolean;
}

const TransactionList = ({ transactions, categories, onDelete, showAll }: TransactionListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesType;
  });

  const displayTransactions = showAll ? filteredTransactions : filteredTransactions.slice(0, 5);

  const getCategoryInfo = (categoryName: string) => {
    return categories.find(c => c.name === categoryName);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Transactions</span>
          {showAll && (
            <span className="text-sm font-normal text-gray-500">
              {filteredTransactions.length} transactions
            </span>
          )}
        </CardTitle>
        <CardDescription>
          {showAll ? 'Manage all your financial transactions' : 'Your recent financial activity'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAll && (
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('all')}
              >
                All
              </Button>
              <Button
                variant={filterType === 'income' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('income')}
                className="text-green-600 border-green-200"
              >
                Income
              </Button>
              <Button
                variant={filterType === 'expense' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('expense')}
                className="text-red-600 border-red-200"
              >
                Expenses
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {displayTransactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No transactions found matching your search.' : 'No transactions yet. Add your first transaction to get started!'}
            </div>
          ) : (
            displayTransactions.map((transaction) => {
              const categoryInfo = getCategoryInfo(transaction.category);
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                      {transaction.type === 'income' ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <span>{categoryInfo?.icon}</span>
                        <span>{transaction.category}</span>
                        <span>•</span>
                        <span>{formatDate(transaction.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className={`font-bold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </div>
                      <Badge variant={transaction.type === 'income' ? 'default' : 'secondary'} className="text-xs">
                        {transaction.type}
                      </Badge>
                    </div>
                    {showAll && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(transaction.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
