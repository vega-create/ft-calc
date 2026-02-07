import { useState } from 'react';

const zones = [
  { id: 'Pacific/Honolulu', name: 'Hawaii (HST)', short: 'HST' },
  { id: 'America/Anchorage', name: 'Alaska (AKST)', short: 'AKST' },
  { id: 'America/Los_Angeles', name: 'Pacific (PST)', short: 'PST' },
  { id: 'America/Denver', name: 'Mountain (MST)', short: 'MST' },
  { id: 'America/Chicago', name: 'Central (CST)', short: 'CST' },
  { id: 'America/New_York', name: 'Eastern (EST)', short: 'EST' },
  { id: 'Europe/London', name: 'London (GMT)', short: 'GMT' },
  { id: 'Europe/Paris', name: 'Paris (CET)', short: 'CET' },
  { id: 'Europe/Moscow', name: 'Moscow (MSK)', short: 'MSK' },
  { id: 'Asia/Dubai', name: 'Dubai (GST)', short: 'GST' },
  { id: 'Asia/Kolkata', name: 'India (IST)', short: 'IST' },
  { id: 'Asia/Shanghai', name: 'China (CST)', short: 'CST-CN' },
  { id: 'Asia/Tokyo', name: 'Japan (JST)', short: 'JST' },
  { id: 'Australia/Sydney', name: 'Sydney (AEST)', short: 'AEST' },
];

export default function TimeZoneCalc() {
  const [fromZone, setFromZone] = useState('America/New_York');
  const [time, setTime] = useState('12:00');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [results, setResults] = useState<{ zone: string; name: string; time: string; date: string }[] | null>(null);

  function calculate() {
    if (!time || !date) return;
    const [h, m] = time.split(':').map(Number);
    const sourceDate = new Date(`${date}T${time}:00`);

    const res = zones.map(z => {
      const formatted = sourceDate.toLocaleString('en-US', {
        timeZone: z.id,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      const parts = formatted.split(', ');
      return { zone: z.id, name: z.name, time: parts.slice(-1)[0] || formatted, date: parts.slice(0, -1).join(', ') };
    });
    setResults(res);
  }

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Time Zone</label>
          <select value={fromZone} onChange={e => setFromZone(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 outline-none">
            {zones.map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
          <input type="time" value={time} onChange={e => setTime(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 outline-none" />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">Convert</button>
      </div>

      {results && (
        <div className="space-y-2">
          {results.map(r => (
            <div key={r.zone} className={`flex justify-between items-center p-3 rounded-xl ${r.zone === fromZone ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}>
              <span className="text-sm text-gray-600">{r.name}</span>
              <div className="text-right">
                <span className="font-mono font-bold text-gray-800">{r.time}</span>
                <span className="text-xs text-gray-400 ml-2">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
