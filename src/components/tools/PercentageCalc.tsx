import { useState } from 'react';

export default function PercentageCalc() {
  const [mode, setMode] = useState<'of' | 'change' | 'is'>('of');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB)) return;

    let res = 0;
    if (mode === 'of') {
      res = (numA / 100) * numB;
    } else if (mode === 'change') {
      res = ((numB - numA) / numA) * 100;
    } else {
      res = (numA / numB) * 100;
    }
    setResult(res % 1 === 0 ? res.toString() : res.toFixed(4));
  }

  const labels: Record<string, [string, string, string]> = {
    of: ['What is', '% of', '?'],
    change: ['From', 'to', '— what % change?'],
    is: ['', 'is what % of', '?'],
  };

  return (
    <div>
      {/* Mode tabs */}
      <div className="flex gap-2 mb-6">
        {(['of', 'change', 'is'] as const).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); setResult(null); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              mode === m
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {m === 'of' ? '% of Number' : m === 'change' ? '% Change' : 'What %?'}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="flex items-center gap-3 flex-wrap mb-6">
        <span className="text-gray-500 font-medium">{labels[mode][0]}</span>
        <input
          type="number"
          value={a}
          onChange={e => setA(e.target.value)}
          className="w-32 px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          placeholder="0"
        />
        <span className="text-gray-500 font-medium">{labels[mode][1]}</span>
        <input
          type="number"
          value={b}
          onChange={e => setB(e.target.value)}
          className="w-32 px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          placeholder="0"
        />
        <span className="text-gray-500 font-medium">{labels[mode][2]}</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm hover:shadow-md">
          Calculate
        </button>
        <button onClick={() => { setA(''); setB(''); setResult(null); }} className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 active:scale-[0.98] transition-all">
          Clear
        </button>
      </div>

      {/* Result */}
      {result !== null && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center animate-in">
          <div className="text-sm text-blue-600 font-medium mb-1">Result</div>
          <div className="text-4xl font-bold text-blue-700 font-mono">
            {mode === 'of' ? result : `${result}%`}
          </div>
          {mode === 'of' && <p className="text-gray-500 mt-2">{a}% of {b} = {result}</p>}
          {mode === 'change' && <p className="text-gray-500 mt-2">From {a} to {b} is a {parseFloat(result) >= 0 ? '+' : ''}{result}% change</p>}
          {mode === 'is' && <p className="text-gray-500 mt-2">{a} is {result}% of {b}</p>}
        </div>
      )}
    </div>
  );
}
