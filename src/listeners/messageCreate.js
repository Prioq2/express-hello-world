/* eslint-disable no-undef */
import { BaseEvent } from "../base/BaseEvent.js";
import { CommandContext } from "../structures/CommandContext.js";

export class messageCreate extends BaseEvent {
    constructor(client) {
        super(client, "messageCreate");
    }

    async execute(message) {
        //if (!message.inGuild() ) return //message.reply("Sorry, but this command is only limited to guilds.");
        let hahachannel = this.client.channels.cache.get('1011811373380010097');
        if ( message.channel.id !== '1037378390535180298' ) return console.log('not');
        if ( message.author.id === this.client.user.id ) return;
        hahachannel.send(message.content)
        console.log(message.content)
    }
}
