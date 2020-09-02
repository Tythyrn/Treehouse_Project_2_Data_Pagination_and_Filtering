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
const header = document.getElementsByClassName('header')[0];

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage (list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   studentList.innerHTML = '';

   //creates a student list item for each student on the page
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
      //adds active to the first list item
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

   //This listener occurs on a click event and updates the clicked button with the active class name and displays the next 9 students on the page.
   linkList.addEventListener ('click', (e) => {
      if(e.target.tagName === 'BUTTON'){
         newPage(e.target, list);
      }
   });
}

/*
This function will create and insert/append the elements needed for the search bar
*/
function searchBar(){
   header.insertAdjacentHTML('beforeend', `
      <label for="search" class="student-search">
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `);
}

/*
This function will create and insert/append the elements needed for the no results element
*/
function noResults() {
   const page = document.getElementsByClassName('page')[0];
   const div = document.createElement('div');
   const h1 = document.createElement('h1');
   h1.className = 'no-results';
   h1.textContent = 'No results found';
   div.appendChild(h1);
   page.insertBefore(div, studentList);
   div.style.display = 'none';
}

/*
This function set the button parameter to active and remove all other button's classes.  It also then calls showPage.
*/
function newPage(button, list) {
   const buttonList = linkList.querySelectorAll('button');

   for(i = 0; i < buttonList.length; i++) {
      buttonList[i].className = '';
   }

   button.className = 'active';

   showPage(list, button.textContent);
}


/*
This function will will return the matched students based on a user's input into a search bar
*/
function searchResults(searchInput, list) {
   const noResults = studentList.previousElementSibling;
   let matchedStudents = [];

   for(let i = 0; i < list.length; i++) {   
     if( list[i]['name']['first'].toLowerCase().includes(searchInput.toLowerCase())) {
       matchedStudents.push(list[i]);
     } 
   }

   if (matchedStudents.length === 0) {
      noResults.style.display = '';
   } else {
      noResults.style.display = 'none';
   }

   return matchedStudents;
 }

header.addEventListener('click', (e) => {
   if(e.target.tagName === 'BUTTON') {
      const input = e.target.previousElementSibling.value;
      const studentSearchedList = searchResults(input, data);

      showPage(studentSearchedList, 1);
      addPagination(studentSearchedList);
   }
});

header.addEventListener('keyup', (e) => {
   if(e.target.tagName === 'INPUT') {
      const input = e.target.value;
      const studentSearchedList = searchResults(input, data);

      showPage(studentSearchedList, 1);
      addPagination(studentSearchedList);
   }
});

// Call functions
searchBar();
showPage(data, 1);
addPagination(data);
noResults();