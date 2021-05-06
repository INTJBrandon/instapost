function fetchPosts() {
    fetch("http://127.0.0.1:3000/posts")
    .then(resp => resp.json())
    .then(posts => {
        console.log(posts)
    })
}

fetchPosts()