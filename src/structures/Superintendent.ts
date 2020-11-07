import { Client } from "discord.js"
import CommandHandler from "../handlers/CommandHandler"
const config = require("../../configs/config.json")
// You do it
export default class Superintendent extends Client {

    public cmds: CommandHandler;
    constructor() {
        super({
            messageCacheMaxSize: 0
        })

        this.cmds = new CommandHandler();
        this.cmds.init();

        this.login(config.token)
        .catch(() => "Token Login Error")
    }
}