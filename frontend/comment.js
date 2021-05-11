class Comment {
    constructor(comment) {
        this.content = comment.content
        this.id = comment.id
    }

    static commentForm() {
        if (document.querySelector('#commentForm')) {
            alert('Please submit or cancel current comment')
        } else {
            const parent = event.target.parentElement
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
            comment.id = 'commentId'
    
            const s = document.createElement('input')
            s.setAttribute("type", "submit")
            s.setAttribute("value", "Submit Comment")
            x.addEventListener('click', function(){
                br.remove()
                form.remove()
            })
            form.addEventListener('submit', Comment.createComment)
    
    
            form.append(comment)
            form.append(s)
            form.append(x)
            parent.append(form)
            
            
            parent.append(br)
        }  
    }

    appendComment(element) {
        const form = document.querySelector('#commentForm')
        const br = document.querySelector('#formBr')
        if (form) {
            form.remove()
            br.remove()
        }
        
        const commentLi = document.createElement("li")
        commentLi.id = `comment ${this.id}`
        const button = document.createElement('button')
        button.innerHTML = 'Delete Comment'
        button.addEventListener('click', this.deleteComment.bind(this))
        commentLi.innerText = this.content
        
        element.append(commentLi)
        commentLi.append(button)
    }

    static appendComments(comments, element) {
        const ul = document.createElement('ul')
        element.append(ul)
        for (let comment of comments) {
            let newComment = new Comment(comment)
            newComment.appendComment(element)
        }
    }

    static createComment() {
        event.preventDefault()
        const value = document.getElementById('commentId').value
        const parent = this.parentNode
        const post_id = parseInt(this.parentNode.id)
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
        event.target.reset()
        fetch('http://127.0.0.1:3000/comments', options)
        .then(resp => resp.json())
        .then(comment => {
            let newComment = new Comment(comment)
            newComment.appendComment(parent)
        })
    }

    deleteComment() {
        const commentId = this.id
        const comment = `comment ${commentId.toString()}`
        
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
            document.getElementById(comment).remove()
        })
    }
}











