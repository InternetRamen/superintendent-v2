export default interface Command {
    cmd: Function,
    about: {
        name: string,
        aliases?: string[],
        usage: string,
        description: string,
        permissions?: string[]
    }
}