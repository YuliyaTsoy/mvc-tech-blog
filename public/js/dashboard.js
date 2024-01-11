const existingBlogs = document.querySelector("#existingblogs")
const createNew = document.querySelector("#createNew")
const newPost = document.querySelector("#newpost")
const newBlog = document.querySelector('#newBlog')

function hideCreateNew() {
    createNew.hidden=true;
}

hideCreateNew();

newPost.addEventListener("submit",event=>{
    event.preventDefault()
    console.log('clicked')
    existingBlogs.hidden=true;
    newPost.hidden =true;
    createNew.hidden =false;
});

newBlog.addEventListener("submit", event => {
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value
    event.preventDefault()
    console.log('Clicked')
    if (!title || !content) {
        alert('Both Title and Content are required!')
        return;
    }
    const blogObj = {
        title: title,
        content: content,
    }
    fetch("/api/blogs",{
        method:"POST",
        body:JSON.stringify(blogObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            createNew.setAttribute("hidden", "false")
            location.reload()
        } else {
            alert("Try again!")
        }
    })
})