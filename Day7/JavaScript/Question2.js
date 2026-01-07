async function fetchAndMergeUsersPosts() {
  try {
    const [usersRes, postsRes] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users"),
      fetch("https://jsonplaceholder.typicode.com/posts"),
    ]);

    const users = await usersRes.json();
    const posts = await postsRes.json();

    const result = users.map((user) => ({
      userId: user.id,
      name: user.name,
      postCount: posts.filter((post) => post.userId === user.id).length,
    }));

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

fetchAndMergeUsersPosts();
