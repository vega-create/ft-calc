import { useState } from 'react';

export default function AverageCalc() {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState<{ mean: number; median: number; mode: string; sum: number; count: number; min: number; max: number } | null>(null);

  function calculate() {
    const nums = numbers.split(/[,\s\n]+/).map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (nums.length === 0) return;

    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    const sorted = [...nums].sort((a, b) => a - b);
    const median = sorted.length % 2 === 0 ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2 : sorted[Math.floor(sorted.length / 2)];

    const freq: Record<number, number> = {};
    nums.forEach(n => { freq[n] = (freq[n] || 0) + 1; });
    const maxFreq = Math.max(...Object.values(freq));
    const modes = Object.entries(freq).filter(([_, v]) => v === maxFreq && v > 1).map(([k]) => k);

    setResult({ mean, median, mode: modes.length > 0 ? modes.join(', ') : 'No mode', sum, count: nums.length, min: sorted[0], max: sorted[sorted.length - 1] });
  }

  return (
    <div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Enter numbers (separated by commas, spaces, or new lines)</label>
        <textarea value={numbers} onChange={e => setNumbers(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all h-28 resize-none"
          placeholder="10, 20, 30, 40, 50" />
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">Calculate</button>
        <button onClick={() => { setNumbers(''); setResult(null); }} className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">Clear</button>
      </div>

      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 text-center col-span-2 sm:col-span-3">
            <div className="text-sm text-blue-600 font-medium mb-1">Mean (Average)</div>
            <div className="text-4xl font-bold text-blue-700 font-mono">{result.mean % 1 === 0 ? result.mean : result.mean.toFixed(4)}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center"><div className="text-sm text-gray-500">Median</div><div className="text-xl font-bold text-gray-700 font-mono">{result.median}</div></div>
          <div className="bg-gray-50 rounded-xl p-4 text-center"><div className="text-sm text-gray-500">Mode</div><div className="text-xl font-bold text-gray-700 font-mono">{result.mode}</div></div>
          <div className="bg-gray-50 rounded-xl p-4 text-center"><div className="text-sm text-gray-500">Sum</div><div className="text-xl font-bold text-gray-700 font-mono">{result.sum}</div></div>
          <div className="bg-gray-50 rounded-xl p-4 text-center"><div className="text-sm text-gray-500">Count</div><div className="text-xl font-bold text-gray-700 font-mono">{result.count}</div></div>
          <div className="bg-gray-50 rounded-xl p-4 text-center"><div className="text-sm text-gray-500">Min</div><div className="text-xl font-bold text-gray-700 font-mono">{result.min}</div></div>
          <div className="bg-gray-50 rounded-xl p-4 text-center"><div className="text-sm text-gray-500">Max</div><div className="text-xl font-bold text-gray-700 font-mono">{result.max}</div></div>
        </div>
      )}
    </div>
  );
}
