const Discord = require("discord.js");
const { MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS
]});

const { SlashCommandBuilder } = require("@discordjs/builders");

const config = require("./config.json");
Client.login(config.process.env.token);

Client.on('ready', () => {
  console.log(`${Client.user.tag} est connecter`);  
  Client.user.setActivity("Prefix: /");// WATCHING, LISTENING ou pas type mais url:lien twitch pour STREAMING  
  Client.user.setStatus('online'); //dnd, invisible, online, idle
});

Client.on('ready', async () => {
  const server_id = "991392577058242742"

  //AJOUTE COMMANDE

  //Client.guilds.cache.get(server_id).commands.create(clear);

  //RETIRE COMMANDE

  //const command_id_delete = ""
  //Client.guilds.cache.get(server_id).commands.delete(command_id_delete);

  //Recharger les commandes sur le serveur

  console.log("-> Recharchement des commandes Serveur");
  console.log(Client.guilds.cache.get(server_id).commands.cache);
  await Client.guilds.cache.get(server_id).commands.fetch();
  console.log(Client.guilds.cache.get(server_id).commands.cache);
  console.log(" ");

})


Client.on('interactionCreate', async interaction => {
   if (interaction.isButton()){
    if (interaction.customId === "row_verification"){
      if (interaction.member.roles.cache.has("992752502900539413")){
        interaction.reply({content: "TU A DEJA PASSER LA VERIFICATION", ephemeral: true})
      }else{
          interaction.member.roles.add("992752502900539413")
          interaction.reply({content: "TU A PASSER LA VERIFICATION", ephemeral: true})
      } 
    }
  }
  if (interaction.commandName === 'ping') {
    interaction.reply('Pong!');
  };

  if (interaction.commandName === 'help') {
    const file = new Discord.MessageAttachment(`./img_gif/commande_help.gif`)

    const row = new Discord.MessageActionRow()
      .addComponents(
        new MessageButton()
        .setEmoji("🎵")
        .setLabel("Lien TikTok")
        .setURL("https://www.tiktok.com/@_sunchill_")
        .setStyle("LINK")
        .setDisabled(false)
      ).addComponents(
        new MessageButton()
        .setEmoji("📷")
        .setLabel("Lien Instagram")
        .setURL("https://www.instagram.com/streenox_qlf")
        .setStyle("LINK")
        .setDisabled(false)
      );

    const Embed = new Discord.MessageEmbed()
      .setColor('#DAC8A6')
	    .setTitle('TOUTE LES COMMANDES DU SERVEUR')
	    .setAuthor({ name: Client.user.tag, iconURL: Client.user.displayAvatarURL({dynamic: true})})
	    .setThumbnail(Client.user.displayAvatarURL({dynamic: true}))
    	.addFields(
	    	{ name: '**FUN**', value: '**`💋 - kiss`,`✋🏼 - slap`,`😢 - sniff`**' },
		    { name: '\u200B', value: '\u200B' },
		    { name: '**RESEAU SOCIAUX**', value: '**`🎵 - TikTok`**,`📷 - Instagram`'},
	    )
	    .setImage('attachment://commande_help.gif')
	    .setTimestamp()
	    .setFooter({ text: '/HELP', iconURL: Client.user.displayAvatarURL({dynamic: true})});

    interaction.reply({embeds: [Embed], ephemeral: true, files: [file], components: [row]})
  }

  if (interaction.commandName === 'kiss') {
    let user = interaction.options.getUser("user")
    const answers = [
      "https://c.tenor.com/UQwgkQbdp48AAAAC/kiss-anime.gif",
      "https://c.tenor.com/Daj-Pn82PagAAAAM/gif-kiss.gif",
      "https://c.tenor.com/2u67zOB43esAAAAd/cute-anime.gif",
      "https://c.tenor.com/8ln6Z1e-FVYAAAAd/nagumi-koushi-hozumi-serene.gif",
    ]
    const answer = answers[Math.floor(Math.random() * answers.length)];

    const Embed = new Discord.MessageEmbed()
      .setColor('#DAC8A6')
	    .setDescription(`💋・${interaction.user} a fait un bisoux d'amoure a <@${user.id}>`)
      .setImage(answer)

    interaction.reply({embeds: [Embed]})
  }

  if (interaction.commandName === 'slap') {
    let user = interaction.options.getUser("user")
    const answers = [
      "https://c.tenor.com/UDo0WPttiRsAAAAd/bunny-girl-slap.gif",
      "https://c.tenor.com/PeJyQRCSHHkAAAAM/saki-saki-mukai-naoya.gif",
      "https://c.tenor.com/LUJRVpYgy-8AAAAM/kiniro-kiniro-mosaic.gif",
      "https://c.tenor.com/bW9sL6u6V7AAAAAM/fly-away-slap.gif",
    ]
    const answer = answers[Math.floor(Math.random() * answers.length)];

    const Embed = new Discord.MessageEmbed()
      .setColor('#DAC8A6')
	    .setDescription(`✋🏼・${interaction.user} a baffer <@${user.id}>`)
      .setImage(answer)

    interaction.reply({embeds: [Embed]})
  }

  if (interaction.commandName === 'sniff') {
    let user = interaction.options.getUser("user")
    const answers = [
      "https://c.tenor.com/jTei9b9RH0wAAAAM/anime-sad.gif",
      "https://c.tenor.com/23diKqrxV_EAAAAM/aimoto-rinku-d4dj-first-mix.gif",
      "https://c.tenor.com/brCPsGa3B_0AAAAM/best-girl-anime.gif",
      "https://c.tenor.com/q8ok1fi_Bo8AAAAC/sad-anime.gif",
    ]
    const answer = answers[Math.floor(Math.random() * answers.length)];

    const Embed = new Discord.MessageEmbed()
      .setColor('#DAC8A6')
	    .setDescription(`✋🏼・${interaction.user} pleure a cause de <@${user.id}>`)
      .setImage(answer)

    interaction.reply({embeds: [Embed]})
  }
  if (interaction.commandName === 'verif') {
    
    const row = new Discord.MessageActionRow()
      .addComponents(
        new MessageButton()
        .setEmoji("📨")
        .setCustomId('row_verification')
        .setLabel("Vérification")
        .setStyle("SUCCESS")
        .setDisabled(false)
      );

    const Embed = new Discord.MessageEmbed()
      .setColor('#DAC8A6')
	    .setTitle('VERIFICATION')
	    .setAuthor({ name: Client.user.tag, iconURL: Client.user.displayAvatarURL({dynamic: true})})
	    .setThumbnail(interaction.guild.iconURL({dynamic: true}))
    	.setDescription(`**CLIQUE** 
SUR LE BOUTON CI DESSOU`)
	    .setImage('https://cdn.discordapp.com/attachments/992795324991152224/992795612175147088/standard_49.gif')
	    .setTimestamp()
	    .setFooter({ text: '/VERIF', iconURL: Client.user.displayAvatarURL({dynamic: true})});

      if (interaction.member.permissions.has(`ADMINISTRATOR`)){
        interaction.channel.send({embeds: [Embed], components: [row]})    
        interaction.reply({content: "LE MESSAGE DE VERIFICATION A BIEN ETAIS ENVOYER", ephemeral: true})
      }else{
        interaction.reply({content: "TU N'A PAS LES PERMS", ephemeral: true})
      }
  }
});

const ping = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Renvoie pong!");

const help = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Liste des commandes");

const kiss = new SlashCommandBuilder()
  .setName("kiss")
  .setDescription("Fais un bisoux a ton futur gendre")
  .addUserOption(Option => Option
   .setName("user")
   .setDescription("Choisi le joeur que tu veut embrasser.")
   .setRequired(true));

const slap = new SlashCommandBuilder()
  .setName("slap")
  .setDescription("Mais une claque a un utilisateur")
  .addUserOption(Option => Option
   .setName("user")
   .setDescription("Choisi le joeur que tu veut baffer.")
   .setRequired(true));
   
const sniff = new SlashCommandBuilder()
  .setName("sniff")
  .setDescription("Choisi l'utilisateur qui ta fait du mal")
  .addUserOption(Option => Option
   .setName("user")
   .setDescription("Choisi le joeur qui ta fait du mal.")
   .setRequired(true));

const verif = new SlashCommandBuilder()
   .setName("verif")
   .setDescription("Envoie un embed + boutton");



//MESSAGE DE BIENVENUE
Client.on('guildMemberAdd', member => {
  const server_id = "991392577058242742"
  const salon_id = "991802823471808554"

  const embed = new Discord.MessageEmbed()
    .setTitle(`Un nouveau membre vien juste de arrivé !`)
    .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({dynamic: true})})
    .setDescription(`Bienvenue ${member} passe un bon moment ici`)
    .setImage("https://cdn-longterm.mee6.xyz/plugins/welcome/images/847570815784583208/06f7bf1861e1fb369747bbcde3018c5c5fe6209fecfbc87263e505a706f177cd.gif")
    .setColor("#F2EE74")

  //if (!member.guild.channels.cache.find(ch => ch.name === 'hello')){

 // }else{
   // member.guild.channels.cache.find(ch => ch.name === 'hello').send({embeds: [embed]})
 // }
  Client.guilds.cache.get(server_id).channels.cache.get(salon_id).send({embeds: [embed]})
});

//MESSAGE D'AUREVOIRE
Client.on('guildMemberRemove', member => {
  const server_id = "991392577058242742"
  const salon_id = "992546612557664346"

  const embed = new Discord.MessageEmbed()
    .setTitle(`Un membre vien de nous quitter !`)
    .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({dynamic: true})})
    .setDescription(`Aurevoir ${member} SNIF SNIF`)
    .setColor("#46433D")

  //if (!member.guild.channels.cache.find(ch => ch.name === 'hello')){

 // }else{
   // member.guild.channels.cache.find(ch => ch.name === 'hello').send({embeds: [embed]})
 // }
  Client.guilds.cache.get(server_id).channels.cache.get(salon_id).send({embeds: [embed]})
});