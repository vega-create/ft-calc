import { useState } from 'react';

export default function DiscountCalc() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [result, setResult] = useState<{ saved: number; final: number } | null>(null);

  function calculate() {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (isNaN(p) || isNaN(d)) return;
    const saved = p * (d / 100);
    setResult({ saved, final: p - saved });
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Original Price ($)</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all"
            placeholder="99.99" min="0" step="0.01" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
          <input type="number" value={discount} onChange={e => setDiscount(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all"
            placeholder="20" min="0" max="100" />
          <div className="flex gap-2 mt-2">
            {[10, 15, 20, 25, 30, 50].map(d => (
              <button key={d} onClick={() => setDiscount(d.toString())}
                className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${discount === d.toString() ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {d}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">Calculate</button>
        <button onClick={() => { setPrice(''); setDiscount(''); setResult(null); }} className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">Clear</button>
      </div>

      {result && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
            <div className="text-sm text-green-600 font-medium mb-1">You Save</div>
            <div className="text-4xl font-bold text-green-700 font-mono">${result.saved.toFixed(2)}</div>
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
            <div className="text-sm text-blue-600 font-medium mb-1">Final Price</div>
            <div className="text-4xl font-bold text-blue-700 font-mono">${result.final.toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
