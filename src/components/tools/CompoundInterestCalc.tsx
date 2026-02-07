import { useState } from 'react';

export default function CompoundInterestCalc() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [monthly, setMonthly] = useState('0');
  const [compound, setCompound] = useState('12');
  const [result, setResult] = useState<{ total: number; interest: number; contributed: number } | null>(null);

  function calculate() {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = parseInt(compound);
    const m = parseFloat(monthly) || 0;
    if (isNaN(P) || isNaN(r) || isNaN(t) || n <= 0) return;

    const compoundFactor = Math.pow(1 + r / n, n * t);
    let total = P * compoundFactor;

    if (m > 0) {
      total += m * ((compoundFactor - 1) / (r / n));
    }

    const contributed = P + m * t * 12;
    const interest = total - contributed;

    setResult({ total, interest, contributed });
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Initial Investment ($)</label>
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all"
            placeholder="10000" min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Annual Interest Rate (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all"
            placeholder="7" min="0" step="0.1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Period (years)</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all"
            placeholder="10" min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Contribution ($)</label>
          <input type="number" value={monthly} onChange={e => setMonthly(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all"
            placeholder="500" min="0" />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Compound Frequency</label>
        <div className="flex gap-2">
          {[{ v: '1', l: 'Annually' }, { v: '4', l: 'Quarterly' }, { v: '12', l: 'Monthly' }, { v: '365', l: 'Daily' }].map(opt => (
            <button key={opt.v} onClick={() => setCompound(opt.v)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${compound === opt.v ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {opt.l}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">
          Calculate
        </button>
        <button onClick={() => { setPrincipal(''); setRate(''); setYears(''); setMonthly('0'); setResult(null); }}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">
          Clear
        </button>
      </div>

      {result && (
        <div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center mb-4">
            <div className="text-sm text-blue-600 font-medium mb-1">Future Value</div>
            <div className="text-5xl font-bold text-blue-700 font-mono">${result.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <div className="text-sm text-green-600 font-medium">Interest Earned</div>
              <div className="text-2xl font-bold text-green-700 font-mono">${result.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-sm text-gray-600 font-medium">Total Contributed</div>
              <div className="text-2xl font-bold text-gray-700 font-mono">${result.contributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
          </div>
          {/* Visual bar */}
          <div className="mt-4 bg-gray-100 rounded-full h-4 overflow-hidden flex">
            <div className="bg-gray-400 h-full" style={{ width: `${(result.contributed / result.total) * 100}%` }} title="Contributed"></div>
            <div className="bg-green-500 h-full flex-1" title="Interest"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Contributed ({((result.contributed / result.total) * 100).toFixed(0)}%)</span>
            <span>Interest ({((result.interest / result.total) * 100).toFixed(0)}%)</span>
          </div>
        </div>
      )}
    </div>
  );
}
