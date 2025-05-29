
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { FinancialSummary } from '@/types/finance';

interface FinancialOverviewProps {
  summary: FinancialSummary;
}

const FinancialOverview = ({ summary }: FinancialOverviewProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const cards = [
    {
      title: 'Total Balance',
      value: formatCurrency(summary.balance),
      icon: Wallet,
      color: summary.balance >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: summary.balance >= 0 ? 'bg-green-50' : 'bg-red-50',
      description: summary.balance >= 0 ? 'Positive balance' : 'Negative balance',
    },
    {
      title: 'Total Income',
      value: formatCurrency(summary.totalIncome),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'This month',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(summary.totalExpenses),
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'This month',
    },
    {
      title: 'Budget Usage',
      value: `${summary.budgetUtilization.toFixed(1)}%`,
      icon: DollarSign,
      color: summary.budgetUtilization > 80 ? 'text-red-600' : 'text-blue-600',
      bgColor: summary.budgetUtilization > 80 ? 'bg-red-50' : 'bg-blue-50',
      description: 'Of total budget',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.color}`}>
                {card.value}
              </div>
              <CardDescription className="text-xs text-gray-500 mt-1">
                {card.description}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default FinancialOverview;
