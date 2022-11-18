import {
  BaseCommand
} from "../../base/BaseCommand.js";
import {
  makeEmbed
} from "../../utils/makeEmbed.js";
import axios from "axios";

export class GetAccountCommand extends BaseCommand {
  constructor(client) {
    super(client, {
      slash: {
        name: "getsmurf",
        description: "Gets you a smurf from the database.",
        options: [ {
          required: true,
          type: "STRING",
          name: "rank",
          description: "The rank you want.",
          choices: [{
              name: 'Bronze',
              value: 'Bronze'
            },
            {
              name: 'Silver',
              value: 'Silver'
            },
            {
              name: 'Gold',
              value: 'Gold'
            },
            {
              name: 'Platinum',
              value: 'Platinum'
            },
            {
              name: 'Diamond',
              value: 'Diamond'
            },
            {
              name: 'Champion I',
              value: 'Champion I'
            },
        
            {
              name: 'Champion II',
              value: 'Champion II'
            },
        
            {
              name: 'Champion III',
              value: 'Champion III'
            },
            {
              name: 'Grand Champion I',
              value: 'Grand Champion I'
            },
            {
              name: 'Grand Champion III',
              value: 'Grand Champion III'
            },
        
            {
              name: 'Grand Champion III',
              value: 'Grand Champion III'
            },
            {
              name: 'Supersonic legend',
              value: 'Supersonic legend'
            }
          ]
        }, { type: "STRING",
        name: "playlist",
        description: "The playlist you want.",
        choices: [{
            name: '1v1',
            value: "0"
          },
          {
            name: '2v2',
            value: "1"
          },
          {
            name: '3v3',
            value: "2"
          },
          {
            name: 'Dropshot',
            value: "3"
          },
          {
            name: 'Rumble',
            value: "4"
          },
          {
            name: 'Hoops',
            value: "5"
          },
      
          {
            name: 'Snowday',
            value: "6"
          },
      
          {
            name: 'Tournament Matches',
            value: "7"
          }
        ],
      
       
      }],
      category: "General",
    }
  });
  }

  async execute(ctx,client) {
    let rank = ctx.options.getString('rank')
    console.log(rank)
    let playlist = ctx.options.getString('playlist')
    if (!rank) return ctx.send(`A rank is required.`);
    let ids = ['911783340758159411', '493883159071424523', '606127615920701454', '315870406563201024', '350389544333344768', '688021554906267678', '255071111006519330']
    if (!ids.includes(ctx.author.id)) return ctx.send(`You're not authorized.`);
    var config = {
      method: 'get',
      url: 'https://backend-bookmark.devprio.repl.co/api/auth/getaccountsranks',
      headers: {
        'authority': 'backend-bookmark.devprio.repl.co',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9,ar;q=0.8',
        'cookie': 'discord.oauth2=s%3AlxMcGvFRfYCTgJXQ6ZY1hA891l69X8Mj.X8NbFyufCNQHUlHDPqX%2FvK5CMeFaEcvBo550Rhcp8dA',
        'if-none-match': 'W/"21f62-eKHLxOQ1BIA5y7BBmCnN1MTtLbQ"',
        'origin': 'https://bolbolsmurfs.online',
        'referer': 'https://bolbolsmurfs.online/',
        'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
      }
    };

    axios(config)
      .then(function (response) {
        let accounts = response.data
        let results = []

        for (let i = 0; i < accounts.length; i++) {
          //console.log(Object.entries(Object.entries(accounts[0].ranks)[1])[1][1].rank.name)
          if (playlist) {
            if (Object.entries(Object.entries(accounts[i].ranks))[Number(playlist)][1][1].rank.name.split(' - ')[0].toLowerCase() === rank.toLowerCase()) {
              results.push(accounts[i])
            
            }
          } else {
            for (let j = 0; j < 8; j++) {

              if (Object.entries(Object.entries(accounts[i].ranks))[j][1][1].rank.name.includes(rank)) {
                results.push(accounts[i])
                break;
              }
            }

          }
          if (i == accounts.length - 1) {
            results.forEach(a => {
              //console.log(client.emojis.cache.find(e=> e.name === a.ranks['one'].rank.name.split(' - ')[0].toLowerCase().replace(/ /g,"_")), a.ranks['one'].rank.name.split(' - ')[0].toLowerCase().replace(/ /g,"_"))
              ctx.author.send({
                embeds: [makeEmbed('info', '').addFields(
                  [{
                      name: 'Tag',
                      value: `${a.tag}`,
                      inline: false
                    },
                    {
                      name: 'Email',
                      value: `${a.email}`,
                      inline: false
                    },
                    {
                      name: 'Password',
                      value: `${a.password}`,
                      inline: false
                    },
                    {
                      name: '1v1',
                      value: `${client.emojis.cache.find(e=> e.name === a.ranks['one'].rank.name.split(' - ')[0].toLowerCase().replace(/ /g,"_"))} ${a.ranks['one'].rank.name}\n${a.ranks['one'].division.name}`,
                      inline: true
                    },
                    {
                      name: '2v2',
                      value: `${client.emojis.cache.find(e=> e.name === a.ranks['two'].rank.name.split(' - ')[0].toLowerCase().replace(/ /g,"_"))} ${a.ranks['two'].rank.name}\n${a.ranks['two'].division.name}`,
                      inline: true
                    },
                    {
                      name: '3v3',
                      value: `${client.emojis.cache.find(e=> e.name === a.ranks['three'].rank.name.split(' - ')[0].toLowerCase().replace(/ /g,"_"))} ${a.ranks['three'].rank.name}\n${a.ranks['three'].division.name}`,
                      inline: true
                    },
                    {
                      name: 'Dropshot',
                      value: `${client.emojis.cache.find(e=> e.name === a.ranks['four'].rank.name.split(' - ')[0].toLowerCase().replace(/ /g,"_"))} ${a.ranks['four'].rank.name}\n${a.ranks['four'].division.name}`,
                      inline: true
                    },
                    {
                      name: 'Rumble',
                      value: `${client.emojis.cache.find(e=> e.name === a.ranks['five'].rank.name.split(' - ')[0].toLowerCase().replace(/ /g,"_"))} ${a.ranks['five'].rank.name}\n${a.ranks['five'].division.name}`,
                      inline: true
                    },
                    {
                      name: 'Hoops',
                      value: `${client.emojis.cache.find(e=> e.name === a.ranks['six'].rank.name.split(' - ')[0].toLowerCase().replace(/ /g,"_"))} ${a.ranks['six'].rank.name}\n${a.ranks['six'].division.name}`,
                      inline: true
                    },
                    {
                      name: 'Snowday',
                      value: `${client.emojis.cache.find(e=> e.name === a.ranks['seven'].rank.name.split(' - ')[0].toLowerCase().replace(/ /g,"_"))} ${a.ranks['seven'].rank.name}\n${a.ranks['seven'].division.name}`,
                      inline: true
                    },
                    {
                      name: 'Tournament Matches',
                      value: `${client.emojis.cache.find(e=> e.name === a.ranks['eight'].rank.name.split(' - ')[0].toLowerCase().replace(/ /g,"_"))} ${a.ranks['eight'].rank.name}\n${a.ranks['eight'].division.name}`,
                      inline: true
                    },
                  ]
                )]
              })
            })
            //console.log()
            if (!results.length) return ctx.send('No accounts found with the given information.')
            ctx.send(`Sent.`);
          }

        }
        //console.log(Object.entries(Object.entries(accounts[0].ranks)[1])[1][1].rank.name)

        //ctx.send()//
      })
      .catch(function (error) {

        ctx.send(`Site is down, run it and re-run the command.`);
        console.log(error);
      });


  }
}

/*export function addAccount(discordUserId, email, password, tag) {
    console.log(`http://localhost:5001/api/auth/newaccount?id=${discordUserId}&email=${email}&password=${password}&tag=${tag}`)
    return axios.get(`http://localhost:5001/api/auth/newaccount?id=${discordUserId}&email=${email}&password=${password}&tag=${tag}`, {withCredentials: true});
}*/


[{
  type: "STRING",
  name: "ranked",
  choices: [{
      name: 'Bronze',
      value: 'Bronze'
    },
    {
      name: 'Silver',
      value: 'Silver'
    },
    {
      name: 'Gold',
      value: 'Gold'
    },
    {
      name: 'Platinum',
      value: 'Platinum'
    },
    {
      name: 'Diamond',
      value: 'Diamond'
    },
    {
      name: 'Champion I',
      value: 'Champion I'
    },

    {
      name: 'Champion II',
      value: 'Champion II'
    },

    {
      name: 'Champion III',
      value: 'Champion III'
    },
    {
      name: 'Grand Champion I',
      value: 'Grand Champion I'
    },
    {
      name: 'Grand Champion III',
      value: 'Grand Champion III'
    },

    {
      name: 'Grand Champion III',
      value: 'Grand Champion III'
    },
    {
      name: 'Supersonic legend',
      value: 'Supersonic legend'
    }
  ]
}]

[{
  type: "INTEGER",
  name: "mmr",
  description: "The mmr of the account",
}, { type: "STRING",
  name: "playlist",
  description: "The playlist you want.",
  choices: [{
      name: '1v1',
      value: 0
    },
    {
      name: '2v2',
      value: 1
    },
    {
      name: '3v3',
      value: 2
    },
    {
      name: 'Dropshot',
      value: 3
    },
    {
      name: 'Rumble',
      value: 4
    },
    {
      name: 'Hoops',
      value: 5
    },

    {
      name: 'Snowday',
      value: 6
    },

    {
      name: 'Tournament Matches',
      value: 7
    }
  ],

}, {
  type: "STRING",
  name: "rank",
  description: "The rank you want.",
  choices: [{
      name: 'Bronze',
      value: 'Bronze'
    },
    {
      name: 'Silver',
      value: 'Silver'
    },
    {
      name: 'Gold',
      value: 'Gold'
    },
    {
      name: 'Platinum',
      value: 'Platinum'
    },
    {
      name: 'Diamond',
      value: 'Diamond'
    },
    {
      name: 'Champion I',
      value: 'Champion I'
    },

    {
      name: 'Champion II',
      value: 'Champion II'
    },

    {
      name: 'Champion III',
      value: 'Champion III'
    },
    {
      name: 'Grand Champion I',
      value: 'Grand Champion I'
    },
    {
      name: 'Grand Champion III',
      value: 'Grand Champion III'
    },

    {
      name: 'Grand Champion III',
      value: 'Grand Champion III'
    },
    {
      name: 'Supersonic legend',
      value: 'Supersonic legend'
    }
  ]
}


]
