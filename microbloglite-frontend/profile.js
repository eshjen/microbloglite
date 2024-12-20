
"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const username = 'buttercupx'; 
    const token = getLoginData().token;

    if (!token) {
        console.error("Authentication token is missing");
        return;
    }

    
    fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=100&offset=0&username=${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); 
        const posts = data;
        const feedContainer = document.getElementById('feed');

        if (!Array.isArray(posts) || posts.length === 0) {
            console.log("No posts found for this user.");
            return;
        }

        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('card', 'mb-3', 'mt-3');  

            
            const createdAt = new Date(post.createdAt).toLocaleString();

            
            postCard.innerHTML = `
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <img src="images/buttercup.avif" alt="User Profile Pic" class="rounded-circle" style="width: 40px; height: 40px; margin-right: 10px;">
                        <div>
                            <h5 class="card-title">@${post.username}</h5>
                            <p class="card-text">${post.text}</p>
                            <p class="card-text text-muted"><small>${createdAt}</small></p>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-muted">
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-outline-primary mx-2">Like</button>
                        <button class="btn btn-outline-secondary mx-2">Comment</button>
                        <button class="btn btn-outline-success mx-2">Share</button>
                        <button class="btn btn-outline-danger mx-2">Delete</button>
                    </div>
                </div>
            `;

            
            feedContainer.appendChild(postCard);

            
            const likeButton = postCard.querySelector('.btn-outline-primary');
            likeButton.addEventListener('click', () => {
                console.log(`Liked post by ${post.username}`);
                
            });
        
        });
    })
    .catch(error => {
        console.error('Error loading posts:', error);
    });
});
