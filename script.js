document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form submission

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorElement = document.getElementById('error');
    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
        // Sending a POST request to the server
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            // If response is not OK, throw an error
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            // If login succeeds, redirect the user
            window.location.href = '/success.html';
        } else {
            // If login fails, hide inputs and show error message
            usernameInput.style.display = 'none';
            passwordInput.style.display = 'none';
            errorElement.innerText = result.message || 'Login failed!';
        }
    } catch (error) {
        // On error, hide inputs and show error message
        usernameInput.style.display = 'none';
        passwordInput.style.display = 'none';
        errorElement.innerText = 'An error occurred. Please try again later.';
        console.error('Error:', error);
    }
});
