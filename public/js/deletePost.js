const deleteFormHandler = async (event) => {
    event.preventDefault();

    //grab post id to put into line 13
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];


    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post.');

    }
};


document.querySelector('.deletePost-btn').addEventListener('click', deleteFormHandler);

