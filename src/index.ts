import Superintendent from "./structures/Superintendent"
const config = require("../configs/config.json")
const client = new Superintendent();


// ready event
client.on("ready", () => {
	console.log("Ready! The bot is online.")
});

// message event


client.on("message", message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;
	// declarations
	let messageArray: string[] = message.content.split(" ")
	let prefix: string = config.PREFIX
	if (!message.content.startsWith(prefix)) return;
	let command: string = messageArray[0].slice(prefix.length)
	let args: string[] = messageArray.slice(1)
	// alias or 
	// find the command's object
	let cmdObj = client.cmds.call(command);
	if (!cmdObj) return;
	// run
	
	cmdObj.cmd(client, message, args)



});



client.login(config.TOKEN);