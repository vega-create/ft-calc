import { useState } from 'react';

export default function SalaryCalc() {
  const [mode, setMode] = useState<'toHourly' | 'toAnnual'>('toHourly');
  const [value, setValue] = useState('');
  const [hours, setHours] = useState('40');
  const [weeks, setWeeks] = useState('52');
  const [result, setResult] = useState<{ hourly: number; daily: number; weekly: number; biweekly: number; monthly: number; annual: number } | null>(null);

  function calculate() {
    const v = parseFloat(value);
    const h = parseFloat(hours);
    const w = parseFloat(weeks);
    if (isNaN(v) || isNaN(h) || isNaN(w)) return;

    let annual: number;
    if (mode === 'toHourly') {
      annual = v;
    } else {
      annual = v * h * w;
    }
    setResult({
      hourly: annual / (h * w),
      daily: annual / (w * 5),
      weekly: annual / w,
      biweekly: annual / (w / 2),
      monthly: annual / 12,
      annual,
    });
  }

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button onClick={() => { setMode('toHourly'); setResult(null); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${mode === 'toHourly' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          Salary → Hourly
        </button>
        <button onClick={() => { setMode('toAnnual'); setResult(null); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${mode === 'toAnnual' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          Hourly → Salary
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{mode === 'toHourly' ? 'Annual Salary ($)' : 'Hourly Rate ($)'}</label>
          <input type="number" value={value} onChange={e => setValue(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all"
            placeholder={mode === 'toHourly' ? '55000' : '26'} min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hours / Week</label>
          <input type="number" value={hours} onChange={e => setHours(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all"
            min="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weeks / Year</label>
          <input type="number" value={weeks} onChange={e => setWeeks(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all"
            min="1" />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">Calculate</button>
        <button onClick={() => { setValue(''); setResult(null); }} className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">Clear</button>
      </div>

      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 text-center">
            <div className="text-sm text-blue-600 font-medium">Hourly</div>
            <div className="text-2xl font-bold text-blue-700 font-mono">${result.hourly.toFixed(2)}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 text-center">
            <div className="text-sm text-gray-500">Daily</div>
            <div className="text-2xl font-bold text-gray-700 font-mono">${result.daily.toFixed(2)}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 text-center">
            <div className="text-sm text-gray-500">Weekly</div>
            <div className="text-2xl font-bold text-gray-700 font-mono">${result.weekly.toFixed(0)}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 text-center">
            <div className="text-sm text-gray-500">Bi-weekly</div>
            <div className="text-2xl font-bold text-gray-700 font-mono">${result.biweekly.toFixed(0)}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 text-center">
            <div className="text-sm text-gray-500">Monthly</div>
            <div className="text-2xl font-bold text-gray-700 font-mono">${result.monthly.toFixed(0)}</div>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 text-center">
            <div className="text-sm text-green-600 font-medium">Annual</div>
            <div className="text-2xl font-bold text-green-700 font-mono">${result.annual.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          </div>
        </div>
      )}
    </div>
  );
}
