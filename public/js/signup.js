document.querySelector("#signup").addEventListener("submit",event=>{
    event.preventDefault();
    const userObj = {
        username:document.querySelector("#signupUsername").value,
        password:document.querySelector("#signupPassword").value,
    }
    console.log(userObj)
    fetch("/api/users/",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            console.log("Signed up successfully")
            location.href="/dashboard"
        } else {
            alert("Try again!")
        }
    })
})