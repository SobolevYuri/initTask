
document.querySelector(".sign-up-form").addEventListener('submit', function(e){ 
    e.preventDefault(); 
    console.log("Done it =)");
});

document.querySelector("#signup").addEventListener('click', function(e){ 
    e.preventDefault(); 
    document.querySelector('.start-window').classList.toggle('hide-window'); 
    document.querySelector('.sign-up-form').classList.toggle('show-window'); 
    }); 
    
    document.querySelector("#signin").addEventListener('click', function(e){ 
    e.preventDefault(); 
    document.querySelector('.start-window').classList.toggle('hide-window'); 
    document.querySelector('.sign-in-form').classList.toggle('show-window'); 
    }); 
    
    document.querySelector("#email-sign-up").addEventListener('change', function(){ 
    var emailVal=document.querySelector("#email-sign-up").value; 
    if (!document.querySelector("#email-sign-up").value.match(/^[a-zA-Z0-9][\w/.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w/.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z/.]*[a-zA-Z]$/)){ 
    alert("Wrong E-mail address =("); 
    document.querySelector("#email-sign-up").value=''; 
    return false; 
    } 
    if(localStorage.getItem(emailVal) != null){ 
    alert("Such login is already exists, please type another one"); 
    document.querySelector("#email-sign-up").value=''; 
    return false; 
    } 
    }); 

    document.querySelector("#pass-sign-up").addEventListener('change', function(){
        if ((document.querySelector("#pass-sign-up").value).length < 8){
            alert("Password requires at least 8 symbols ;-)"); 
            document.querySelector("#pass-sign-up").value=''; 
           return false; 
        }
     });
    
    document.querySelector("#signup-submit").addEventListener('click', function(e){ 
    e.preventDefault(); 
    if(document.querySelector("#email-sign-up").value == '' 
    || document.querySelector("#pass-sign-up").value == ''){ 
    if(document.querySelector(".sign-up-form span") == null){ 
    var registError=document.createElement('span'); 
    registError.style.color="red"; 
    var registErrorText = document.createTextNode("Fill in all the fields, please!"); 
    registError.append(registErrorText); 
    document.querySelector(".sign-up-form").append(registError); 
    } else{ 
    return; 
    } 
    } else{ 
    var userEmail=document.querySelector("#email-sign-up").value; 
    var userPassword=document.querySelector("#pass-sign-up").value; 
    localStorage.setItem(userEmail, userPassword); 
    document.querySelector(".sign-up-form").classList.remove("show-window"); 
    document.querySelector(".fullpage-wrap").classList.toggle("show-fullpage"); 
    var userData=document.createElement('h2'); 
    var userText = document.createTextNode(userInfo(userEmail)); 
    userData.append(userText); 
    document.querySelector("aside").append(userData); 
    } 
    }); 
    
    document.querySelector("#email-sign-in").addEventListener('change', function(){ 
    var emailVal=document.querySelector("#email-sign-in").value; 
    if(localStorage.getItem(emailVal) == null){ 
    var anotherLogin=confirm("No such login, type Ok to register or Cancel to try another one"); 
    if(anotherLogin){ 
    document.querySelector(".sign-in-form").classList.toggle("show-window"); 
    document.querySelector(".sign-up-form").classList.toggle("show-window"); 
    } else{ 
    document.querySelector("#email-sign-in").value=''; 
    } 
    return false; 
    } 
    }); 
    
    document.querySelector("#signin-submit").addEventListener('click', function(e){ 
    e.preventDefault(); 
    if(document.querySelector("#email-sign-in").value == '' 
    || document.querySelector("#pass-sign-in").value == ''){ 
    if(document.querySelector(".sign-in-form span") == null){ 
    var registError=document.createElement('span'); 
    registError.style.color="red"; 
    var registErrorText = document.createTextNode("Fill in all the fields, please!"); 
    registError.append(registErrorText); 
    document.querySelector(".sign-in-form").append(registError); 
    } else{ 
    return; 
    } 
    } else{ 
    var userEmail=document.querySelector("#email-sign-in").value; 
    var userPassword=document.querySelector("#pass-sign-in").value; 
    
    if(localStorage.getItem(userEmail)!=userPassword){ 
    alert("Wrong account password =("); 
    document.querySelector("#pass-sign-in").value=""; 
    return false; 
    } 
    document.querySelector(".sign-in-form").classList.remove("show-window"); 
    document.querySelector(".fullpage-wrap").classList.toggle("show-fullpage"); 
    var userData=document.createElement('h2'); 
    var userText = document.createTextNode(userInfo(userEmail)); 
    userData.append(userText);
     
    document.querySelector("aside").append(userData); 
    } 
    }); 
    
    function userInfo(userLogin){ 
    return `Hi, homie! Your email: ${userLogin}`; 
    }