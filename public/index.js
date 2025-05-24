
function capitalize(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

// User select
document.getElementById('user').value = "none";
var user = "none";
var userSelect = document.getElementById('user');
    userSelect.onchange = (event) => {
        var inputText = event.target.value;
        // console.log(inputText);
        user = inputText;
        document.getElementById("p").innerHTML = "Hey there "+capitalize(inputText)+" :3";
}

// Logs
async function loadMessages() {
    
    // Get all messages
    let messages;
    let html = "";
    var reverseMessages = [];
    const response = await fetch(`/route/getMessages`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const ref = await response.json();
    // console.log('finished', ref)
    if (response.ok) {
        messages = ref.messages;
        // console.log(messages)
    }
    // console.log("normal", messages)
    for (let i = messages.length - 1; i >= 0; i--) {
        // console.log(messages[i])
        reverseMessages.push(messages[i]);
    }
    // console.log("reversed", reverseMessages)
    document.getElementById("logs").innerHTML = "";
    for (let i = 0; i < reverseMessages.length; i++) {
        let newmsg = document.createElement('p');
        newmsg.innerHTML = reverseMessages[i].user+": "+reverseMessages[i].message;
        switch (reverseMessages[i].user) {
            case "Fable":
                newmsg.style.color = "hotpink";
                break;
            case "Elaina":
                newmsg.style.color = "cyan";
                break;
            case "Hazel":
                newmsg.style.color = "royalblue";
                break;
        }
        
        
        document.getElementById("logs").appendChild(newmsg);
    }
    // document.getElementById("logs").innerHTML = html;
}

// Message
const textInput = document.getElementById('message');
textInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        // console.log(textInput.value);
        
        // Route push to database
        const response = await fetch(`/route/addMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userinp: user,
                messageinp: textInput.value
            })
        });
        const ref = await response.json();
        // console.log(user, textInput.value)
        // console.log('finished', ref)
        if (response.ok) {
            loadMessages();
        }
        textInput.value = "";
    }
});

// Reload every half second
function reload() {
    loadMessages();
    setTimeout(() => {
        reload();
    }, "500");
}

reload();