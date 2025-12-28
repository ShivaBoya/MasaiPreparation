const employees = [
  { id: 1, name: 'John', dept: 'Engineering', salary: 80000 },
  { id: 2, name: 'Jane', dept: 'Engineering', salary: 95000 },
  { id: 3, name: 'Bob', dept: 'Marketing', salary: 65000 },
  { id: 4, name: 'Alice', dept: 'Engineering', salary: 88000 },
  { id: 5, name: 'Charlie', dept: 'Marketing', salary: 72000 },
  { id: 6, name: 'Diana', dept: 'HR', salary: 70000 }
];

function transformEmployees(data) {
  const result = {};

  data.forEach(({ name, dept, salary }) => {
    if (!result[dept]) {
      result[dept] = {
        employees: [],
        totalSalary: 0,
        totalCount: 0
      };
    }

    result[dept].employees.push(name);
    result[dept].totalSalary += salary;
    result[dept].totalCount += 1;
  });

  Object.keys(result).forEach((dept) => {
    result[dept].avgSalary = Number(
      (result[dept].totalSalary / result[dept].totalCount).toFixed(2)
    );
    delete result[dept].totalSalary;
  });

  return result;
}

console.log(transformEmployees(employees));
