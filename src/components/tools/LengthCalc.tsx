import { useState } from 'react';

const units = [
  { id: 'mm', name: 'Millimeters', factor: 0.001 },
  { id: 'cm', name: 'Centimeters', factor: 0.01 },
  { id: 'm', name: 'Meters', factor: 1 },
  { id: 'km', name: 'Kilometers', factor: 1000 },
  { id: 'in', name: 'Inches', factor: 0.0254 },
  { id: 'ft', name: 'Feet', factor: 0.3048 },
  { id: 'yd', name: 'Yards', factor: 0.9144 },
  { id: 'mi', name: 'Miles', factor: 1609.34 },
];

export default function LengthCalc() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState('ft');
  const [results, setResults] = useState<Record<string, number> | null>(null);

  function calculate() {
    const v = parseFloat(value);
    if (isNaN(v)) return;
    const fromUnit = units.find(u => u.id === from)!;
    const meters = v * fromUnit.factor;
    const res: Record<string, number> = {};
    units.forEach(u => { res[u.id] = meters / u.factor; });
    setResults(res);
  }

  return (
    <div>
      <div className="flex gap-3 items-end mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
          <input type="number" value={value} onChange={e => setValue(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all" placeholder="100" />
        </div>
        <div className="w-40">
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <select value={from} onChange={e => setFrom(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 outline-none">
            {units.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">Convert</button>
        <button onClick={() => { setValue(''); setResults(null); }} className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">Clear</button>
      </div>

      {results && (
        <div className="grid grid-cols-2 gap-3">
          {units.map(u => (
            <div key={u.id} className={`rounded-xl p-4 ${u.id === from ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}>
              <div className="text-xs text-gray-500">{u.name}</div>
              <div className="text-lg font-bold text-gray-700 font-mono">{results[u.id] < 0.01 ? results[u.id].toExponential(2) : results[u.id].toLocaleString(undefined, { maximumFractionDigits: 4 })}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
