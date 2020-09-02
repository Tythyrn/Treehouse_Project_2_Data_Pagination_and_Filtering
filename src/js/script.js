/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
const studentList = document.getElementsByClassName('student-list')[0];
const linkList = document.getElementsByClassName('link-list')[0];

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage (list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   studentList.innerHTML = '';

   for (let i = 0; i < list.length; i++) {
      if(i >= startIndex && i < endIndex) {
         studentList.insertAdjacentHTML('beforeend', `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src=${list[i]['picture']['large']} alt="Profile Picture">
                  <h3>${list[i]['name']['first']} ${list[i]['name']['last']}</h3>
                  <span class="email">${list[i]['email']}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i]['registered']['date']}</span>
               </div>
            </li>
         `);
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){
   const numOfPages = Math.ceil(list.length / 9);
   linkList.innerHTML = '';

   for(let i = 1; i <= numOfPages; i++) {
      if(i === 1){
         linkList.insertAdjacentHTML('beforeend', `
            <li>
               <button type="button" class="active">${i}</button>
            </li>
         `);
      } else {
         linkList.insertAdjacentHTML('beforeend', `
         <li>
            <button type="button">${i}</button>
         </li>
      `);
      }
   }
}

linkList.addEventListener ('click', (e) => {
   const button = e.target;
   const list = data;
   const buttonList = linkList.querySelectorAll('button');

   if(e.target.tagName === 'BUTTON'){
      for(i = 0; i < buttonList.length; i++) {
         buttonList[i].className = '';
      }

      e.target.className = 'active';

      showPage(list, button.textContent);
   }
});

// Call functions
showPage(data, 1);
addPagination(data);