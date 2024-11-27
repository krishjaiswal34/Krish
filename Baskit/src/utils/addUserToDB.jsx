export const addUserToDB=(userAuthId)=>{

const SERVER_URL=import.meta.env.VITE_SERVER_URL
    fetch(`${SERVER_URL}/user`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            "userAuthId":userAuthId
        })

    })
}

