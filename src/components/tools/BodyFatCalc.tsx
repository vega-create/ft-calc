import { useState } from 'react';

export default function BodyFatCalc() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [height, setHeight] = useState('');
  const [hip, setHip] = useState('');
  const [result, setResult] = useState<{ bf: number; category: string } | null>(null);

  function calculate() {
    let w = parseFloat(waist);
    let n = parseFloat(neck);
    let h = parseFloat(height);
    let hp = parseFloat(hip);
    if (isNaN(w) || isNaN(n) || isNaN(h)) return;
    if (gender === 'female' && isNaN(hp)) return;

    if (unit === 'metric') { w /= 2.54; n /= 2.54; h /= 2.54; hp /= 2.54; }

    let bf: number;
    if (gender === 'male') {
      bf = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
    } else {
      bf = 163.205 * Math.log10(w + hp - n) - 97.684 * Math.log10(h) - 78.387;
    }

    let category = '';
    if (gender === 'male') {
      if (bf < 6) category = 'Essential Fat';
      else if (bf < 14) category = 'Athletic';
      else if (bf < 18) category = 'Fit';
      else if (bf < 25) category = 'Average';
      else category = 'Above Average';
    } else {
      if (bf < 14) category = 'Essential Fat';
      else if (bf < 21) category = 'Athletic';
      else if (bf < 25) category = 'Fit';
      else if (bf < 32) category = 'Average';
      else category = 'Above Average';
    }

    setResult({ bf: Math.round(bf * 10) / 10, category });
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {(['male', 'female'] as const).map(g => (
          <button key={g} onClick={() => setGender(g)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${gender === g ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
            {g === 'male' ? '♂ Male' : '♀ Female'}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setUnit('imperial')} className={`flex-1 py-2 rounded-xl text-sm font-medium ${unit === 'imperial' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>Imperial (in)</button>
        <button onClick={() => setUnit('metric')} className={`flex-1 py-2 rounded-xl text-sm font-medium ${unit === 'metric' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>Metric (cm)</button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Waist ({unit === 'imperial' ? 'in' : 'cm'})</label>
          <input type="number" value={waist} onChange={e => setWaist(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none" placeholder={unit === 'imperial' ? '34' : '86'} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Neck ({unit === 'imperial' ? 'in' : 'cm'})</label>
          <input type="number" value={neck} onChange={e => setNeck(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none" placeholder={unit === 'imperial' ? '15' : '38'} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Height ({unit === 'imperial' ? 'in' : 'cm'})</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none" placeholder={unit === 'imperial' ? '70' : '178'} />
        </div>
        {gender === 'female' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hip ({unit === 'imperial' ? 'in' : 'cm'})</label>
            <input type="number" value={hip} onChange={e => setHip(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none" placeholder={unit === 'imperial' ? '38' : '97'} />
          </div>
        )}
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">Calculate</button>
        <button onClick={() => { setWaist(''); setNeck(''); setHeight(''); setHip(''); setResult(null); }} className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">Clear</button>
      </div>

      {result && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
          <div className="text-sm text-blue-600 font-medium mb-1">Estimated Body Fat</div>
          <div className="text-5xl font-bold text-blue-700 font-mono">{result.bf}%</div>
          <div className="text-gray-600 mt-2 font-medium">{result.category}</div>
        </div>
      )}
      <p className="text-xs text-gray-400 mt-4 text-center">Estimated using the US Navy method. This is an approximation and not a substitute for professional assessment.</p>
    </div>
  );
}
