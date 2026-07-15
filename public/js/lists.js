const getToken = localStorage.getItem('token');
const listsContainer = document.querySelector('.lists-container');

async function loadLists() {
      

            const {data} = await axios.get('/api/v1/lists', {
                  headers: {
                        Authorization: `Bearer ${getToken}`
                  }
            });

            console.log(data.lists);
            listsContainer.innerHTML += data.lists.map(list => `<div>
                  <p>Name: ${list.name}</p>
                  <p>Offense: ${list.offense}</p>
                  <p>Revenge Plan: ${list.revenge_plan}</p>
                  <button onclick="edit('${list._id}')">edit</button>
                  </div>`).join(' ');

}

loadLists();

function reset() {
      listsContainer.innerHTML = '';
} 