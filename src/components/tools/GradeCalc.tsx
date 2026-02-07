import { useState } from 'react';

export default function GradeCalc() {
  const [current, setCurrent] = useState('');
  const [weight, setWeight] = useState('');
  const [desired, setDesired] = useState('');
  const [result, setResult] = useState<number | null>(null);

  function calculate() {
    const c = parseFloat(current) / 100;
    const w = parseFloat(weight) / 100;
    const d = parseFloat(desired) / 100;
    if (isNaN(c) || isNaN(w) || isNaN(d)) return;
    const needed = (d - c * (1 - w)) / w;
    setResult(Math.round(needed * 10000) / 100);
  }

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Grade (%)</label>
          <input type="number" value={current} onChange={e => setCurrent(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all" placeholder="85" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Final Exam Weight (%)</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all" placeholder="30" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Desired Grade (%)</label>
          <input type="number" value={desired} onChange={e => setDesired(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all" placeholder="90" />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">Calculate</button>
        <button onClick={() => { setCurrent(''); setWeight(''); setDesired(''); setResult(null); }}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">Clear</button>
      </div>

      {result !== null && (
        <div className={`rounded-2xl p-6 text-center border-2 ${result <= 100 ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
          <div className="text-sm font-medium mb-1" style={{ color: result <= 100 ? '#2563eb' : '#dc2626' }}>
            You need to score at least
          </div>
          <div className="text-5xl font-bold font-mono mb-2" style={{ color: result <= 100 ? '#1d4ed8' : '#dc2626' }}>
            {result > 100 ? '100%+' : `${result.toFixed(1)}%`}
          </div>
          {result > 100 && <p className="text-red-500 text-sm">This grade may not be achievable even with a perfect score.</p>}
        </div>
      )}
    </div>
  );
}
