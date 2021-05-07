function appendComments(comments, element) {
    const ul = document.createElement('ul')
    element.append(ul)
    for (let comment of comments) {
        const postLi = document.createElement('li')
        postLi.innerText = comment.content
        ul.append(postLi)
    }
}
