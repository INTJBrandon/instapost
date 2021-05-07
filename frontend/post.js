function fetchPosts() {
    fetch("http://127.0.0.1:3000/posts")
    .then(resp => resp.json())
    .then(appendPosts)
}

function appendPosts(posts) {
    const postsDiv = document.querySelector('#posts')
    for (let post of posts) {
        const li = document.createElement("li")
        li.innerText = post.title
        postsDiv.append(li)
        appendComments(post.comments)
    }
}
