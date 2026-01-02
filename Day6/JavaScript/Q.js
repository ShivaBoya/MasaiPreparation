async function fetchActiveUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    const result = users
      .filter(user => user.username.length > 6)
      .map(user => ({
        id: user.id,
        fullName: user.name,
        email: user.email
      }));

    console.log(result);
    return result;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

fetchActiveUsers();
