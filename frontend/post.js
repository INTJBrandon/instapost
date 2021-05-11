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
        const dbutton = document.createElement('button')
        dbutton.setAttribute("class", "deleteButton")
        dbutton.innerHTML = "Delete Post"
        dbutton.addEventListener('click', deletePost)
        li.append(button)
        li.append(dbutton)
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
    const li = document.createElement("li")
    li.id = post.id
    li.innerText = post.title + " "
    const button = document.createElement("button")
    button.setAttribute("class", "commentButton")
    button.innerHTML = "Add Comment"
    button.addEventListener('click', commentForm)
    const dbutton = document.createElement('button')
    dbutton.setAttribute("class", "deleteButton")
    dbutton.innerHTML = "Delete Post"
    dbutton.addEventListener('click', deletePost)
    li.append(button)
    li.append(dbutton)
    postsDiv.append(li)

}

function deletePost(e) {
    let post_id = e.target.parentNode.id
    post_id = post_id.toString()
    const parent = document.getElementById(post_id)

    const body = {
        id: post_id
    }

    const options = {
        method: 'DELETE',
        headers: {
            'content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(body)
    }
    fetch(`http://127.0.0.1:3000/posts/${post_id}`, options)
    .then(resp => {
        parent.remove()
    })
}


