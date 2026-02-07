import { useState } from 'react';

export default function UnitPriceCalc() {
  const [items, setItems] = useState([{ price: '', quantity: '', unit: 'oz' }, { price: '', quantity: '', unit: 'oz' }]);
  const [results, setResults] = useState<{ unitPrice: number; index: number }[] | null>(null);

  function addItem() {
    setItems([...items, { price: '', quantity: '', unit: 'oz' }]);
  }

  function updateItem(index: number, field: string, value: string) {
    const updated = [...items];
    (updated[index] as any)[field] = value;
    setItems(updated);
  }

  function calculate() {
    const res = items.map((item, index) => {
      const p = parseFloat(item.price);
      const q = parseFloat(item.quantity);
      return { unitPrice: (isNaN(p) || isNaN(q) || q <= 0) ? Infinity : p / q, index };
    }).sort((a, b) => a.unitPrice - b.unitPrice);
    setResults(res);
  }

  const bestIdx = results?.[0]?.index;

  return (
    <div>
      <div className="space-y-4 mb-6">
        {items.map((item, i) => (
          <div key={i} className={`flex gap-3 items-end p-4 rounded-xl border-2 transition-all ${bestIdx === i ? 'border-green-300 bg-green-50' : 'border-gray-100 bg-gray-50'}`}>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">Item {i + 1} Price ($)</label>
              <input type="number" value={item.price} onChange={e => updateItem(i, 'price', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg font-mono focus:border-blue-500 outline-none" placeholder="5.99" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">Quantity</label>
              <input type="number" value={item.quantity} onChange={e => updateItem(i, 'quantity', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg font-mono focus:border-blue-500 outline-none" placeholder="16" />
            </div>
            <div className="w-20">
              <label className="block text-xs font-medium text-gray-500 mb-1">Unit</label>
              <select value={item.unit} onChange={e => updateItem(i, 'unit', e.target.value)}
                className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none text-sm">
                <option value="oz">oz</option><option value="lb">lb</option><option value="g">g</option><option value="kg">kg</option>
                <option value="ml">ml</option><option value="L">L</option><option value="ct">count</option>
              </select>
            </div>
            {bestIdx === i && <span className="text-green-600 font-bold text-sm whitespace-nowrap">✅ Best</span>}
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">Compare</button>
        <button onClick={addItem} className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">+ Add Item</button>
      </div>

      {results && (
        <div className="space-y-2">
          {results.filter(r => r.unitPrice !== Infinity).map(r => (
            <div key={r.index} className={`flex justify-between items-center p-3 rounded-xl ${r.index === bestIdx ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
              <span className="font-medium">Item {r.index + 1}</span>
              <span className="font-mono font-bold">${r.unitPrice.toFixed(4)} / {items[r.index].unit}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
