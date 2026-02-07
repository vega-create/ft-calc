import { useState } from 'react';

export default function AgeCalc() {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<{ years: number; months: number; days: number; totalDays: number; nextBirthday: number } | null>(null);

  function calculate() {
    if (!birthDate || !targetDate) return;
    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    if (birth >= target) return;

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    // Next birthday
    let nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday <= target) nextBday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    const nextBirthday = Math.floor((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    setResult({ years, months, days, totalDays, nextBirthday });
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Calculate Age On</label>
          <input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">
          Calculate Age
        </button>
        <button onClick={() => { setBirthDate(''); setResult(null); }}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">
          Clear
        </button>
      </div>

      {result && (
        <div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center mb-4">
            <div className="text-sm text-blue-600 font-medium mb-2">Your Age</div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold text-blue-700 font-mono">{result.years}</span>
              <span className="text-gray-500">years</span>
              <span className="text-3xl font-bold text-blue-600 font-mono">{result.months}</span>
              <span className="text-gray-500">months</span>
              <span className="text-3xl font-bold text-blue-600 font-mono">{result.days}</span>
              <span className="text-gray-500">days</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-700 font-mono">{result.totalDays.toLocaleString()}</div>
              <div className="text-sm text-gray-500">total days lived</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-700 font-mono">{result.nextBirthday}</div>
              <div className="text-sm text-gray-500">days until next birthday 🎂</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
