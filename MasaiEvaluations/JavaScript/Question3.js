function transformStudents(students) {
  return students
    .filter((student) => student.score > 70)

    .map((student) => {
      let grade;
      if (student.score >= 90) grade = "A";
      else if (student.score >= 80) grade = "B";
      else grade = "C";

      return {
        name: student.name,
        score: student.score,
        grade: grade,
      };
    })

    .sort((a, b) => b.score - a.score);
}
