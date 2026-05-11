const express = require("express")
const TelegramBot = require("node-telegram-bot-api")

const app = express()

const TOKEN = process.env.BOT_TOKEN

const bot = new TelegramBot(TOKEN, { polling: true })

let users = []
let messages = []

function addUser(user) {
if (!users.find(u => u.id === user.id)) {
users.push({
id: user.id,
username: user.username || "no_username"
})
}
}

function addLog(username, text) {

messages.unshift({
username: username || "no_username",
text: text
})

if (messages.length > 20) {
messages.pop()
}

}

bot.onText(/\/start/, (msg) => {

addUser(msg.from)

addLog(msg.from.username, "/start")

bot.sendMessage(msg.chat.id,

`👋 Добро пожаловать в VPN NOOL

📱 Инструкция подключения VPN:

1️⃣ Скачайте приложение Happ
Доступно на iPhone и Android

2️⃣ После покупки ключа откройте Happ

3️⃣ Внизу слева нажмите:
📋 "Выбрать из буфера"

4️⃣ Вставьте VPN ключ

5️⃣ Выберите сервер

⚡ Самые быстрые:
🇩🇪 Germany
🇳🇱 Netherlands

🔒 Хорошего пользования VPN NOOL`,
{
reply_markup: {
keyboard: [
["💳 Купить подписку"],
["🛠 Поддержка"]
],
resize_keyboard: true
}
})

})

bot.on("message", (msg) => {

if (!msg.text) return

addUser(msg.from)

if (msg.text === "💳 Купить подписку") {

addLog(msg.from.username, "открыл подписки")

bot.sendMessage(msg.chat.id,

`💳 Выберите подписку VPN NOOL`,
{
reply_markup: {
keyboard: [
["📅 1 Месяц — 300₽"],
["⬅ Назад"]
],
resize_keyboard: true
}
})

}

if (msg.text === "📅 1 Месяц — 300₽") {

addLog(msg.from.username, "хочет купить VPN")

bot.sendMessage(msg.chat.id,

`⚠ Бот временно не принимает оплату

🔑 Для покупки VPN ключа:
напишите владельцу

👑 Владелец:
@SIKI_OFFICIAL

📱 1 устройство
📅 30 дней доступа
⚡ Высокая скорость VPN`
)

}

if (msg.text === "🛠 Поддержка") {

addLog(msg.from.username, "открыл поддержку")

bot.sendMessage(msg.chat.id,

`🛠 Техническая поддержка

По всем вопросам:
@SIKI_OFFICIAL`
)

}

if (msg.text === "⬅ Назад") {

addLog(msg.from.username, "вернулся назад")

bot.sendMessage(msg.chat.id,

`🏠 Главное меню`,
{
reply_markup: {
keyboard: [
["💳 Купить подписку"],
["🛠 Поддержка"]
],
resize_keyboard: true
}
})

}

})

app.get('/', (req,res) => {

const onlineUsers = users.slice(-5).reverse()

res.send(`

<!DOCTYPE html>
<html lang="ru">

<head>
<meta charset="UTF-8">
<title>VPN NOOL ADMIN</title>

<meta http-equiv="refresh" content="2">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:sans-serif;
}

body{
background:#050510;
color:white;
overflow-x:hidden;
}

.sidebar{
position:fixed;
left:0;
top:0;
width:260px;
height:100vh;
background:#0d0d18;
border-right:1px solid #6d28d9;
padding:25px;
}

.logo{
font-size:32px;
font-weight:900;
color:#a855f7;
text-shadow:0 0 20px #a855f7;
margin-bottom:40px;
}

.menu button{
width:100%;
margin-bottom:15px;
padding:15px;
border:none;
border-radius:15px;
background:#151526;
color:white;
font-size:16px;
cursor:pointer;
transition:.3s;
}

.menu button:hover{
background:#7e22ce;
transform:scale(1.03);
}

.main{
margin-left:260px;
padding:30px;
}

.topbar{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:30px;
}

.status{
color:#00ff88;
font-weight:bold;
font-size:18px;
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:20px;
}

.card{
background:#111122;
padding:25px;
border-radius:25px;
border:1px solid #7e22ce;
box-shadow:0 0 25px rgba(168,85,247,.2);
transition:.3s;
}

.card:hover{
transform:translateY(-5px);
box-shadow:0 0 35px rgba(168,85,247,.5);
}

.card h2{
font-size:18px;
color:#aaa;
margin-bottom:15px;
}

.big{
font-size:42px;
font-weight:900;
color:#c084fc;
}

.logs{
margin-top:30px;
background:#111122;
padding:25px;
border-radius:25px;
border:1px solid #7e22ce;
}

.logs h1{
margin-bottom:20px;
}

.log{
padding:15px;
border-bottom:1px solid #222;
}

.user{
color:#c084fc;
font-weight:bold;
}

.table{
margin-top:30px;
background:#111122;
padding:25px;
border-radius:25px;
border:1px solid #7e22ce;
}

table{
width:100%;
border-collapse:collapse;
}

th,td{
padding:15px;
text-align:left;
border-bottom:1px solid #222;
}

th{
color:#a855f7;
}

.online{
color:#00ff88;
font-weight:bold;
}

.glow{
position:fixed;
width:500px;
height:500px;
background:#7e22ce;
filter:blur(200px);
opacity:.2;
top:-100px;
right:-100px;
z-index:-1;
}

</style>
</head>

<body>

<div class="glow"></div>

<div class="sidebar">

<div class="logo">
VPN NOOL
</div>

<div class="menu">

<button>📊 Dashboard</button>

<button>👥 Пользователи</button>

<button>💬 Сообщения</button>

<button>🌍 VPN Servers</button>

<button>💳 Подписки</button>

<button>📨 Рассылка</button>

<button>🚫 Бан система</button>

<button>⚙ Настройки</button>

<button>🛡 Security</button>

</div>

</div>

<div class="main">

<div class="topbar">

<h1>ADMIN PANEL</h1>

<div class="status">
● SYSTEM ONLINE
</div>

</div>

<div class="grid">

<div class="card">
<h2>Пользователи</h2>
<div class="big">${users.length}</div>
</div>

<div class="card">
<h2>Онлайн сейчас</h2>
<div class="big">${onlineUsers.length}</div>
</div>

<div class="card">
<h2>VPN Nodes</h2>
<div class="big">12</div>
</div>

<div class="card">
<h2>Доход</h2>
<div class="big">${users.length * 300} ₽</div>
</div>

</div>

<div class="logs">

<h1>LIVE ACTIVITY</h1>

${messages.map(m => `
<div class="log">
<span class="user">@${m.username}</span>
: ${m.text}
</div>
`).join('')}

</div>

<div class="table">

<h1 style="margin-bottom:20px;">ПОСЛЕДНИЕ ПОЛЬЗОВАТЕЛИ</h1>

<table>

<tr>
<th>ID</th>
<th>USERNAME</th>
<th>STATUS</th>
<th>PLAN</th>
</tr>

${users.map(u => `
<tr>
<td>${u.id}</td>
<td>@${u.username}</td>
<td class="online">ONLINE</td>
<td>PREMIUM</td>
</tr>
`).join('')}

</table>

</div>

</div>

</body>
</html>

`)

})

app.listen(3000, () => {
console.log("SERVER STARTED")
})
