import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import AdminLayout from '../components/feature/AdminLayout';

const HomePage = lazy(() => import('../pages/home/page'));
const ReportLostPage = lazy(() => import('../pages/report-lost/page'));
const ReportFoundPage = lazy(() => import('../pages/report-found/page'));
const BrowseItemsPage = lazy(() => import('../pages/browse-items/page'));
const MatchNotificationPage = lazy(() => import('../pages/match-notification/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Admin Pages
const AdminLoginPage = lazy(() => import('../pages/admin/login/page'));
const AdminDashboardPage = lazy(() => import('../pages/admin/dashboard/page'));
const AdminReportsPage = lazy(() => import('../pages/admin/reports/page'));
const AdminMatchesPage = lazy(() => import('../pages/admin/matches/page'));
const AdminClaimsPage = lazy(() => import('../pages/admin/claims/page'));
const AdminConversationsPage = lazy(() => import('../pages/admin/conversations/page'));
const AdminNotificationsPage = lazy(() => import('../pages/admin/notifications/page'));
const AdminLogsPage = lazy(() => import('../pages/admin/logs/page'));
const AdminHistoryPage = lazy(() => import('../pages/admin/history/page'));
const AdminSettingsPage = lazy(() => import('../pages/admin/settings/page'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/report-lost',
    element: <ReportLostPage />
  },
  {
    path: '/report-found',
    element: <ReportFoundPage />
  },
  {
    path: '/browse-items',
    element: <BrowseItemsPage />
  },
  {
    path: '/match-notification',
    element: <MatchNotificationPage />
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />
  },
  {
    path: '/admin/dashboard',
    element: <AdminLayout><AdminDashboardPage /></AdminLayout>
  },
  {
    path: '/admin/reports',
    element: <AdminLayout><AdminReportsPage /></AdminLayout>
  },
  {
    path: '/admin/matches',
    element: <AdminLayout><AdminMatchesPage /></AdminLayout>
  },
  {
    path: '/admin/claims',
    element: <AdminLayout><AdminClaimsPage /></AdminLayout>
  },
  {
    path: '/admin/conversations',
    element: <AdminLayout><AdminConversationsPage /></AdminLayout>
  },
  {
    path: '/admin/notifications',
    element: <AdminLayout><AdminNotificationsPage /></AdminLayout>
  },
  {
    path: '/admin/logs',
    element: <AdminLayout><AdminLogsPage /></AdminLayout>
  },
  {
    path: '/admin/history',
    element: <AdminLayout><AdminHistoryPage /></AdminLayout>
  },
  {
    path: '/admin/settings',
    element: <AdminLayout><AdminSettingsPage /></AdminLayout>
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
