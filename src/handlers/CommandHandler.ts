import { Collection } from "discord.js";
import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import Command from "../structures/Command";

export default class CommandHandler extends Collection<string, Command> {
  private path = resolve(__dirname, "../cmds");
  /**
   * Loop through all the files in /cmds
   */
  public init() {
    const start = Date.now();

    const cmdDir = readdirSync(this.path);

    cmdDir.forEach((folder: string) => {
      const files: string[] = readdirSync(this.path + "\\" + folder).filter(
        (f) => f.split(".").pop() === "js"
      );

      if (files.length <= 0) throw "Err: Could not find commands.";

      files.forEach((file) => {
        this.initFile(folder, file);
      });
    });

    const end = Date.now();

    const time = new Date(end - start).getMilliseconds();
    console.log(`Commands loaded in ${time} ms`);

    return this;
  }

  /**
   * This adds a file to the command collection
   */
  private initFile(folder: string, name: string) {
    let file: Command = require(`${this.path}\\${folder}\\${name}`);

    const properties = {
      cmd: file.cmd,
      about: file.about,
    };

    this.set(properties.about.name, properties);

    console.log(`${name} Loaded`);
  }

  public call(name: string) {
    name = name.toLowerCase();

    if (this.has(name)) return this.get(name) as Command;

    const alias = this.find(
      (x) => x.about.aliases != null && x.about.aliases.includes(name)
    );

    return alias ? alias : null;
  }

  // waht is the point of this nerd nerd why are you doing this we have the if (cmd || alias)
}
