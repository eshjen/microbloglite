/* Posts Page JavaScript */

"use strict";

// function getPosts() {}

function postPost() {
  const postContent = document.querySelector("#postContent").value;
  console.log(getLoginData().token);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginData().token}`,
    },
    body: JSON.stringify({
      text: postContent,
    }),
  };
  fetch(apiBaseURL + "/api/posts", options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.reload();
    });
}

// function loadPosts() {
//   const loginData = getLoginData();
//   const options = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${loginData.token}`,
//     },
//   };
//   fetch(apiBaseURL + "/api/posts", options)
//     .then((response) => response.json())
//     .then((posts) => {
//       console.log(posts);
//       for (let post of posts) {
//         buildCard(post, loginData.username);
//       }
//     });
// }
// loadPosts();

async function getAllPost() {
  const loginData = getLoginData();
  try {
    let promise = fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
    });
    let response = await promise;
    let data = await response.json();
    console.log(data);
    buildCard(data);
  } catch (error) {
    console.error(error);
  }
}

getAllPost();

function buildCard(info) {
  const postContainer = document.querySelector(".feedContainer");

  const postCard = document.createElement("div");
  postCard.className = "postCard card";


  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  postCard.append(cardBody);

  const h5 = document.createElement("h5");
  h5.textContent = info.username;
  cardBody.appendChild(h5);

  const p = document.createElement("p");
  p.textContent = info.text;
  cardBody.appendChild(p);

  const likeButton = document.createElement("button");
  likeButton.innerText = "Like";
  likeButton.className = "likeButton";

  const commentButton = document.createElement("button");
  commentButton.innerText = "Comment";
  commentButton.className = "commentButton";

  const shareButton = document.createElement("button");
  shareButton.innerText = "Share";
  shareButton.className = "shareButton";

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "deleteButton";
  deleteButton.addEventListener("click", async () => {
    if (info._id) {
      const loginData = getLoginData();
      try {
        let promise = fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/${info._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
          },
        });

        let response = await promise;
        let data = await response.json();
        console.log(data);

        if (response.ok) {
          console.log("Great work");
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  cardBody.appendChild(likeButton);
  cardBody.appendChild(commentButton);
  cardBody.appendChild(shareButton);
  cardBody.appendChild(deleteButton);

  const footer = document.createElement("footer");
  footer.className = "card-footer";
  postCard.appendChild(footer);
  postContainer.appendChild(postCard);
}

// loadPosts();

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
// getPosts();
