/* Posts Page JavaScript */

"use strict";

// This function sends a POST request to create a new post
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

// This function loads all posts from the API
async function getAllPost() {
  const loginData = getLoginData();
  try {
    let response = await fetch(apiBaseURL + "/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
    });

    let data = await response.json();
    console.log(data); 
    
    
    if (Array.isArray(data)) {
      data.forEach(post => {
        buildCard(post); 
      });
    } else {
      console.error("API response is not an array of posts.");
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// Building the post cards
function buildCard(info) {
  const postContainer = document.querySelector(".feedContainer");

  
  if (!postContainer) {
    console.error("Feed container not found.");
    return;
  }

  const postCard = document.createElement("div");
  postCard.className = "postCard card";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  postCard.append(cardBody);

  const h5 = document.createElement("h5");
  h5.textContent = info.username;
  cardBody.appendChild(h5);

  const h6 = document.createElement("h6");
  h6.textContent = info.text;
  cardBody.appendChild(h6);

  const p =document.createElement("p")
  p.textContent = info.createdAt;
  cardBody.appendChild(p)

  const likeButton = document.createElement("button");
  likeButton.innerText = "Like";
  likeButton.className = "btn btn-outline-primary mx-2";

  const commentButton = document.createElement("button");
  commentButton.innerText = "Comment";
  commentButton.className = "btn btn-outline-secondary mx-2";

  const shareButton = document.createElement("button");
  shareButton.innerText = "Share";
  shareButton.className = "btn btn-outline-success mx-2";

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "btn btn-outline-danger mx-2";
  deleteButton.addEventListener("click", async () => {
    if (info._id) {
      const loginData = getLoginData();
      try {
        let response = await fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/${info._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
          },
        });

        let data = await response.json();
        console.log(data);

        if (response.ok) {
          console.log("Post deleted successfully");
          postCard.remove(); 
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

//function to load all posts when the page loads
getAllPost();
