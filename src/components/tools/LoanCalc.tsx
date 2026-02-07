import { useState } from 'react';

export default function LoanCalc() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [result, setResult] = useState<{ monthly: number; totalPaid: number; totalInterest: number } | null>(null);

  function calculate() {
    const P = parseFloat(amount);
    const annualRate = parseFloat(rate) / 100;
    const months = parseInt(term) * 12;
    if (isNaN(P) || isNaN(annualRate) || isNaN(months) || months <= 0) return;

    const r = annualRate / 12;
    if (r === 0) {
      const monthly = P / months;
      setResult({ monthly, totalPaid: P, totalInterest: 0 });
      return;
    }
    const monthly = P * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    const totalPaid = monthly * months;
    setResult({ monthly, totalPaid, totalInterest: totalPaid - P });
  }

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount ($)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all"
            placeholder="250000" min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all"
            placeholder="6.5" min="0" step="0.1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (years)</label>
          <input type="number" value={term} onChange={e => setTerm(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-mono focus:border-blue-500 outline-none transition-all"
            placeholder="30" min="1" />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">Calculate</button>
        <button onClick={() => { setAmount(''); setRate(''); setTerm(''); setResult(null); }}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">Clear</button>
      </div>

      {result && (
        <div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center mb-4">
            <div className="text-sm text-blue-600 font-medium mb-1">Monthly Payment</div>
            <div className="text-5xl font-bold text-blue-700 font-mono">${result.monthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-sm text-gray-500">Total Paid</div>
              <div className="text-xl font-bold text-gray-700 font-mono">${result.totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <div className="text-sm text-red-500">Total Interest</div>
              <div className="text-xl font-bold text-red-600 font-mono">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
