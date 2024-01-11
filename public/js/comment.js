document.querySelector("#newComment").addEventListener("submit",event=>{
    // prevents from page reload
    event.preventDefault();
    const comment = {
        body:document.querySelector("#comment").value,
        blogId:document.querySelector("#hiddenCommentId").value,
    }
    fetch("/api/comments",{
        method:"POST",
        body:JSON.stringify(comment),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            console.log("Successfully posted comment!")
            location.reload()
        } else {
            alert("Try again!")
        }
    })
})