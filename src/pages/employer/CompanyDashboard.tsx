import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Briefcase,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Bot,
  FileText,
  Eye
} from 'lucide-react';

const CompanyDashboard = () => {
  const kpiData = [
    {
      title: 'Open Jobs',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Briefcase,
      color: 'bg-blue-500'
    },
    {
      title: 'Candidates in Pipeline',
      value: '248',
      change: '+45',
      trend: 'up',
      icon: Users,
      color: 'bg-teal-500'
    },
    {
      title: 'Interviews Scheduled',
      value: '18',
      change: '+5',
      trend: 'up',
      icon: Calendar,
      color: 'bg-purple-500'
    },
    {
      title: 'Time to Hire (avg)',
      value: '23 days',
      change: '-5 days',
      trend: 'up',
      icon: Clock,
      color: 'bg-orange-500'
    },
    {
      title: 'Offers Extended',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'AI Screened',
      value: '156',
      change: '+32',
      trend: 'up',
      icon: Bot,
      color: 'bg-indigo-500'
    },
  ];

  const recentActivity = [
    { type: 'application', message: 'New application for Senior Developer', time: '5 min ago', icon: FileText },
    { type: 'screening', message: 'AI screening completed for 12 candidates', time: '1 hour ago', icon: Bot },
    { type: 'interview', message: 'Interview scheduled with Priya Sharma', time: '2 hours ago', icon: Calendar },
    { type: 'hire', message: 'Offer accepted by Amit Patel', time: '1 day ago', icon: CheckCircle },
  ];

  const hiringFunnel = [
    { stage: 'Applications', count: 248, percentage: 100 },
    { stage: 'Screened', count: 156, percentage: 63 },
    { stage: 'Interviewed', count: 45, percentage: 18 },
    { stage: 'Offered', count: 12, percentage: 5 },
    { stage: 'Hired', count: 8, percentage: 3 },
  ];

  const aiRecommendations = [
    { title: 'Review pending applications', description: '23 applications awaiting review for more than 3 days', priority: 'high' },
    { title: 'Update job description', description: 'Frontend Developer position has low engagement - consider updating', priority: 'medium' },
    { title: 'Schedule follow-ups', description: '5 candidates in final stage need follow-up calls', priority: 'low' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Company Dashboard</h1>
          <p className="text-neutral-600">Welcome back! Here's your hiring overview.</p>
        </div>
        <Button className="bg-navy-800 hover:bg-navy-900">
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">{kpi.title}</p>
                  <p className="text-3xl font-bold text-navy-900">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                    <span className="text-xs text-neutral-500 ml-1">vs last week</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${kpi.color}`}>
                  <kpi.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hiring Funnel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-teal-600" />
              Hiring Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hiringFunnel.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-navy-800">{stage.stage}</span>
                    <span className="text-neutral-600">{stage.count} ({stage.percentage}%)</span>
                  </div>
                  <Progress value={stage.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-teal-500" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiRecommendations.map((rec, index) => (
              <div 
                key={index} 
                className="p-3 rounded-lg bg-neutral-50 border-l-4 hover:bg-neutral-100 transition-colors cursor-pointer"
                style={{ 
                  borderLeftColor: rec.priority === 'high' ? '#ef4444' : rec.priority === 'medium' ? '#f59e0b' : '#22c55e' 
                }}
              >
                <p className="font-medium text-sm text-navy-800">{rec.title}</p>
                <p className="text-xs text-neutral-600 mt-1">{rec.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-neutral-600" />
              Recent Activity
            </span>
            <Button variant="ghost" size="sm" className="text-teal-600">
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <div className="p-2 rounded-full bg-teal-100">
                  <activity.icon className="h-4 w-4 text-teal-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-navy-800">{activity.message}</p>
                  <p className="text-xs text-neutral-500">{activity.time}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDashboard;
