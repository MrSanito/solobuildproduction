import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-slate-800">
      {/* Top Navigation */}
      <header className="navbar bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button className="btn btn-ghost btn-circle text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
        
        <div className="flex-1 max-w-3xl px-4 hidden md:block">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input type="text" placeholder="Search..." className="input input-sm h-10 input-bordered w-full pl-10 rounded-full bg-white border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="btn btn-ghost btn-circle relative text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>
          
          <div className="flex items-center gap-3 ml-2">
            <div className="hidden text-right sm:block">
              <div className="text-sm font-semibold text-gray-800 leading-tight">Sarah Johnson</div>
              <div className="text-[11px] text-gray-500 leading-tight">Production Manager</div>
            </div>
            <div className="avatar placeholder cursor-pointer">
              <div className="bg-blue-600 text-white rounded-full w-9 h-9">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Overview of system performance and critical metrics</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          
          {/* Active Jobs Card */}
          <div className="card bg-white border border-gray-100 shadow-sm rounded-xl p-5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">24</h2>
            <p className="text-sm text-gray-500 mt-0.5">Active Jobs</p>
            <div className="flex items-center gap-1 mt-3 text-xs font-medium text-emerald-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              <span>+12%</span>
            </div>
          </div>

          {/* Delayed Jobs Card */}
          <div className="card bg-white border border-gray-100 shadow-sm rounded-xl p-5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">3</h2>
            <p className="text-sm text-gray-500 mt-0.5">Delayed Jobs</p>
            <div className="flex items-center gap-1 mt-3 text-xs font-medium text-emerald-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
              <span>-8%</span>
            </div>
          </div>

          {/* Machine Utilization Card */}
          <div className="card bg-white border border-gray-100 shadow-sm rounded-xl p-5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">87%</h2>
            <p className="text-sm text-gray-500 mt-0.5">Machine Utilization</p>
            <div className="flex items-center gap-1 mt-3 text-xs font-medium text-emerald-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              <span>+5%</span>
            </div>
          </div>

          {/* Inventory Risk Count Card */}
          <div className="card bg-white border border-gray-100 shadow-sm rounded-xl p-5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">7</h2>
            <p className="text-sm text-gray-500 mt-0.5">Inventory Risk Count</p>
            <div className="flex items-center gap-1 mt-3 text-xs font-medium text-rose-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
              <span>+2</span>
            </div>
          </div>

          {/* Labour Availability Card */}
          <div className="card bg-white border border-gray-100 shadow-sm rounded-xl p-5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">92%</h2>
            <p className="text-sm text-gray-500 mt-0.5">Labour Availability</p>
            <div className="flex items-center gap-1 mt-3 text-xs font-medium text-emerald-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              <span>+3%</span>
            </div>
          </div>
        </div>

        {/* System Health Section */}
        <div className="card bg-white border border-gray-100 shadow-sm rounded-xl p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">System Health</h3>
          
          <div className="space-y-6">
            {/* Production On-Track */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-gray-700">Production On-Track</span>
                <span className="text-lg font-bold text-gray-900">88%</span>
              </div>
              <progress className="progress progress-success w-full h-2.5 bg-gray-100" value="88" max="100"></progress>
            </div>

            {/* Machine Usage */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-gray-700">Machine Usage</span>
                <span className="text-lg font-bold text-gray-900">87%</span>
              </div>
              <progress className="progress progress-info w-full h-2.5 bg-gray-100" value="87" max="100"></progress>
            </div>

            {/* Inventory Health */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-gray-700">Inventory Health</span>
                <span className="text-lg font-bold text-gray-900">76%</span>
              </div>
              <progress className="progress progress-warning w-full h-2.5 bg-gray-100 [&::-webkit-progress-value]:bg-orange-500 [&::-moz-progress-bar]:bg-orange-500" value="76" max="100"></progress>
            </div>
          </div>
        </div>

        {/* Critical Alerts Section */}
        <div className="card bg-white border border-gray-100 shadow-sm rounded-xl p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Critical Alerts</h3>
          
          <div className="space-y-3">
            {/* Alert 1 */}
            <div className="flex justify-between items-center p-3 rounded-lg bg-rose-50 border border-rose-100 text-sm">
              <span className="font-medium text-rose-800">Material shortage detected for JOB-0852</span>
              <span className="text-rose-400 text-xs whitespace-nowrap ml-4">5 min ago</span>
            </div>

            {/* Alert 2 */}
            <div className="flex justify-between items-center p-3 rounded-lg bg-orange-50 border border-orange-100 text-sm">
              <span className="font-medium text-orange-800">CNC-03 maintenance due in 2 days</span>
              <span className="text-orange-400 text-xs whitespace-nowrap ml-4">1 hour ago</span>
            </div>

            {/* Alert 3 */}
            <div className="flex justify-between items-center p-3 rounded-lg bg-rose-50 border border-rose-100 text-sm">
              <span className="font-medium text-rose-800">Delayed delivery expected for Client: TechCorp</span>
              <span className="text-rose-400 text-xs whitespace-nowrap ml-4">2 hours ago</span>
            </div>

            {/* Alert 4 */}
            <div className="flex justify-between items-center p-3 rounded-lg bg-orange-50 border border-orange-100 text-sm">
              <span className="font-medium text-orange-800">Labour shortage on second shift</span>
              <span className="text-orange-400 text-xs whitespace-nowrap ml-4">3 hours ago</span>
            </div>

            {/* Alert 5 */}
            <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50 border border-blue-100 text-sm">
              <span className="font-medium text-blue-800">New production order received: JOB-0855</span>
              <span className="text-blue-400 text-xs whitespace-nowrap ml-4">4 hours ago</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;