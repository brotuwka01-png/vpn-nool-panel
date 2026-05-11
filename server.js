require('dotenv').config()

const express = require('express')
const TelegramBot = require('node-telegram-bot-api')
const cors = require('cors')

const app = express()

app.use(cors())

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
})

let users = []
let messages = []

bot.on('message', (msg) => {

const username = msg.from.username || 'unknown'

if(!users.find(u => u.id === msg.from.id)){

users.push({
id: msg.from.id,
username: username
})

}

messages.unshift({
username: username,
text: msg.text || 'media',
time: new Date().toLocaleTimeString()
})

messages = messages.slice(0,20)

})

bot.onText(/\/start/, (msg) => {

bot.sendMessage(msg.chat.id,

`🌌 VPN NOOL

🚀 Добро пожаловать

🛡 Самый быстрый VPN

👇 Используйте кнопки ниже`,

{
reply_markup:{
keyboard:[

['🛒 Купить подписку'],
['🛠 Поддержка']

],
resize_keyboard:true
}
}

)

})

bot.on('message', (msg) => {

if(msg.text === '🛒 Купить подписку'){

bot.sendMessage(msg.chat.id,

`💎 VPN NOOL PREMIUM

📅 1 месяц — 300 RUB
📱 Только 1 устройство

⚠ Для покупки:
@SIKI_OFFICIAL`
)

}

if(msg.text === '🛠 Поддержка'){

bot.sendMessage(msg.chat.id,

`🛠 Поддержка:
@SIKI_OFFICIAL`
)

}

})

app.get('/', (req,res) => {

res.send(`

<html>

<head>

<title>VPN NOOL ADMIN</title>

<meta http-equiv="refresh" content="3">

<style>

body{
background:#050510;
color:white;
font-family:sans-serif;
padding:30px;
}

.title{
font-size:50px;
font-weight:900;
color:#a855f7;
margin-bottom:20px;
}

.card{
background:#111122;
padding:25px;
border-radius:20px;
margin-bottom:20px;
border:1px solid #7e22ce;
}

.big{
font-size:40px;
font-weight:bold;
}

.user{
color:#c084fc;
}

</style>

</head>

<body>

<div class="title">
VPN NOOL ADMIN
</div>

<div class="card">
Пользователи
<div class="big">
${users.length}
</div>
</div>

<div class="card">
LIVE USERS
<br><br>

${users.map(u => `
<div class="user">
@${u.username}
</div>
`).join('')}

</div>

<div class="card">

LIVE ACTIVITY

<br><br>

${messages.map(m => `
<div>

<b>@${m.username}</b>

: ${m.text}

</div>

`).join('')}

</div>

</body>

</html>

`)

})

app.listen(process.env.PORT || 3000)
