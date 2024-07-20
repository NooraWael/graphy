const handleLogin = async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  console.log('Attempting to login with:', username); // Log username

  const credentials = btoa(`${username}:${password}`);

  localStorage.setItem("username",username)
  localStorage.setItem("password", password)
  try {
    const response = await fetch('https://learn.reboot01.com/api/auth/signin', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      }
    });

    const token = await response.json(); // Assume the response is directly the token
    console.log('Response data:', token); // Log the received token

    if (response.ok) {
      sessionStorage.setItem('token', token);
      console.log('Token stored:', sessionStorage.getItem('token')); // Verify token is stored correctly
      window.location.href = 'profile.html';
    } else {
      console.log('Login failed, invalid credentials'); // Log failed login attempt
      document.getElementById('error-message').textContent = 'Invalid credentials';
    }
  } catch (error) {
    console.error('Error during login:', error);
    document.getElementById('error-message').textContent = 'Error during login: ' + error.message;
  }
};

document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('Form submitted'); // Log form submission
  handleLogin();
});
