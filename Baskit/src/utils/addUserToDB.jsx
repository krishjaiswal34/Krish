export const addUserToDB=(userAuthId)=>{
    console.log("userAuthId:frm adduser to db:",userAuthId)
    fetch('http://localhost:8000/user',{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            "userAuthId":userAuthId
        })

    })
}

