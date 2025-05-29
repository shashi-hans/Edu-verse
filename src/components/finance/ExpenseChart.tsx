
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Transaction, Category } from '@/types/finance';

interface ExpenseChartProps {
  transactions: Transaction[];
  categories: Category[];
  type: 'pie' | 'bar' | 'line' | 'area';
}

const ExpenseChart = ({ transactions, categories, type }: ExpenseChartProps) => {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  // Prepare data for different chart types
  const preparePieData = () => {
    const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([category, amount]) => {
      const categoryInfo = categories.find(c => c.name === category);
      return {
        name: category,
        value: amount,
        color: categoryInfo?.color || '#8884d8',
      };
    });
  };

  const prepareBarData = () => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return {
        month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        year: date.getFullYear(),
        monthIndex: date.getMonth(),
      };
    }).reverse();

    return last6Months.map(({ month, year, monthIndex }) => {
      const monthExpenses = expenseTransactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getFullYear() === year && transactionDate.getMonth() === monthIndex;
      });

      const total = monthExpenses.reduce((sum, t) => sum + t.amount, 0);
      
      return {
        month,
        expenses: total,
        income: transactions
          .filter(t => t.type === 'income')
          .filter(t => {
            const transactionDate = new Date(t.date);
            return transactionDate.getFullYear() === year && transactionDate.getMonth() === monthIndex;
          })
          .reduce((sum, t) => sum + t.amount, 0),
      };
    });
  };

  const pieData = preparePieData();
  const barData = prepareBarData();

  const renderChart = () => {
    switch (type) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, '']} />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              <Bar dataKey="income" fill="#22c55e" name="Income" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, '']} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" />
              <Line type="monotone" dataKey="income" stroke="#22c55e" name="Income" />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, '']} />
              <Area type="monotone" dataKey="income" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
              <Area type="monotone" dataKey="expenses" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'pie':
        return 'Expense Breakdown by Category';
      case 'bar':
        return 'Income vs Expenses (6 Months)';
      case 'line':
        return 'Financial Trend Analysis';
      case 'area':
        return 'Cash Flow Overview';
      default:
        return 'Financial Chart';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'pie':
        return 'See where your money is being spent';
      case 'bar':
        return 'Compare your income and expenses over time';
      case 'line':
        return 'Track your financial trends';
      case 'area':
        return 'Visualize your cash flow patterns';
      default:
        return 'Your financial data visualization';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getTitle()}
        </CardTitle>
        <CardDescription>{getDescription()}</CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ? (
          renderChart()
        ) : (
          <div className="flex items-center justify-center h-[300px] text-gray-500">
            No transaction data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
