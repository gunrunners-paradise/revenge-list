const formDOM = document.querySelector('.register-form');
const nameInputDOM = document.querySelector('.name-input');
const emailInputDOM = document.querySelector('.email-input');
const passwordInputDOM = document.querySelector('.password-input');
const formAlertDOM = document.querySelector('.form-alert');

formDOM.addEventListener('submit', async (e) => {
      formAlertDOM.classList.remove('text-success');

      e.preventDefault();
      const name = nameInputDOM.value;
      const email = emailInputDOM.value;
      const password = passwordInputDOM.value;

      try {
            const {data} = await axios.post('/api/v1/auth/register', {name,email,password});
            
            formAlertDOM.style.display = 'block';

            formAlertDOM.classList.add('text-success');
            nameInputDOM.value = '';
            emailInputDOM.value = '';
            passwordInputDOM.value = '';

            localStorage.setItem('token', data.token);
            window.location.href = '/lists';
      } catch (error) {
            formAlertDOM.style.display = 'block';
            formAlertDOM.textContent = 'Registration Failed!';
            console.log(error);
      }
});