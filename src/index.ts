import { Contact, Message, ScanStatus, WechatyBuilder, log } from 'wechaty'
import qrcodeTerminal from 'qrcode-terminal'

function onScan(qrcode: string, status: ScanStatus) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    const qrcodeImageUrl = [
      "https://wechaty.js.org/qrcode/",
      encodeURIComponent(qrcode)
    ].join('')

    log.info('StartBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)

    qrcodeTerminal.generate(qrcode, { small: true })
  } else {
    log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
  }
}

function onLogin (user: Contact) {
  log.info('StarterBot', '%s login', user)
}

function onLogout (user: Contact) {
  log.info('StarterBot', '%s logout', user)
}

async function onMessage (msg: Message) {
  log.info('whaley -- onMessage:', msg.toString())
  const talker = msg.talker()
  log.info('whaley -- name:', talker.payload?.name ?? 'Null Name')
  log.info('whaley -- type:', msg.payload?.type ?? 'Null type')
  log.info('whaley -- text:', msg.payload?.text ?? 'Null text')
  
  if (talker.payload?.name == '阿金呐🐳' && msg.payload?.text == '宝贝') {
    talker.say('宝贝，我也想你了！爱你 ❤️')
  }
}

const bot = WechatyBuilder.build({
    puppet: 'wechaty-puppet-padlocal',
    puppetOptions: {
        token: '0f87d3113ee044cb9be58e0307eb18d6'
    }
})
bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('logout', onLogout)
bot.on('message', onMessage)
bot.start()
  .then(() => log.info('StarterBot', 'Starter Bot Started.'))
  .catch(e => log.error('StarterBot', e))