import { useState } from 'react';

export default function BMICalc() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [weight, setWeight] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  function calculate() {
    let bmi = 0;
    if (unit === 'imperial') {
      const w = parseFloat(weight);
      const h = (parseInt(heightFt) || 0) * 12 + (parseInt(heightIn) || 0);
      if (isNaN(w) || h <= 0) return;
      bmi = (w / (h * h)) * 703;
    } else {
      const w = parseFloat(weight);
      const h = parseFloat(heightCm);
      if (isNaN(w) || isNaN(h) || h <= 0) return;
      bmi = w / ((h / 100) * (h / 100));
    }

    let category = '';
    let color = '';
    if (bmi < 18.5) { category = 'Underweight'; color = 'text-yellow-600'; }
    else if (bmi < 25) { category = 'Normal weight'; color = 'text-green-600'; }
    else if (bmi < 30) { category = 'Overweight'; color = 'text-orange-600'; }
    else { category = 'Obese'; color = 'text-red-600'; }

    setResult({ bmi, category, color });
  }

  return (
    <div>
      {/* Unit toggle */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => { setUnit('imperial'); setResult(null); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${unit === 'imperial' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          Imperial (lbs, ft)
        </button>
        <button onClick={() => { setUnit('metric'); setResult(null); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${unit === 'metric' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          Metric (kg, cm)
        </button>
      </div>

      {/* Weight */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Weight ({unit === 'imperial' ? 'lbs' : 'kg'})</label>
        <input type="number" value={weight} onChange={e => setWeight(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          placeholder={unit === 'imperial' ? '150' : '68'} min="0" />
      </div>

      {/* Height */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
        {unit === 'imperial' ? (
          <div className="flex gap-3">
            <div className="flex-1">
              <input type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all"
                placeholder="5" min="0" />
              <span className="text-xs text-gray-400 mt-1 block">feet</span>
            </div>
            <div className="flex-1">
              <input type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all"
                placeholder="10" min="0" max="11" />
              <span className="text-xs text-gray-400 mt-1 block">inches</span>
            </div>
          </div>
        ) : (
          <input type="number" value={heightCm} onChange={e => setHeightCm(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder="170" min="0" />
        )}
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">
          Calculate BMI
        </button>
        <button onClick={() => { setWeight(''); setHeightFt(''); setHeightIn(''); setHeightCm(''); setResult(null); }}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">
          Clear
        </button>
      </div>

      {result && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
          <div className="text-sm text-blue-600 font-medium mb-1">Your BMI</div>
          <div className="text-5xl font-bold text-blue-700 font-mono mb-2">{result.bmi.toFixed(1)}</div>
          <div className={`text-lg font-semibold ${result.color}`}>{result.category}</div>
          <div className="mt-4 grid grid-cols-4 gap-1 text-xs">
            <div className={`py-1.5 rounded-l-lg ${result.bmi < 18.5 ? 'bg-yellow-400 text-white font-bold' : 'bg-yellow-100 text-yellow-700'}`}>{'<18.5'}<br/>Under</div>
            <div className={`py-1.5 ${result.bmi >= 18.5 && result.bmi < 25 ? 'bg-green-400 text-white font-bold' : 'bg-green-100 text-green-700'}`}>18.5-24.9<br/>Normal</div>
            <div className={`py-1.5 ${result.bmi >= 25 && result.bmi < 30 ? 'bg-orange-400 text-white font-bold' : 'bg-orange-100 text-orange-700'}`}>25-29.9<br/>Over</div>
            <div className={`py-1.5 rounded-r-lg ${result.bmi >= 30 ? 'bg-red-400 text-white font-bold' : 'bg-red-100 text-red-700'}`}>30+<br/>Obese</div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-4 text-center">BMI is a screening tool and does not diagnose body fatness or health. Consult a healthcare provider for personalized advice.</p>
    </div>
  );
}
