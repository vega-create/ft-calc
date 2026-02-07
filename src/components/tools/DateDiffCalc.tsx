import { useState } from 'react';

export default function DateDiffCalc() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<{ days: number; weeks: number; months: number; years: number; hours: number } | null>(null);

  function calculate() {
    if (!start || !end) return;
    const d1 = new Date(start);
    const d2 = new Date(end);
    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    setResult({ days, weeks: Math.floor(days / 7), months: Math.round(days / 30.44), years: Math.round((days / 365.25) * 10) / 10, hours: days * 24 });
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
          <input type="date" value={start} onChange={e => setStart(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
          <input type="date" value={end} onChange={e => setEnd(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 outline-none transition-all" />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">Calculate</button>
        <button onClick={() => { setStart(''); setResult(null); }} className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">Clear</button>
      </div>

      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 text-center col-span-2 sm:col-span-3">
            <div className="text-sm text-blue-600 font-medium mb-1">Total Days</div>
            <div className="text-5xl font-bold text-blue-700 font-mono">{result.days.toLocaleString()}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center"><div className="text-sm text-gray-500">Weeks</div><div className="text-2xl font-bold text-gray-700 font-mono">{result.weeks.toLocaleString()}</div></div>
          <div className="bg-gray-50 rounded-xl p-4 text-center"><div className="text-sm text-gray-500">Months</div><div className="text-2xl font-bold text-gray-700 font-mono">{result.months}</div></div>
          <div className="bg-gray-50 rounded-xl p-4 text-center"><div className="text-sm text-gray-500">Years</div><div className="text-2xl font-bold text-gray-700 font-mono">{result.years}</div></div>
        </div>
      )}
    </div>
  );
}
