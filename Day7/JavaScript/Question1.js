async function fetchAndTransformUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    const activeUsers = users
      .filter((user) => user.username.length > 6)
      .map((user) => ({
        id: user.id,
        fullName: user.name,
        email: user.email,
      }));

    console.log(activeUsers);
  } catch (error) {
    console.error(error);
  }
}

fetchAndTransformUsers();
