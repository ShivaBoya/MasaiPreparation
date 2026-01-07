User Posts Viewer
Objective
Build a user posts viewer application in React that fetches data from an external API, demonstrates proper use of useEffect hook with cleanup functions, and implements dynamic filtering and sorting.

API Endpoint
Use the JSONPlaceholder API (free fake API for testing):

Users: https://jsonplaceholder.typicode.com/users
Posts: https://jsonplaceholder.typicode.com/posts?userId={userId}
Requirements
1. User Dropdown
Fetch the list of users from the API when the component loads
Display a dropdown/select element with all users
Show user names in the dropdown (e.g., "Leanne Graham", "Ervin Howell")
Include a default option like "Select a user..." at the beginning
Display a loading state while fetching users
2. Display User Posts
When a user is selected from the dropdown, fetch all posts by that user
Display each post showing:
Post title (bold or as heading)
Post body/content
Show a loading indicator while posts are being fetched
If no user is selected, show a message like "Please select a user to view posts"
Display the total number of posts for the selected user
3. Sort Toggle Button
Add a toggle button to sort posts by title
Button should display current sort order:
"Sort: A → Z" (when sorted ascending)
"Sort: Z → A" (when sorted descending)
Clicking the button should toggle between ascending and descending order
Default sort order should be ascending (A → Z)
Sorting should be case-insensitive
4. User Experience
Show appropriate loading states for both users and posts
Handle errors gracefully (e.g., if API calls fail)
Posts should be displayed in a clean, readable layout
The sort button should only be visible when posts are loaded
Technical Requirements
Must Use useEffect Hook
You must implement data fetching using the useEffect hook:

One effect for fetching users on component mount
Another effect for fetching posts when a user is selected
Consider proper dependency arrays for each effect
Must Implement Cleanup Function
Your useEffect must include cleanup functions where necessary:

Handle cleanup for fetch requests (consider AbortController)
Prevent state updates on unmounted components
Clean up any pending operations when dependencies change
Example pattern for fetch with cleanup:

useEffect(() => {
  const controller = new AbortController();
  
  fetch(url, { signal: controller.signal })
    .then(/* handle response */)
    .catch(/* handle error */);
  
  return () => {
    controller.abort(); // Cleanup - THIS IS REQUIRED
  };
}, [dependencies]);
State Management
You'll need to manage several pieces of state:

List of all users
Selected user ID
Posts for the selected user
Loading states (for users and posts)
Sort order (ascending/descending)
Error states (optional but recommended)
Example Data Structure
User Object:

{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz"
}
Post Object:

{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident",
  "body": "quia et suscipit\nsuscipit recusandae..."
}