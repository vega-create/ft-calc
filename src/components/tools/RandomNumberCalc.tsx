import { useState } from 'react';

export default function RandomNumberCalc() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [allowDupes, setAllowDupes] = useState(true);
  const [results, setResults] = useState<number[]>([]);

  function generate() {
    const lo = parseInt(min);
    const hi = parseInt(max);
    const n = parseInt(count) || 1;
    if (isNaN(lo) || isNaN(hi) || lo > hi) return;

    if (allowDupes) {
      const nums = Array.from({ length: n }, () => Math.floor(Math.random() * (hi - lo + 1)) + lo);
      setResults(nums);
    } else {
      const range = hi - lo + 1;
      const size = Math.min(n, range);
      const set = new Set<number>();
      while (set.size < size) {
        set.add(Math.floor(Math.random() * range) + lo);
      }
      setResults(Array.from(set));
    }
  }

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum</label>
          <input type="number" value={min} onChange={e => setMin(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Maximum</label>
          <input type="number" value={max} onChange={e => setMax(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">How many?</label>
          <input type="number" value={count} onChange={e => setCount(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all"
            min="1" max="1000" />
        </div>
      </div>

      <label className="flex items-center gap-2 mb-6 text-sm text-gray-600 cursor-pointer">
        <input type="checkbox" checked={allowDupes} onChange={e => setAllowDupes(e.target.checked)}
          className="w-4 h-4 rounded text-blue-600" />
        Allow duplicate numbers
      </label>

      <div className="flex gap-3 mb-6">
        <button onClick={generate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">
          🎲 Generate
        </button>
        <button onClick={() => setResults([])} className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">Clear</button>
      </div>

      {results.length > 0 && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          {results.length === 1 ? (
            <div className="text-center">
              <div className="text-sm text-blue-600 font-medium mb-1">Your Random Number</div>
              <div className="text-6xl font-bold text-blue-700 font-mono">{results[0]}</div>
            </div>
          ) : (
            <div>
              <div className="text-sm text-blue-600 font-medium mb-3">{results.length} Random Numbers</div>
              <div className="flex flex-wrap gap-2">
                {results.map((n, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white rounded-lg font-mono text-blue-700 font-medium shadow-sm">{n}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
