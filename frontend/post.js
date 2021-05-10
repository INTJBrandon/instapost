const postsDiv = document.querySelector('#posts')
function fetchPosts() {
    fetch("http://127.0.0.1:3000/posts")
    .then(resp => resp.json())
    .then(appendPosts)
}

function appendPosts(posts) {
    for (let post of posts) {
        const li = document.createElement("li")
        li.innerText = post.title + " "
        li.id = post.id
        const button = document.createElement("button")
        button.setAttribute("class", "commentButton")
        button.innerHTML = "Add Comment"
        button.addEventListener('click', commentForm)
        li.append(button)
        postsDiv.append(li)
        appendComments(post.comments, li)
        
    }
}

function createPost(e) {
    e.preventDefault()
    const img = e.target.children[1].value
    const title = e.target.children[3].value
    const description = e.target.children[5].value
    const body = {
        post: {
            title: title,
            description: description,
            img_url: img
        }
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(body)
    }

    e.target.reset()
    fetch('http://127.0.0.1:3000/posts', options)
    .then(resp => resp.json())
    .then(post => appendPost(post))
}


function appendPost(post) {
    console.log(post)
    const li = document.createElement("li")
    li.innerText = post.title + " " + post.id
    postsDiv.append(li)
}

function deletePost() {
    
}
