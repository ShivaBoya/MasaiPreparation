const users = [
  {
    id: 1,
    name: 'Alice',
    courses: [
      { title: 'React', rating: 4.5, completed: true },
      { title: 'Node', rating: 3.8, completed: true },
      { title: 'CSS', rating: 4.2, completed: true }
    ]
  },
  {
    id: 2,
    name: 'Bob',
    courses: [
      { title: 'React', rating: 4.7, completed: true },
      { title: 'Vue', rating: 4.3, completed: false }
    ]
  },
  {
    id: 3,
    name: 'Charlie',
    courses: [
      { title: 'Angular', rating: 4.6, completed: true },
      { title: 'React', rating: 4.8, completed: true },
      { title: 'Node', rating: 4.1, completed: true }
    ]
  }
];

const output = [];

for (let i = 0; i < users.length; i++) {
  let count = 0;

  for (let j = 0; j < users[i].courses.length; j++) {
    const c = users[i].courses[j];
    if (c.completed === true && c.rating > 4) {
      count++;
    }
  }

  if (count >= 2) {
    output.push({ id: users[i].id, name: users[i].name });
  }
}

console.log(output);
