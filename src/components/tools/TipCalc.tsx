import { useState } from 'react';

export default function TipCalc() {
  const [bill, setBill] = useState('');
  const [tipPct, setTipPct] = useState('18');
  const [people, setPeople] = useState('1');
  const [result, setResult] = useState<{ tip: number; total: number; perPerson: number } | null>(null);

  function calculate() {
    const b = parseFloat(bill);
    const t = parseFloat(tipPct);
    const p = parseInt(people) || 1;
    if (isNaN(b) || isNaN(t)) return;

    const tip = b * (t / 100);
    const total = b + tip;
    const perPerson = total / p;
    setResult({ tip, total, perPerson });
  }

  const presets = [15, 18, 20, 25];

  return (
    <div>
      {/* Bill Amount */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Bill Amount ($)</label>
        <input type="number" value={bill} onChange={e => setBill(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          placeholder="0.00" min="0" step="0.01" />
      </div>

      {/* Tip Percentage */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tip Percentage</label>
        <div className="flex gap-2 mb-3">
          {presets.map(p => (
            <button key={p} onClick={() => setTipPct(p.toString())}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                tipPct === p.toString() ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {p}%
            </button>
          ))}
        </div>
        <input type="number" value={tipPct} onChange={e => setTipPct(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          placeholder="18" min="0" max="100" />
      </div>

      {/* Split */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Split Between</label>
        <div className="flex items-center gap-3">
          <button onClick={() => setPeople(Math.max(1, parseInt(people) - 1).toString())}
            className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-all">−</button>
          <input type="number" value={people} onChange={e => setPeople(e.target.value)}
            className="w-20 px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono text-center focus:border-blue-500 outline-none"
            min="1" />
          <button onClick={() => setPeople((parseInt(people || '1') + 1).toString())}
            className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-all">+</button>
          <span className="text-gray-500">people</span>
        </div>
      </div>

      {/* Calculate */}
      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">
          Calculate Tip
        </button>
        <button onClick={() => { setBill(''); setTipPct('18'); setPeople('1'); setResult(null); }}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">
          Clear
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 text-center">
            <div className="text-sm text-blue-600 font-medium mb-1">Tip Amount</div>
            <div className="text-3xl font-bold text-blue-700 font-mono">${result.tip.toFixed(2)}</div>
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 text-center">
            <div className="text-sm text-blue-600 font-medium mb-1">Total</div>
            <div className="text-3xl font-bold text-blue-700 font-mono">${result.total.toFixed(2)}</div>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 text-center">
            <div className="text-sm text-green-600 font-medium mb-1">Per Person</div>
            <div className="text-3xl font-bold text-green-700 font-mono">${result.perPerson.toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
