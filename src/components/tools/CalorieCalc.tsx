import { useState } from 'react';

export default function CalorieCalc() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [activity, setActivity] = useState('1.55');
  const [result, setResult] = useState<{ bmr: number; maintain: number; lose: number; gain: number } | null>(null);

  function calculate() {
    const a = parseInt(age);
    let w = parseFloat(weight);
    let h = parseFloat(height);
    if (isNaN(a) || isNaN(w) || isNaN(h)) return;

    if (unit === 'imperial') { w = w * 0.453592; h = h * 2.54; }

    let bmr: number;
    if (gender === 'male') { bmr = 10 * w + 6.25 * h - 5 * a + 5; }
    else { bmr = 10 * w + 6.25 * h - 5 * a - 161; }

    const maintain = bmr * parseFloat(activity);
    setResult({ bmr: Math.round(bmr), maintain: Math.round(maintain), lose: Math.round(maintain - 500), gain: Math.round(maintain + 500) });
  }

  const activities = [
    { v: '1.2', l: 'Sedentary (little exercise)' },
    { v: '1.375', l: 'Light (1-3 days/week)' },
    { v: '1.55', l: 'Moderate (3-5 days/week)' },
    { v: '1.725', l: 'Active (6-7 days/week)' },
    { v: '1.9', l: 'Very active (intense daily)' },
  ];

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {(['male', 'female'] as const).map(g => (
          <button key={g} onClick={() => setGender(g)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${gender === g ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {g === 'male' ? '♂ Male' : '♀ Female'}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setUnit('imperial')} className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${unit === 'imperial' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>Imperial</button>
        <button onClick={() => setUnit('metric')} className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${unit === 'metric' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>Metric</button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all" placeholder="25" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight ({unit === 'imperial' ? 'lbs' : 'kg'})</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all" placeholder={unit === 'imperial' ? '150' : '68'} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Height ({unit === 'imperial' ? 'inches' : 'cm'})</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all" placeholder={unit === 'imperial' ? '70' : '178'} />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
        <select value={activity} onChange={e => setActivity(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 outline-none transition-all">
          {activities.map(a => <option key={a.v} value={a.v}>{a.l}</option>)}
        </select>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">Calculate</button>
        <button onClick={() => { setAge(''); setWeight(''); setHeight(''); setResult(null); }} className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">Clear</button>
      </div>

      {result && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 text-center col-span-2">
            <div className="text-sm text-blue-600 font-medium mb-1">Daily Calories to Maintain Weight</div>
            <div className="text-5xl font-bold text-blue-700 font-mono">{result.maintain.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">BMR: {result.bmr} cal/day</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-sm text-green-600 font-medium">To Lose Weight</div>
            <div className="text-2xl font-bold text-green-700 font-mono">{result.lose.toLocaleString()}</div>
            <div className="text-xs text-gray-400">-500 cal/day ≈ 1 lb/week</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
            <div className="text-sm text-orange-600 font-medium">To Gain Weight</div>
            <div className="text-2xl font-bold text-orange-700 font-mono">{result.gain.toLocaleString()}</div>
            <div className="text-xs text-gray-400">+500 cal/day ≈ 1 lb/week</div>
          </div>
        </div>
      )}
      <p className="text-xs text-gray-400 mt-4 text-center">Results are estimates using the Mifflin-St Jeor equation. Consult a healthcare provider for personalized advice.</p>
    </div>
  );
}
