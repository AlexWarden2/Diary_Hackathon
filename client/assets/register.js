<<<<<<< HEAD
document.getElementById("register").addEventListener("submit", async (e) => {
=======
document
  .getElementById('register-form')
  .addEventListener('submit', async (e) => {
>>>>>>> 71b4f9016e841314a0e7a7e9daedd16f286683e5
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: form.get('username'),
        password: form.get('password')
      })
    };

    const response = await fetch(
      'http://localhost:3000/users/register',
      options
    );
    const data = await response.json();

    if (response.status === 201) {
      window.location.assign('login.html');
    } else {
      alert(data.error);
    }
<<<<<<< HEAD
})

=======
  });
>>>>>>> 71b4f9016e841314a0e7a7e9daedd16f286683e5
