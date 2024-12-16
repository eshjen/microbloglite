/* Posts Page JavaScript */

"use strict";

async function getPosts() {
    

const loginData = getLoginData();
  try {
    let promise = fetch(apiBaseURL + "/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
    });
    let response = await promise;
    console.log(response)
    let data = await response.json();
    console.log(data);
    createPostCards(data);
  } catch (error) {
    console.error;
  }
}
  getPosts()

  