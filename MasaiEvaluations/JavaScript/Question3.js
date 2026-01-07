function transformStudents(students) {
  return students
    .filter(s => s.score > 70)
    .map(s => {
      let grade;
      if (s.score >= 90) grade = "A";
      else if (s.score >= 80) grade = "B";
      else grade = "C";

      return {
        name: s.name,
        score: s.score,
        grade: grade
      };
    })
    .sort((a, b) => b.score - a.score);
}


const students = [
  { id: 1, name: 'Alice', score: 85, age: 20 },
  { id: 2, name: 'Bob', score: 92, age: 22 },
  { id: 3, name: 'Charlie', score: 68, age: 21 },
  { id: 4, name: 'David', score: 78, age: 23 },
  { id: 5, name: 'Eve', score: 95, age: 20 },
  { id: 6, name: 'Frank', score: 71, age: 22 }
];

const result = transformStudents(students);
console.log(result);
