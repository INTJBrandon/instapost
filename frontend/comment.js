function appendComments(comments, element) {
    const ul = document.createElement('ul')
    element.append(ul)
    for (let comment of comments) {
        const commentLi = document.createElement('li')
        commentLi.id = `comment ${comment.id}`
        commentLi.innerText = comment.content
        const button = document.createElement('button')
        button.innerHTML = 'Delete Comment'
        button.addEventListener('click', deleteComment)
        commentLi.innerText = comment.content + " "
        commentLi.append(button)
        ul.append(commentLi)
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
    const parent = document.getElementById(parentId).children[2]
    const form = document.querySelector('#commentForm')
    const br = document.querySelector('#formBr')
    const commentLi = document.createElement("li")
    commentLi.id = `comment ${comment.id}`
    const button = document.createElement('button')
    button.innerHTML = 'Delete Comment'
    button.addEventListener('click', deleteComment)
    commentLi.innerText = comment.content
    debugger
    parent.append(commentLi)
    commentLi.append(button)
    form.remove()
    br.remove()
    
}

function commentForm(e) {
    if (document.querySelector('#commentForm')) {
        console.log('Already created')
    } else {
        const parent = e.target.parentElement
        const form = document.createElement("form")
        form.id = "commentForm"
        const br = document.createElement("br")
        br.id = 'formBr'
        const x = document.createElement('span')
        x.id = "formSpan"
        x.innerText = ' X'
        const comment = document.createElement("input")
        comment.setAttribute("type", "text")
        comment.setAttribute("name", "comment")
        comment.setAttribute("placeholder", "Add Comment Here");

        const s = document.createElement('input')
        s.setAttribute("type", "submit")
        s.setAttribute("value", "Submit Comment")
        x.addEventListener('click', function(){
            br.remove()
            form.remove()
        })
        form.addEventListener('submit', createComment)


        form.append(comment)
        form.append(s)
        form.append(x)
        parent.append(form)
        
        
        parent.append(br)
    }  
}

function deleteComment(e) {
    const commentStr = e.target.parentNode.id.split(" ")[1]
    const commentId = parseInt(commentStr)
    
    const body = {
        id: commentId
    }

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(body)
    }
    fetch(`http://127.0.0.1:3000/comments/${commentId}`, options)
    .then(resp => {
        e.target.parentNode.remove()
    })
}