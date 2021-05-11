class Post {

    constructor(post) {
        this.img_url = post.img_url
        this.id = post.id
        this.description = post.description
        this.comments = post.comments
    }

    appendPost() {
        const postsDiv = document.querySelector('#posts')
        const li = document.createElement("li")
        const img = document.createElement("img")
        img.src = this.img_url
        img.width = "500"
        img.height = "600"
        li.id = this.id
        li.innerText = this.description + " "
        const button = document.createElement("button")
        button.setAttribute("class", "commentButton")
        button.innerHTML = "Add Comment"
        button.addEventListener('click', Comment.commentForm)
        const dbutton = document.createElement('button')
        dbutton.setAttribute("class", "deleteButton")
        dbutton.innerHTML = "Delete Post"
        dbutton.addEventListener('click', this.deletePost.bind(this))
        li.append(img)
        li.append(button)
        li.append(dbutton)
        postsDiv.append(li)
        Comment.appendComments(this.comments, li) 
        
    
    }

    static fetchPosts() {
        fetch("http://127.0.0.1:3000/posts")
        .then(resp => resp.json())
        .then(this.appendPosts)
    }

    static appendPosts(posts) {
        for (let post of posts) {
            let newPost = new Post(post)
            newPost.appendPost()
        }
    }
    static createPost() {
        event.preventDefault()
        const img = document.getElementById('form_img').value
        const desc = document.getElementById('form_desc').value
        const body = {
            post: {
                description: desc,
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
    
        event.target.reset()
        fetch('http://127.0.0.1:3000/posts', options)
        .then(resp => resp.json())
        .then(post => {
            let newPost = new Post(post)
            newPost.appendPost()
        })
    }

    deletePost() {
        let post_id = this.id
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

}












