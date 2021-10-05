const newCommentFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#comment_text').value.trim();
    //grab the post's ID from the URL
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    
    if (comment_text && post_id) {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ comment_text, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to add comment to post.');
        }
    }
};


document.querySelector('.newComment-form').addEventListener('submit', newCommentFormHandler);