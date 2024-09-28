// Load posts on the home page
window.onload = function () {
    if (window.location.pathname.endsWith('index.html')) {
        loadPosts();
    }
};

async function loadPosts() {
    const postsDiv = document.getElementById('posts');
    const response = await fetch('/api/posts');
    const posts = await response.json();

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <h3>${post.category}</h3>
            <p>${post.message}</p>
            <a href="comments.html?postId=${post._id}">View Comments</a>
        `;
        postsDiv.appendChild(postDiv);
    });
}

// Handle new post form submission
const postForm = document.getElementById('postForm');
if (postForm) {
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = document.getElementById('message').value;
        const category = document.getElementById('category').value;

        const response = await fetch('/api/posts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message, category })
        });

        if (response.ok) {
            window.location.href = 'index.html';
        } else {
            alert('Failed to create post');
        }
    });
}

// Load comments for a specific post
if (window.location.pathname.endsWith('comments.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');
    loadPostDetails(postId);
    loadComments(postId);
}

async function loadPostDetails(postId) {
    const postDetailsDiv = document.getElementById('postDetails');
    const response = await fetch(`/api/posts/${postId}`);
    const post = await response.json();
    postDetailsDiv.innerHTML = `
        <h3>${post.category}</h3>
        <p>${post.message}</p>
    `;
}

async function loadComments(postId) {
    const commentsDiv = document.getElementById('comments');
    const response = await fetch(`/api/comments/${postId}`);
    const comments = await response.json();

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<p>${comment.message}</p>`;
        commentsDiv.appendChild(commentDiv);
    });
}

// Handle comment form submission
const commentForm = document.getElementById('commentForm');
if (commentForm) {
    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = document.getElementById('commentMessage').value;
        const postId = new URLSearchParams(window.location.search).get('postId');

        const response = await fetch('/api/comments/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId, message })
        });

        if (response.ok) {
            // Clear the input and reload comments
            document.getElementById('commentMessage').value = '';
            loadComments(postId);
        } else {
            alert('Failed to add comment');
        }
    });
}
