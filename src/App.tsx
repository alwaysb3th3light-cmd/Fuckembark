import React, { useState, useEffect } from 'react';
import { X, Settings, ArrowRight } from 'lucide-react';

function formatTime(date: Date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const mins = minutes.toString().padStart(2, '0');
  const secs = seconds.toString().padStart(2, '0');
  return `${hours}:${mins}:${secs} ${ampm}`;
}

function formatDateDisplay(date: Date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export default function App() {
  const [showConfig, setShowConfig] = useState(true);
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('ticket-config');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      agencyName: 'fuckembark',
      subtitle: 'Show operator your ticket',
      passName: 'Adult Bus 7-Day Universal',
      location: 'Oklahoma City, OK',
      expiration: 'Apr 9, 2026, 11:00 PM',
      useFakeTime: false,
      fakeTime: '', 
      timeOffset: 0
    };
  });

  const handleStart = (newConfig: any) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('ticket-config', JSON.stringify(newConfig));
    } catch (e) {}
    setShowConfig(false);
  };

  if (showConfig) {
    return <SetupScreen initialData={config} onStart={handleStart} />;
  }

  return <TicketScreen data={config} onClose={() => setShowConfig(true)} />;
}

function SetupScreen({ initialData, onStart }: any) {
  const [data, setData] = useState(initialData);

  const handleToggleFake = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setData((prev: any) => {
      let ft = prev.fakeTime;
      if (checked && !ft) {
        // init to current local time string for input
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        ft = now.toISOString().slice(0, 16);
      }
      return { ...prev, useFakeTime: checked, fakeTime: ft };
    });
  };

  const submit = () => {
    let offset = 0;
    if (data.useFakeTime && data.fakeTime) {
      const parsed = new Date(data.fakeTime);
      if (!isNaN(parsed.getTime())) {
        offset = parsed.getTime() - Date.now();
      }
    }
    onStart({ ...data, timeOffset: offset });
  };

  return (
    <div className="min-h-[100dvh] bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-[#89ad43] text-white p-6 text-center">
          <Settings className="w-8 h-8 mx-auto opacity-90 mb-2" />
          <h2 className="text-xl font-bold tracking-tight">Ticket Setup</h2>
          <p className="text-green-100 text-[13px] font-medium mt-0.5">Configure your digital pass</p>
        </div>
        
        <div className="p-6 space-y-4 text-left">
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Agency/Organization</label>
            <input type="text" value={data.agencyName} onChange={e => setData({...data, agencyName: e.target.value})} className="mt-0.5 w-full border-b border-gray-200 focus:border-[#89ad43] outline-none pb-1.5 text-[15px] font-medium text-gray-900 transition-colors bg-transparent" />
          </div>

          <div>
             <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Pass Type</label>
             <input type="text" value={data.passName} onChange={e => setData({...data, passName: e.target.value})} className="mt-0.5 w-full border-b border-gray-200 focus:border-[#89ad43] outline-none pb-1.5 text-[15px] font-medium text-gray-900 transition-colors bg-transparent" />
          </div>

          <div>
             <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Expiration Text</label>
             <input type="text" value={data.expiration} onChange={e => setData({...data, expiration: e.target.value})} className="mt-0.5 w-full border-b border-gray-200 focus:border-[#89ad43] outline-none pb-1.5 text-[15px] font-medium text-gray-900 transition-colors bg-transparent" />
          </div>

          <div className="pt-3">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-[14px] font-semibold text-gray-700 select-none">Override Current Time</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={data.useFakeTime} onChange={handleToggleFake} />
                <div className={`w-[40px] h-[22px] rounded-full transition-colors duration-200 ${data.useFakeTime ? 'bg-[#89ad43]' : 'bg-gray-200 group-hover:bg-gray-300'}`}></div>
                <div className={`absolute left-[3px] top-[3px] w-[16px] h-[16px] bg-white rounded-full transition-transform duration-200 shadow-sm ${data.useFakeTime ? 'translate-x-[18px]' : ''}`}></div>
              </div>
            </label>
          </div>

          {data.useFakeTime && (
            <div className="pt-1 pb-1 animate-in fade-in slide-in-from-top-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Start Time</label>
              <input type="datetime-local" value={data.fakeTime} onChange={e => setData({...data, fakeTime: e.target.value})} className="w-full border border-gray-200 rounded-lg focus:border-[#89ad43] outline-none px-3 py-2 text-[14px] font-medium text-gray-900 transition-colors bg-white shadow-sm" />
            </div>
          )}

          <div className="pt-4">
            <button onClick={submit} className="w-full bg-[#1e293b] hover:bg-black text-white font-semibold py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-md">
              <span className="text-[15px]">Show Ticket</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TicketScreen({ data, onClose }: any) {
  const [now, setNow] = useState(() => new Date(Date.now() + data.timeOffset));

  useEffect(() => {
    // update exactly to the second
    const timer = setInterval(() => {
      setNow(new Date(Date.now() + data.timeOffset));
    }, 1000);
    return () => clearInterval(timer);
  }, [data.timeOffset]);

  const formattedTime = formatTime(now);
  const formattedLiveDate = formatDateDisplay(now);
  
  // Calculate expiration as precisely one day AFTER the current ticking date
  const expirationDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const formattedExp = `${formatDateDisplay(expirationDate)}, 11:00 PM`;

  return (
    <div className="w-full h-[100dvh] bg-gray-100 sm:py-8 overflow-hidden select-none font-sans">
      {/* Container simulating phone screen perfectly - Now solid white like the authentic app */}
      <div className="w-full sm:max-w-[420px] mx-auto h-[100dvh] sm:h-[850px] sm:max-h-[min(90vh,900px)] bg-white relative overflow-hidden flex flex-col sm:rounded-[3rem] sm:border-8 sm:border-gray-900 sm:shadow-2xl">
        
        {/* Top Header Section - Left aligned agency logo text */}
        <div className="relative px-6 pt-10 shrink-0 flex items-start flex-col text-left w-full">
          <button onClick={onClose} className="absolute right-5 top-8 p-2 text-gray-300 hover:text-gray-600 transition-colors active:scale-95 rounded-full z-20">
            <X size={26} strokeWidth={2} />
          </button>
          <h1 className="text-[32px] font-black text-[#111] tracking-tighter leading-none mb-1.5 uppercase drop-shadow-sm">
            {data.agencyName}
          </h1>
          <p className="text-gray-500 text-[12px] font-bold tracking-widest uppercase">
            {data.subtitle}
          </p>
        </div>

        {/* Center Animated Logo Section */}
        <div className="flex-1 flex justify-center items-center min-h-[220px]">
          <div className="relative w-[160px] h-[160px] flex justify-center items-center">
            
            {/* Subtle Tracking Rings */}
            <div className="absolute w-[200px] h-[200px] rounded-full border-[1.5px] border-dashed border-[#89ad43] opacity-20 pointer-events-none z-0"></div>
            <div className="absolute w-[240px] h-[240px] rounded-full border border-[#89ad43] opacity-10 pointer-events-none z-0"></div>

            {/* Outward pulsing rings */}
            <div className="absolute inset-[-2px] rounded-full border-[8px] border-[#89ad43] animate-pulse-ring-1 origin-center pointer-events-none"></div>
            <div className="absolute inset-[-2px] rounded-full border-[8px] border-[#89ad43] animate-pulse-ring-2 origin-center pointer-events-none"></div>

            {/* Expanding/Retracting Solid Green Base Layer */}
            <div className="absolute inset-[0px] rounded-full bg-[#89ad43] animate-expand-retract origin-center"></div>
            
            {/* Fixed White Inner Circle */}
            <div className="absolute inset-[24px] rounded-full bg-white shadow-sm pointer-events-none z-0"></div>
            
            {/* Exact EMBARK E Logo SVG */}
            <div className="relative z-10 w-[112px] h-[112px] flex items-center justify-center pointer-events-none">
              <svg viewBox="10 10 80 80" className="w-[66%] h-[66%] ml-1 drop-shadow-sm">
                <path 
                  d="M 15 15 L 15 35 L 45 50 L 15 65 L 15 85 L 85 50 Z" 
                  fill="#0082c6" 
                />
                <polygon points="30,15 85,15 85,35 70,35" fill="#5c5e60" />
                <polygon points="70,65 85,65 85,85 30,85" fill="#5c5e60" />
              </svg>
            </div>
            
          </div>
        </div>

        {/* Bottom Information Card */}
        <div className="shrink-0 pb-[7vh] px-[20px] w-full mt-8">
          <div className="bg-white rounded-[24px] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.15)] pt-8 pb-4 px-6 w-full flex flex-col relative z-20">
            
            {/* Live Time (Big) */}
            <div className="text-[2.85rem] font-bold text-[#4a4b4e] tabular-nums leading-none mb-7 flex items-center justify-center w-full" style={{ transform: 'scaleX(1.08)' }}>
              {formattedTime}
            </div>
            
            {/* Ticket Info */}
            <div className="w-full text-left">
              <div className="text-[22px] font-semibold text-[#323336] leading-snug tracking-tight mb-[2px]">
                {data.passName}
              </div>
              <div className="text-[14px] font-medium text-gray-400">
                {data.location}
              </div>
            </div>
            
            <div className="text-[13px] font-bold text-[#444] text-left mt-6">
              Expires {formattedExp}
            </div>
            
            {/* Divider */}
            <div className="w-full h-[1.5px] bg-gray-200 mt-4 mb-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
