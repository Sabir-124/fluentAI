import React, { useState } from 'react';
import { User, Globe, Bell, Lock, CreditCard, HelpCircle, LogOut, Edit2, Camera, Check } from 'lucide-react';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('account');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'languages', label: 'Languages', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  const languages = [
    { name: 'Spanish', flag: '🇪🇸', level: 'Intermediate', progress: 65, active: true },
    { name: 'French', flag: '🇫🇷', level: 'Beginner', progress: 35, active: true },
    { name: 'German', flag: '🇩🇪', level: 'Advanced', progress: 85, active: false },
    { name: 'Japanese', flag: '🇯🇵', level: 'Beginner', progress: 20, active: false }
  ];

  const stats = [
    { label: 'Total Sessions', value: '127' },
    { label: 'Hours Practiced', value: '42.5' },
    { label: 'Words Learned', value: '1,234' },
    { label: 'Streak Days', value: '15' }
  ];

  return (
    <div className="min-h-screen bg-[#0F1419] text-white">
      {/* Header */}
      <header className="h-20 bg-[#0F1419]/80 backdrop-blur-lg border-b border-white/10 flex items-center px-6">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] bg-clip-text text-transparent">
            FluentAI
          </div>
          <span className="text-[#E8ECEF]/50">|</span>
          <span className="text-[#E8ECEF]/80">Profile & Settings</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-[#1A1F2E] to-[#0F1419] rounded-2xl p-8 mb-8 border border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#6C47FF] to-[#FF6B9D] flex items-center justify-center text-4xl font-bold">
                JD
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#6C47FF] rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Camera size={20} />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <h1 className="text-3xl font-bold">John Doe</h1>
                <button className="text-[#6C47FF] hover:text-[#FF6B9D] transition-colors">
                  <Edit2 size={18} />
                </button>
              </div>
              <p className="text-[#E8ECEF]/70 mb-4">john.doe@example.com</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#10B981]/20 to-[#00D9C0]/20 border border-[#10B981]/30 rounded-lg">
                <Check className="text-[#10B981]" size={16} />
                <span className="text-sm font-medium text-[#10B981]">Premium Member</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-bold text-[#00D9C0]">{stat.value}</div>
                  <div className="text-xs text-[#E8ECEF]/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-[#1A1F2E] border border-white/10 rounded-2xl p-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] text-white'
                      : 'text-[#E8ECEF]/70 hover:bg-[#2D3748]'
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
              
              <div className="border-t border-white/10 my-4" />
              
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#E8ECEF]/70 hover:bg-[#2D3748] transition-all">
                <HelpCircle size={20} />
                <span className="font-medium">Help & Support</span>
              </button>
              
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all">
                <LogOut size={20} />
                <span className="font-medium">Log Out</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-[#1A1F2E] border border-white/10 rounded-2xl p-8">
              {/* Account Tab */}
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Account Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#E8ECEF]/70 mb-2">First Name</label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="w-full bg-[#2D3748] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#6C47FF] focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#E8ECEF]/70 mb-2">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="w-full bg-[#2D3748] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#6C47FF] focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#E8ECEF]/70 mb-2">Email Address</label>
                      <input
                        type="email"
                        defaultValue="john.doe@example.com"
                        className="w-full bg-[#2D3748] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#6C47FF] focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#E8ECEF]/70 mb-2">Bio</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="w-full bg-[#2D3748] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#6C47FF] focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>
                  
                  <button className="px-6 py-3 bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] rounded-lg font-semibold hover:scale-105 transition-transform">
                    Save Changes
                  </button>
                </div>
              )}

              {/* Languages Tab */}
              {activeTab === 'languages' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">My Languages</h2>
                    <button className="px-4 py-2 bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] rounded-lg text-sm font-semibold hover:scale-105 transition-transform">
                      + Add Language
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {languages.map((lang, idx) => (
                      <div
                        key={idx}
                        className="bg-[#2D3748] border border-white/10 rounded-xl p-6 hover:border-[#6C47FF] transition-all"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <span className="text-4xl">{lang.flag}</span>
                            <div>
                              <h3 className="text-lg font-semibold">{lang.name}</h3>
                              <p className="text-sm text-[#E8ECEF]/60">{lang.level}</p>
                            </div>
                          </div>
                          
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={lang.active} readOnly />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#6C47FF] peer-checked:to-[#FF6B9D]"></div>
                          </label>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-[#E8ECEF]/70">Progress</span>
                            <span className="font-semibold text-[#00D9C0]">{lang.progress}%</span>
                          </div>
                          <div className="h-2 bg-[#0F1419] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#00D9C0] to-[#6C47FF] rounded-full transition-all duration-1000"
                              style={{ width: `${lang.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    {[
                      { label: 'Push Notifications', description: 'Receive notifications on your device', state: notificationsEnabled, setState: setNotificationsEnabled },
                      { label: 'Email Updates', description: 'Get weekly progress reports via email', state: emailUpdates, setState: setEmailUpdates },
                      { label: 'Session Reminders', description: 'Daily reminders to practice', state: true },
                      { label: 'Achievement Alerts', description: 'Notifications when you unlock achievements', state: true }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-[#2D3748] rounded-xl">
                        <div>
                          <h3 className="font-semibold mb-1">{item.label}</h3>
                          <p className="text-sm text-[#E8ECEF]/60">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={item.state}
                            onChange={() => item.setState && item.setState(!item.state)}
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#6C47FF] peer-checked:to-[#FF6B9D]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[#E8ECEF]/70 mb-2">Current Password</label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full bg-[#2D3748] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#6C47FF] focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#E8ECEF]/70 mb-2">New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full bg-[#2D3748] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#6C47FF] focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#E8ECEF]/70 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full bg-[#2D3748] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#6C47FF] focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <button className="px-6 py-3 bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] rounded-lg font-semibold hover:scale-105 transition-transform">
                      Update Password
                    </button>
                  </div>
                  
                  <div className="border-t border-white/10 pt-6 mt-6">
                    <h3 className="font-semibold mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 bg-[#2D3748] rounded-xl">
                      <div>
                        <p className="font-medium mb-1">Enable 2FA</p>
                        <p className="text-sm text-[#E8ECEF]/60">Add an extra layer of security</p>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] rounded-lg text-sm font-semibold hover:scale-105 transition-transform">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Billing & Subscription</h2>
                  
                  <div className="bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">Premium Plan</h3>
                        <p className="text-white/80">Unlimited conversations & features</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">$19.99</div>
                        <div className="text-sm text-white/80">per month</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Payment Method</h3>
                    <div className="bg-[#2D3748] rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center text-xs font-bold">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-[#E8ECEF]/60">Expires 12/25</p>
                        </div>
                      </div>
                      <button className="text-[#6C47FF] hover:text-[#FF6B9D] transition-colors">
                        <Edit2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Billing History</h3>
                    <div className="space-y-2">
                      {[
                        { date: 'Jan 1, 2026', amount: '$19.99', status: 'Paid' },
                        { date: 'Dec 1, 2025', amount: '$19.99', status: 'Paid' },
                        { date: 'Nov 1, 2025', amount: '$19.99', status: 'Paid' }
                      ].map((invoice, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-[#2D3748] rounded-lg">
                          <span className="text-sm text-[#E8ECEF]/70">{invoice.date}</span>
                          <span className="font-medium">{invoice.amount}</span>
                          <span className="text-sm text-[#10B981]">{invoice.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full py-3 border border-red-400/30 text-red-400 rounded-lg font-semibold hover:bg-red-400/10 transition-all">
                    Cancel Subscription
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
