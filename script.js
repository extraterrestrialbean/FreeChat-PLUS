const themeSwitcher = document.getElementById("theme_switcher");
const body = document.getElementById("the_body");
const usrMsgBox = document.getElementById("usr_msg");
const prevChats = document.getElementById("prev_chats")

let currentTheme = "System default";
let currentChat;
let chatArray = [];


// send message

// Source - https://stackoverflow.com/a/36413924
// Posted by Sergio Cabral, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-26, License - CC BY-SA 4.0
usrMsgBox.addEventListener("keypress", e => {
    const usrSubmission = usrMsgBox.value.trim();
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        usrMsgBox.value = "";

        if (!usrSubmission || usrSubmission === "") {
            return;
            };
        if (usrMsgBox.classList.contains("before")) {
            prevChats.prepend(document.createElement("li"));
            prevChats.firstChild.setAttribute("tabindex", "3");
            prevChats.firstChild.setAttribute("onclick", "DO SOMETHING TO MAKE ME CURRENT()")
            document.getElementById("prev_chats_display").setAttribute("class", "display_none");
            let chatList = prevChats.querySelectorAll('li');
            chatList.forEach((chat) => {chat.classList.remove("current_chat")});
            prevChats.firstChild.setAttribute("class", "current_chat");
            
            if (usrSubmission.length > 30) {
                prevChats.firstChild.innerHTML = usrSubmission.substring(0, 30) + "…";
                chatArray.unshift(usrSubmission.substring(0, 30) + "…");
            } else {
                prevChats.firstChild.innerHTML = usrSubmission;
                chatArray.unshift(usrSubmission);
            };
            currentChat = chatArray[0];
            document.getElementById("create_new_chat").setAttribute("class", "after");
            usrMsgBox.setAttribute("class", "after");
        };
        // SEND THE MESSAGE IN THE CURRENT CHAT
    }
});

//theme switcher
function switch_theme() {
    switch(currentTheme) {
        case "System default":
            currentTheme = "Light";
            body.setAttribute("class", "light");
            break;
        case "Light":
            currentTheme = "Dark";
            body.setAttribute("class", "dark");
            break;
        case "Dark":
            currentTheme = "System default";
            body.setAttribute("class", "sys");
            break;
    };
    themeSwitcher.innerHTML = "Theme: " + currentTheme;
}