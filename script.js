// script.js

const API_URL = 'https://jsonplaceholder.typicode.com/users';
const userTableBody = document.getElementById('userTableBody');
const userFormContainer = document.getElementById('userFormContainer');
const formTitle = document.getElementById('formTitle');
const userForm = document.getElementById('userForm');
const userIdInput = document.getElementById('userId');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const departmentInput = document.getElementById('department');

// Fetch and display users
async function fetchUsers() {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();
    userTableBody.innerHTML = '';
    users.forEach(user => addUserRow(user));
  } catch (error) {
    alert('Failed to fetch users. Please try again later.');
  }
}

// Add a row to the table
function addUserRow(user) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${user.id}</td>
    <td>${user.firstName || 'N/A'}</td>
    <td>${user.lastName || 'N/A'}</td>
    <td>${user.email || 'N/A'}</td>
    <td>${user.department || 'N/A'}</td>
    <td>
      <button class="btn" onclick="editUser(${user.id})">Edit</button>
      <button class="btn btn-cancel" onclick="deleteUser(${user.id})">Delete</button>
    </td>
  `;
  userTableBody.appendChild(row);
}

// Show the form
function showForm(user = null) {
  userFormContainer.classList.remove('hidden');
  if (user) {
    formTitle.textContent = 'Edit User';
    userIdInput.value = user.id;
    firstNameInput.value = user.firstName;
    lastNameInput.value = user.lastName;
    emailInput.value = user.email;
    departmentInput.value = user.department;
  } else {
    formTitle.textContent = 'Add User';
    userForm.reset();
    userIdInput.value = '';
  }
}

// Hide the form
function hideForm() {
  userFormContainer.classList.add('hidden');
  userForm.reset();
}

// Submit form
async function submitForm(event) {
  event.preventDefault();
  const id = userIdInput.value;
  const user = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    department: departmentInput.value,
  };

  try {
    if (id) {
      // Update user
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      alert('User updated successfully!');
    } else {
      // Add user
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const newUser = await response.json();
      addUserRow(newUser);
      alert('User added successfully!');
    }
    hideForm();
    fetchUsers();
  } catch (error) {
    alert('Failed to save user. Please try again.');
  }
}

// Delete user
async function deleteUser(id) {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      alert('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      alert('Failed to delete user. Please try again.');
    }
  }
}

// Edit user
async function editUser(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const user = await response.json();
    showForm(user);
  } catch (error) {
    alert('Failed to fetch user details. Please try again.');
  }
}

// Initialize
fetchUsers();
