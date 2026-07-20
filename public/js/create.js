const getToken = localStorage.getItem('token');
const listsContainer = document.querySelector('.lists-container');

function reset() {
      listsContainer.innerHTML = '';
} 

async function createList() {
      const due_date = document.querySelector('.ldate').value;
      const name = document.querySelector('.lname').value;
      const offense = document.querySelector('.loffense').value;
      const plan = document.querySelector('.lplan').value;
      const severity = document.querySelector('.lseverity').value;
      const status = document.querySelector('.lstatus').value;

      const {data} = await axios.post(`/api/v1/lists`, {
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
      window.location.href = '/lists';
      if (!data) {
            // 
            console.log('not created');
            
      }
      console.log(data);
      
      
}