
'use strict'

const slack = require('slack')
const _ = require('lodash')
const config = require('./config')

let bot = slack.rtm.client()

var text = `beep boop: I hear you loud and clear! I am still learning to say more words XD`
var bot_name = `mikhail`
var hello = `hello.`

bot.started((payload) => {
  this.self = payload.self
})

bot.message((msg) => {
  if (!msg.user) return
  if (!_.includes(msg.text.match(/<@([A-Z0-9])+>/igm), `<@${this.self.id}>`)) return
  if (msg.text = "hello") text = hello + msg.text.user.username + `. I am ` + bot_name


  slack.chat.postMessage({
    token: config('SLACK_TOKEN'),
    icon_emoji: config('ICON_EMOJI'),
    channel: msg.channel,
    username: 'Starbot',
    text: text
  }, (err, data) => {
    if (err) throw err

    let txt = _.truncate(data.message.text)

    console.log(`🤖  beep boop: I responded with "${txt}"`)
  })
})

module.exports = bot
