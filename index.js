
const Discord = require("discord.js");

var words = [];

const client = new Discord.Client();

const config = require("./config.json");
client.on("ready", () => {

  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
  
  if (message.author.bot) {
    return;
  }


  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  

  if(command === 'ping') {
    message.channel.send('Pong!');
  } else if (command == 'addword'){
    words.push(args[0]);
    message.channel.send('This has been added to your list of banned words.');
    
  
  } 
  else if(command == 'removeword'){
    const d = words.length;
    for ( c =0; c< words.length; c++){
      if ( args[0] == words[c]){

        args.splice(c, 1);

        message.channel.send('This has been removed to your list of banned words.');
      }


    }

    if ( d == words.length){

      message.channel.send('This was not found in your list of banned words.');
    }



  } else if (command == 'help'){

    message.channel.send('This is how to use verboten to ban words!');
    message.channel.send('use ~addword followed by a word to add it to your banned words list :) ');
    message.channel.send('use ~removeword followed by a word to remove it from your banned words list :|');
    



  }


  
  
  
  else{
      var str = "";
    for ( i = 0; i < message.content.toLowerCase().length; i++){
      if ( message.content.charAt(i) == " "){


       
      } else{

       str = str.concat(message.content.toLowerCase().charAt(i));
      
      }


    }
   



    for (c = 0; c < words.length; c++){

      if (str.includes(words[c])){
        message.channel.send('Did you try to type "' + message.content + '"? We do not use this kind of language in this server.');
      }

    }

   


  }


});


client.login(config.token);