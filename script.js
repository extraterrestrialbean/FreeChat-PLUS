const themeSwitcher = document.getElementById("theme_switcher");
const body = document.getElementById("the_body");
const usrMsgBox = document.getElementById("usr_msg");
const prevChats = document.getElementById("prev_chats");
const newChat = document.getElementById("new_chat");
const disclosures = document.getElementById("disclosures");

let currentTheme = "System default";
let displayDisclosure = false;
let currentChat;
let chatArray = [];
let nameToGiveChat;


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
            		document.getElementById("prev_chats_display").setAttribute("class", "display_none");
            		let chatList = prevChats.querySelectorAll('li');
            		chatList.forEach((chat) => {chat.classList.remove("current_chat")});
            		prevChats.firstChild.setAttribute("class", "current_chat");
            
            		if (usrSubmission.length > 30) {
               	 		nameToGiveChat = usrSubmission.substring(0, 30) + "…";
            		} else {
                		nameToGiveChat = usrSubmission;
            		};
			if (chatArray.includes(nameToGiveChat)) {
				nameToGiveChat = nameToGiveChat + " " + Math.round(Date.now() * Math.random()).toString(36);
			};
			prevChats.firstChild.innerHTML = nameToGiveChat;
			chatArray.unshift(nameToGiveChat);
			prevChats.firstChild.setAttribute("id", "chat-" + nameToGiveChat);
			prevChats.firstChild.setAttribute("onclick", "makeCurrent(\"" + nameToGiveChat + "\")");
           	 	currentChat = chatArray[0];
            		document.getElementById("create_msg").setAttribute("class", "after");
            		usrMsgBox.setAttribute("class", "after");
            		newChat.setAttribute("class", "create_new_chat")
        		};
        	// SEND THE MESSAGE IN THE CURRENT CHAT
    		}
});

function makeCurrent(chatToMakeCurrent) {
	currentChat = chatArray[chatArray.indexOf(chatToMakeCurrent)];
	let chatList = prevChats.querySelectorAll('li');
	chatList.forEach((chat) => {chat.classList.remove("current_chat")});
	document.getElementById("chat-" + chatToMakeCurrent).classList.add("current_chat");
}

function createNewChat() {
    	document.getElementById("create_msg").setAttribute("class", "before");
    	usrMsgBox.setAttribute("class", "before");
    	let chatList = prevChats.querySelectorAll('li');
    	currentChat = undefined;
    	chatList.forEach((chat) => {chat.classList.remove("current_chat")});
}

//theme switcher
function switchTheme() {
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

function showDisclosures() {
	if (displayDisclosure == false) {
		displayDisclosure = true;
		disclosures.classList.remove("disclosure_no_display");
		disclosures.classList.add("disclosure");
	} else {
		displayDisclosure = false;
		disclosures.classList.remove("disclosure");
		disclosures.classList.add("disclosure_no_display");
	}
}
