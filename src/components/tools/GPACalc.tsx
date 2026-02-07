import { useState } from 'react';

const gradePoints: Record<string, number> = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'D-': 0.7, 'F': 0.0 };

export default function GPACalc() {
  const [courses, setCourses] = useState([{ name: '', grade: 'A', credits: '3' }, { name: '', grade: 'A', credits: '3' }, { name: '', grade: 'A', credits: '3' }]);
  const [gpa, setGpa] = useState<number | null>(null);

  function addCourse() { setCourses([...courses, { name: '', grade: 'A', credits: '3' }]); }
  function removeCourse(i: number) { if (courses.length > 1) setCourses(courses.filter((_, idx) => idx !== i)); }
  function updateCourse(i: number, field: string, value: string) { const u = [...courses]; (u[i] as any)[field] = value; setCourses(u); }

  function calculate() {
    let totalPoints = 0, totalCredits = 0;
    courses.forEach(c => {
      const cr = parseFloat(c.credits);
      if (!isNaN(cr) && c.grade in gradePoints) {
        totalPoints += gradePoints[c.grade] * cr;
        totalCredits += cr;
      }
    });
    setGpa(totalCredits > 0 ? totalPoints / totalCredits : 0);
  }

  return (
    <div>
      <div className="space-y-3 mb-6">
        {courses.map((c, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input type="text" value={c.name} onChange={e => updateCourse(i, 'name', e.target.value)}
              className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 outline-none" placeholder={`Course ${i + 1}`} />
            <select value={c.grade} onChange={e => updateCourse(i, 'grade', e.target.value)}
              className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 outline-none font-mono">
              {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <input type="number" value={c.credits} onChange={e => updateCourse(i, 'credits', e.target.value)}
              className="w-20 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono focus:border-blue-500 outline-none" placeholder="3" min="0" />
            <button onClick={() => removeCourse(i)} className="text-gray-400 hover:text-red-500 transition-colors text-lg">×</button>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">Calculate GPA</button>
        <button onClick={addCourse} className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">+ Add Course</button>
      </div>

      {gpa !== null && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
          <div className="text-sm text-blue-600 font-medium mb-1">Your GPA</div>
          <div className="text-6xl font-bold text-blue-700 font-mono">{gpa.toFixed(2)}</div>
          <div className="text-gray-500 mt-2">on a 4.0 scale</div>
        </div>
      )}
    </div>
  );
}
