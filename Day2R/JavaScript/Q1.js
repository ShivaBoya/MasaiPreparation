const employees = [
  { id: 1, name: 'John', dept: 'Engineering', salary: 80000 },
  { id: 2, name: 'Jane', dept: 'Engineering', salary: 95000 },
  { id: 3, name: 'Bob', dept: 'Marketing', salary: 65000 },
  { id: 4, name: 'Alice', dept: 'Engineering', salary: 88000 },
  { id: 5, name: 'Charlie', dept: 'Marketing', salary: 72000 },
  { id: 6, name: 'Diana', dept: 'HR', salary: 70000 }
];

const result = {};

for (let i = 0; i < employees.length; i++) {
  const emp = employees[i];
  const dept = emp.dept;

  if (!result[dept]) {
    result[dept] = {
      employees: [],
      totalSalary: 0,
      totalCount: 0
    };
  }

  result[dept].employees.push(emp.name);
  result[dept].totalSalary += emp.salary;
  result[dept].totalCount++;
}

for (let dept in result) {
  result[dept].avgSalary = Number(
    (result[dept].totalSalary / result[dept].totalCount).toFixed(2)
  );
  delete result[dept].totalSalary;
}

console.log(result);
