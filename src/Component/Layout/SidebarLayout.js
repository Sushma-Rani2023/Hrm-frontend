// src/components/layout/SidebarLayout.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { hasPermission } from '../../services/authService';

const SidebarLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const getSidebarLinks = () => {
    const links = [];
    
    // Always show dashboard
    links.push({
      path: '/dashboard',
      label: 'Dashboard',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    });

    if (user?.role === 'superadmin') {
      links.push(
        {
          path: '/companies',
          label: 'Companies',
          icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
        },
        {
          path: '/subscriptions',
          label: 'Subscriptions',
          icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z'
        }
      );
    } else if (user?.role === 'admin' || user?.role === 'manager') {
      // Check permissions for each module
      if (hasPermission('users', 'view')) {
        links.push({
          path: '/users',
          label: 'Users',
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        });
      }

      if (hasPermission('departments', 'view')) {
        links.push({
          path: '/departments',
          label: 'Departments',
          icon: 'M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2'
        });
      }

      if (hasPermission('employees', 'view')) {
        links.push({
          path: '/employees',
          label: 'Employees',
          icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
        });
      }

      if (hasPermission('attendance', 'view')) {
        links.push({
          path: '/attendance',
          label: 'Attendance',
          icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
        });
      }

      if (hasPermission('leaves', 'view')) {
        links.push({
          path: '/leave-management',
          label: 'Leave',
          icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
        });
      }

      if (hasPermission('payroll', 'view')) {
        links.push({
          path: '/payroll',
          label: 'Payroll',
          icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
        });
      }

      if (hasPermission('devices', 'view')) {
        links.push({
          path: '/devices',
          label: 'Devices',
          icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
        });
      }

      if (hasPermission('settings', 'view')) {
        links.push({
          path: '/company-settings',
          label: 'Settings',
          icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
        });
      }
    } else if (user?.role === 'employee') {
      links.push(
        {
          path: '/my-attendance',
          label: 'My Attendance',
          icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
        },
        {
          path: '/my-leaves',
          label: 'Leave Requests',
          icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
        },
        {
          path: '/my-payslips',
          label: 'Payslips',
          icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
        }
      );
    }

    return links;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div 
        className={`bg-blue-800 text-white w-64 min-h-screen flex-shrink-0 ${
          isSidebarOpen ? 'block' : 'hidden'
        } md:block`}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-8">APS System</h1>
          <nav className="space-y-2">
            {getSidebarLinks().map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 p-2 rounded-md hover:bg-blue-700 ${
                  location.pathname === link.path ? 'bg-blue-700' : ''
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={link.icon}
                  />
                </svg>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">Welcome, {user?.name}</span>
                <button
                  onClick={() => {
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;