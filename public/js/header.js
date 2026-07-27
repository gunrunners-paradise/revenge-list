if (localStorage.getItem('user_name') !== null) {

      document.querySelector('.user-name').innerHTML = 
      `<p>Welcome ${localStorage.getItem('user_name')}!</p>`;
}
function logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user_name');
      window.location.href = '/';
}
const token1 = localStorage.getItem('token');
if (token1) {
      document.querySelector('.nav').innerHTML += `
      <nav>
            <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/create">Add New</a></li>
                  <li><a href="#" onClick="logout()">Logout</a></li>
            </ul>
      </nav>`
}