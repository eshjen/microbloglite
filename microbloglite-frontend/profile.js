"use strict"
document.addEventListener("DOMContentLoaded", function() {
    const username = 'buttercupx'; // Hardcoding the username here, or you can extract it from the URL
    const token = getLoginData().token; // Ensure you're retrieving the correct token

    // Check if the token is available
    if (!token) {
        console.error("Authentication token is missing");
        return;
    }

    // Fetch posts for that user from an API
    fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=100&offset=0&username=${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            // If the response is not OK, throw an error
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Debug: Check the structure of the posts
        const posts = data.posts || [];
        const feedContainer = document.getElementById('feed');

        if (posts.length === 0) {
            console.log("No posts found for this user.");
            return;
        }

        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('postCard');
            
            postCard.innerHTML = `
                <div class="card-body">
                    <h5>${post.username}</h5>
                    <p>${post.text}</p>   
                </div>
                <div class="cardFooter">
                    <div class="post-footer-buttons d-flex justify-content-between">
                        <button class="btn btn-outline-primary">Like</button>
                        <button class="btn btn-outline-secondary">Comment</button>
                        <button class="btn btn-outline-success">Share</button>
                    </div>
                </div>
            `;
            
            feedContainer.appendChild(postCard);
        });
    })
    .catch(error => {
        console.error('Error loading posts:', error);
    });
});
