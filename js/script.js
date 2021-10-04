let timestamp=""; /*Registro temporal da ultima atualização*/
timestamp = new Date().getTime();
const headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Content-Type", "application/json; charset=UTF-8");

console.log("http://localhost/CIMOL/chat-api/api/"+timestamp)

let updateMesages=function(){
   fetch("http://localhost/CIMOL/chat-api/api/"+timestamp,
        { method:"GET",
            headers:headers,
            mode: "no-cors"   
        }).then(response=>{
            response.json().then(data=>{
                console.log(data)
                if(data.rows>0){
                    data.forEach(function(m){
                        document.querySelector("#msgs").append(m.nick+" diz: "+m.message)
                    })
                }
                
            })
        }).catch(function(error){
            console.log(error)
        }
    )
}

document.querySelector("#btn-in").onclick=function(){
    document.querySelector("#chat-in").style.display="none";
    document.querySelector("#chat-msg").style.display="block";
    document.querySelector("#msgs").append("----Início----")
    document.querySelector("#nick").value=document.querySelector("#input-nick").value;
    document.querySelector("#nick-user").innerHTML=document.querySelector("#input-nick").value;
    setInterval(updateMesages(),3000)
    //return false;
}

document.querySelector("#btn-send-msg").onclick=function(){
    let body={
            nick:document.querySelector("#nick").value,
            message:document.querySelector("#msg").value
        }
    //console.log(body)
    fetch("http://localhost/CIMOL/chat-api/api/",{
        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        mode: "cors",
        body:JSON.stringify(body)
    }).then(response => {
        console.log(response)
        response.text().then(function(data){
            console.log(data)
            data=JSON.parse(data)
        })
    }).catch(function(err){
        console.log(err)
    })
    return false;
}

