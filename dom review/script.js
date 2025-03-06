const parentComments = {

    1 : { id : 1 ,  content : "Comment 01" , children : new Set() } , 
    2 : { id : 1 ,  content : "Comment 01" , children : new Set() }
}


const childrenComments = {}

const inputElement = document.querySelector("#comment-adder")
const commentHolder = document.querySelector(".comments-holder")

inputElement.addEventListener("keyup", addParentComments)

function addParentComments(eventObj) {
  if (eventObj.key == "Enter") {
    const idForparent = createId()

    parentComments[idForparent] = {
      id: idForparent,
      content: eventObj.target.value,
      children: new Set(),
    }

    eventObj.target.value = ""

    renderUiForComments()
  }
}

commentHolder.addEventListener("click", fireRespectiveFunction)

function fireRespectiveFunction(eventObj) {
  const targetElement = eventObj.target

  if (targetElement.className == "reply") {
    replyButtonHelper(targetElement)
  } else {
    if (targetElement.className == "add") {
      addButtonHelper(targetElement)
      renderUiForComments()
    } else if (targetElement.className == "delete") {
      deleteButtonHelper(targetElement)
      renderUiForComments()
    }
  }
}

function addButtonHelper(targetElement) {
  const idForChild = createId()

  const parentEleId = targetElement.parentElement.parentElement.id

  childrenComments[idForChild] = {
    id: idForChild,
    parentId: parentEleId,
    content: targetElement.previousElementSibling.value,
    children: new Set(),
  }

  if (parentComments[parentEleId]) {
    parentComments[parentEleId].children.add(idForChild)
  } else {
    childrenComments[parentEleId].children.add(idForChild)
  }
}

function deleteButtonHelper(targetElement) {

  const targetId = targetElement?.parentElement?.parentElement?.id


  if (parentComments[targetId]) {
    delete parentComments[targetId]
  } else {

    const parentId = childrenComments[targetId]["parentId"]

    if (parentComments[parentId]) {

      parentComments[parentId].children.delete( Number(targetId) )

    } else {
      console.log("I'm Child  ", targetId)

      childrenComments[parentId].children.delete( Number(targetId) )

    }
  }

  renderUiForComments()

  
}

function replyButtonHelper(targetElement) {
  targetElement.innerText = "add"
  targetElement.className = "add"

  const inputElement = document.createElement("input")

  targetElement.parentElement.insertBefore(inputElement, targetElement)
}

// document.querySelector().

function renderUiForComments() {
  commentHolder.innerHTML = ""

  Object.keys(parentComments).forEach((ele) => {
    commentHolder.appendChild(
      createComment(parentComments[ele].content, ele, 0)
    )
    renderUiForCommentsHelper(parentComments[ele].children, 1)
  })
}

function renderUiForCommentsHelper(childrensId, level) {

  childrensId.forEach((id) => {

    commentHolder.appendChild(
      createComment(childrenComments[id].content, id, level)
    )

    const childrensChildrenIds = childrenComments[id]["children"]

    if (childrensChildrenIds.size > 0) {
      renderUiForCommentsHelper(childrensChildrenIds, level + 1)
    }
  })
}

function createComment(content, id, level) {
  const commentDiv = document.createElement("div")
  commentDiv.classList.add("comment")
  commentDiv.setAttribute("id", id)

  commentDiv.style.left = `${level * 5}%`

  const commentContent = document.createElement("div")
  commentContent.classList.add("comment-content")
  commentContent.innerText = content

  const commentFunction = document.createElement("div")
  commentFunction.classList.add("comment-functions")

  const replyButton = document.createElement("button")
  replyButton.innerText = "reply"
  replyButton.className = "reply"

  const deleteButton = document.createElement("button")
  deleteButton.innerText = "delete"
  deleteButton.className = "delete"

  commentFunction.append(replyButton, deleteButton)

  commentDiv.append(commentContent, commentFunction)

  return commentDiv
}

function createId() {
  return Date.now()
}
