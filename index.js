// Author: https://vk.com/id252847438

const request = require("request");
const title = require("console-title");
const colors = require("colors");
const fs = require("fs")
const readline = require('readline-sync');
title("VKComms Spammer ~ Ожидание / Author: https://vk.com/id252847438");

const tokensFile = "./tokens.txt";
const messagesFile = "./messages.txt";

if (!fs.existsSync(tokensFile) || !fs.existsSync(messagesFile)) {
	console.log("Вы не создали рядом со скриптом файл с токенами: \"tokens.txt\", либо файл с сообщениями: \"messages.txt\"".red.bold);
	setTimeout(exit, 3000);
}

var tokens = fs.readFileSync(tokensFile).toString().split("\n");
console.log("Токены загружены.".green.bold);

var messages = fs.readFileSync(messagesFile).toString().split("\n");
console.log("Сообщения загружены.".green.bold);

title("VKComms Spammer ~ Указание параметров / Author: https://vk.com/id252847438");
var user_id = readline.question('— Введите ID пользователя для спама: '.green.bold, {});
var post_id = readline.question('— Введите ID поста для спама: '.green.bold, {});
var interval = readline.question('— Введите интервал (в миллисекундах)\nРекомендуемое значение: 150-250: '.green.bold, {});
var count = 0;

if (readline.keyInYNStrict('\nНачать работу бота?'.green.bold)) {
	console.log("Прогресс отображается в названии окна консоли.\nЗдесь отображается только информация об ошибках.\n".green.bold);
	var worker = setInterval(function () {
		tokens.forEach(function (token) {
			title(`VKComms Spammer ~ В работе ~ Комментариев отправлено: ${count} / Author: https://vk.com/id252847438`);
			var message = messages[Math.floor(Math.random() * messages.length)];
			request({
				headers: {
					'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1'
				},
				url: `https://api.vk.com/method/wall.createComment?owner_id=${user_id}&post_id=${post_id}&from_group=1&message=${encodeURI(message)}&v=5.95&access_token=${token}`,
				method: 'GET'
			}, function (err, res, body) {
				if (!err) {
					if (body.includes("response")) {
						count++;
						title(`VKComms Spammer ~ Сделано ${count} комментариев / Author: https://vk.com/id252847438`);
					} else {
						json = JSON.parse(body);
						console.log(`Ошибка: ${json.error.error_msg}`.red.bold);
					}
				} else {
					console.log(`Ошибка: ${err}`.red.bold);
				}
			});
		});
	}, interval);
} else {
	exit();
}

function exit() {
	process.exit(1);
}

