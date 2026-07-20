const getToken = localStorage.getItem('token');
const listsContainer = document.querySelector('.lists-container');

function reset() {
      listsContainer.innerHTML = '';
} 

async function submitEdit(id) {
      const due_date = document.querySelector('.ldate').value;
      const name = document.querySelector('.lname').value;
      const offense = document.querySelector('.loffense').value;
      const plan = document.querySelector('.lplan').value;
      const severity = document.querySelector('.lseverity').value;
      const status = document.querySelector('.lstatus').value;

      const {data} = await axios.patch(`/api/v1/lists/${id}`, {
            "name": name,
            "offense": offense,
            "revenge_plan": plan,
            "severity": severity,
            "status": status,
            "due_date": due_date
            },
            {
            headers: {
                  Authorization: `Bearer ${getToken}`
            }
            
      });
      loadLists();
      
      
}

async function submitDelete(id) {

      const {data} = await axios.delete(`/api/v1/lists/${id}`,
            {
            headers: {
                  Authorization: `Bearer ${getToken}`
            }
            
      });
      console.log(data);
      loadLists();
      if (!data.msg) {
            //
      }
      
      
      
}

async function loadEdit(id) {
      reset();
      const {data} = await axios.get(`/api/v1/lists/${id}`, {
            headers: {
                  Authorization: `Bearer ${getToken}`
            }
      });
      console.log(data.list);
      listsContainer.innerHTML = `
                  <button onclick="loadLists()">Back</button><br>
                  <form class="form form-edit">
                  <label for="due_date">Due Date:</label>
                  <input type="date" class="ldate" value="${data.list.due_date}"><br>
                  <label for="name">Name:</label>
                  <input type="text" class="lname" value="${data.list.name}"><br>
                  <label for="offense">Offense:</label>
                  <textarea class="loffense">${data.list.offense}</textarea><br>
                  <label for="revenge_plan">Revenge Plan:</label>
                  <textarea class="lplan">${data.list.revenge_plan}</textarea><br>
                  <label for="severity">Severity:</label>
                  <select name="severity" class="lseverity">
                        <option value="1" ${data.list.severity === 1 ? 'selected' : ''}>1</option>
                        <option value="2" ${data.list.severity === 2 ? 'selected' : ''}>2</option>
                        <option value="3" ${data.list.severity === 3 ? 'selected' : ''}>3</option>
                        <option value="4" ${data.list.severity === 4 ? 'selected' : ''}>4</option>
                        <option value="5" ${data.list.severity === 5 ? 'selected' : ''}>5</option>
                  </select><br>
                  <select name="status" class="lstatus">
                        <option value="Planning" ${data.list.status === 'Planning' ? 'selected' : ''}>Planning</option>
                        <option value="Approved" ${data.list.status === 'Approved' ? 'selected' : ''}>Approved</option>
                        <option value="Executed" ${data.list.status === 'Executed' ? 'selected' : ''}>Executed</option>
                        <option value="Abandoned" ${data.list.status === 'Abandoned' ? 'selected' : ''}>Abandoned</option>
                  </select>
                  </form>
                  <button class="submit" onclick="submitEdit('${data.list._id}')">edit</button>
                  <button class="delete" onclick="submitDelete('${data.list._id}')">delete</button>`;
}

async function loadLists() {
      
      reset();
            const {data} = await axios.get('/api/v1/lists', {
                  headers: {
                        Authorization: `Bearer ${getToken}`
                  }
            });

            console.log(data.lists);
            listsContainer.innerHTML += data.lists.map(list => `
                  <div class="list-card">
                  <p>Due Date: ${list.due_date}</p>
                  <p>Name: ${list.name}</p>
                  <p>Offense: ${list.offense}</p>
                  <p>Revenge Plan: ${list.revenge_plan}</p>
                  <p>Severity: ${list.severity}</p>
                  <p>status: ${list.status}</p>
                  <button onclick="loadEdit('${list._id}')">edit</button>
                  </div>`).join(' ');

}

loadLists();

