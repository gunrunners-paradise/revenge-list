const formDOM = document.querySelector('.form');
const emailInputDOM = document.querySelector('.email-input');
const passwordInputDOM = document.querySelector('.password-input');
const formAlertDOM = document.querySelector('.error');

formDOM.addEventListener('submit', async (e) => {
      formAlertDOM.classList.remove('text-success');

      e.preventDefault();
      const email = emailInputDOM.value;
      const password = passwordInputDOM.value;

      try {
            const {data} = await axios.post('/api/v1/auth/login', {email,password});
            
            formAlertDOM.style.display = 'block';
            formAlertDOM.textContent = data.msg;
            console.log(data.msg);

            formAlertDOM.classList.add('text-success');
            emailInputDOM.value = '';
            passwordInputDOM.value = '';

            localStorage.setItem('token', data.token);
            localStorage.setItem('user_name', data.user);
            window.location.href = '/lists';
      } catch (error) {
            formAlertDOM.style.display = 'block';
            formAlertDOM.textContent = 'Login Failed!';
            localStorage.removeItem('token');
            localStorage.removeItem('user_name');
            console.log(error);
      }
});