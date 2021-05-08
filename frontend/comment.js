function appendComments(comments, element) {
    const ul = document.createElement('ul')
    element.append(ul)
    for (let comment of comments) {
        const postLi = document.createElement('li')
        postLi.innerText = comment.content
        ul.append(postLi)
    }
}

function createComment(e) {
    e.preventDefault()
    const value = e.target.children[0].value
    const post_id = parseInt(e.target.parentNode.id)
    const body = {
        content: value,
        post_id: post_id
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
    fetch('http://127.0.0.1:3000/comments', options)
    .then(resp => resp.json())
    .then(comment => appendComment(comment, post_id))
}


function appendComment(comment, id){
    const parentId = id.toString()
    const parent = document.getElementById(parentId).children[1]
    const commentLi = document.createElement("li")
    commentLi.innerText = comment.content
    debugger
    parent.append(commentLi) 
}

function commentForm(e) {
    const parent = e.target.parentElement
    const form = document.createElement("form")
    form.id = "commentForm"

    const comment = document.createElement("input")
    comment.setAttribute("type", "text")
    comment.setAttribute("name", "comment")
    comment.setAttribute("placeholder", "Add Comment Here");

    const s = document.createElement('input')
    s.setAttribute("type", "submit")
    s.setAttribute("value", "Submit Comment")
    form.addEventListener('submit', createComment)

    form.append(comment)
    form.append(s)
    parent.append(form)
    const br = document.createElement("br")
    parent.append(br)
}