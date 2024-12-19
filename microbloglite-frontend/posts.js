/* Posts Page JavaScript */

"use strict";

function getPosts() {}
    
function postPost() {

  const postContent = document.querySelector('#postContent').value
  console.log(getLoginData().token)
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      Authorization: `Bearer ${getLoginData().token}`
    },
    body: JSON.stringify({
      text: postContent
    })
  }
  fetch(apiBaseURL + '/api/posts', options)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    window.location.reload()
  })
}

function loadPosts() {
  const loginData = getLoginData();
  const options = {
    method: "GET",
    headers: {
      "Content-Type": 'application/json',
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  fetch(apiBaseURL + "/api/posts", options)
    .then((response) => response.json())
    .then((posts) => {
      console.log(posts);
      for (let post of posts) {
        buildCard(post, loginData.username);
      }
    });
}
loadPosts();

function buildCard(info, currentUser) {
  const postContainer = document.querySelector('.feedContainer')

  const postCard = document.createElement('div')
  postCard.className = 'postCard'
  postContainer.appendChild(postCard)

  const cardBody = document.createElement('div')
  cardBody.className = 'card-body'
  postCard.append(cardBody)

  const h5 = document.createElement('h5')
  h5.textContent = info.username
  cardBody.appendChild(h5)

  const p = document.createElement('p')
  p.textContent = info.text 
  cardBody.appendChild(p)


}

// const loginData = getLoginData();
//   try {
//     let promise = fetch(apiBaseURL + "/api/posts", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${loginData.token}`,
//       },
//     });
//     let response = await promise;
//     console.log(response)
//     let data = await response.json();
//     console.log(data);
//     createPostCards(data);
//   } catch (error) {
//     console.error;
//   }
// }
  getPosts()

  