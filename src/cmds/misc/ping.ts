import { Client, Message, MessageEmbed } from "discord.js";
module.exports.cmd = (client: Client, message: Message, args: string[]): void => {
	const start = Date.now();
	// Code does not need if gate for permissions
	message.channel.send("Pinging...").then(m => {
		const end = Date.now();
		const time = new Date(end - start).getMilliseconds()
		let embed = new MessageEmbed()
			.setTitle("Pong!")
			.addField("💓 Heartbeat", client.ws.ping + " ms")
			.addField("🕸️ Websocket", time + " ms")
		m.edit("", { embed: embed })
	})
};

module.exports.about = {
  name: "ping",
  aliases: ["p"],
  usage: "ping",
  description: "Checks the bot response time.",
  permissions: [],
};	
/*
	Permissions allowed:
	Blank Array for @everyone
	R: RoleName
	M: MemberID
	P: PermissionResolvable
*/
