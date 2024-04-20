// script.js

$(document).ready(function() {
    const BASE_URL = 'https://jsonplaceholder.typicode.com';

    function getAllPosts() {
        $.get(`${BASE_URL}/posts`, function(data) {
            displayResults(data);
        }).fail(function(error) {
            console.error('Error fetching posts:', error.responseText);
        });
    }

    function createPost(postData) {
        $.post(`${BASE_URL}/posts`, postData, function(data) {
            displayResults(data);
        }).fail(function(error) {
            console.error('Error creating post:', error.responseText);
        });
    }

    function updatePost(postId, postData) {
        $.ajax({
            url: `${BASE_URL}/posts/${postId}`,
            type: 'PUT',
            data: postData,
            success: function(data) {
                displayResults(data);
            },
            error: function(error) {
                console.error(`Error updating post ${postId}:`, error.responseText);
            }
        });
    }

    function deletePost(postId) {
        $.ajax({
            url: `${BASE_URL}/posts/${postId}`,
            type: 'DELETE',
            success: function(data) {
                displayResults(data);
            },
            error: function(error) {
                console.error(`Error deleting post ${postId}:`, error.responseText);
            }
        });
    }

    function displayResults(data) {
        const resultContainer = $('#resultContainer');
        resultContainer.html(`<pre>${JSON.stringify(data, null, 2)}</pre>`);
    }

    $('#fetchPostsBtn').click(function() {
        getAllPosts();
    });

    $('#createPostBtn').click(function() {
        const newPostData = {
            userId: 1,
            title: 'New Post',
            body: 'This is a new post created via API.'
        };
        createPost(newPostData);
    });

    $('#updatePostBtn').click(function() {
        const postIdToUpdate = 1; 
        const updatedPostData = {
            title: 'Updated Post',
            body: 'This post has been updated via API.'
        };
        updatePost(postIdToUpdate, updatedPostData);
    });

    $('#deletePostBtn').click(function() {
        const postIdToDelete = 1; 
        deletePost(postIdToDelete);
    });
});
