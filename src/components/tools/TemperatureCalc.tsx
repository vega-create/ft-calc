import { useState } from 'react';

export default function TemperatureCalc() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState('F');
  const [results, setResults] = useState<{ C: number; F: number; K: number } | null>(null);

  function calculate() {
    const v = parseFloat(value);
    if (isNaN(v)) return;
    let C: number, F: number, K: number;
    if (from === 'C') { C = v; F = v * 9/5 + 32; K = v + 273.15; }
    else if (from === 'F') { C = (v - 32) * 5/9; F = v; K = C + 273.15; }
    else { C = v - 273.15; F = C * 9/5 + 32; K = v; }
    setResults({ C, F, K });
  }

  return (
    <div>
      <div className="flex gap-3 items-end mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Temperature</label>
          <input type="number" value={value} onChange={e => setValue(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all" placeholder="72" />
        </div>
        <div className="w-32">
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <select value={from} onChange={e => setFrom(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 outline-none">
            <option value="F">°F</option><option value="C">°C</option><option value="K">K</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">Convert</button>
        <button onClick={() => { setValue(''); setResults(null); }} className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">Clear</button>
      </div>

      {results && (
        <div className="grid grid-cols-3 gap-4">
          <div className={`rounded-2xl p-5 text-center ${from === 'F' ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}>
            <div className="text-sm text-gray-500 mb-1">Fahrenheit</div>
            <div className="text-3xl font-bold text-gray-700 font-mono">{results.F.toFixed(1)}°F</div>
          </div>
          <div className={`rounded-2xl p-5 text-center ${from === 'C' ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}>
            <div className="text-sm text-gray-500 mb-1">Celsius</div>
            <div className="text-3xl font-bold text-gray-700 font-mono">{results.C.toFixed(1)}°C</div>
          </div>
          <div className={`rounded-2xl p-5 text-center ${from === 'K' ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}>
            <div className="text-sm text-gray-500 mb-1">Kelvin</div>
            <div className="text-3xl font-bold text-gray-700 font-mono">{results.K.toFixed(1)}K</div>
          </div>
        </div>
      )}
    </div>
  );
}
