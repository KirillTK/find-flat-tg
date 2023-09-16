import { CronJob } from 'cron';
import { OlxFlatService, UniqFlatsService, TgBot } from './services';

require('dotenv').config();

const tgBot = new TgBot();
const uniqFlatService = new UniqFlatsService();
const olxService = new OlxFlatService();

const sendFlats = async () => {
  const flats = await olxService.getOlxListApartments();
  const uniqFlats = uniqFlatService.getUniqApartments(flats);

  console.log('====================');
  console.log('uniqFlats', uniqFlats);
  console.log('COUNT', uniqFlats.length);
  console.log('====================');

  if (uniqFlats.length) {
    tgBot.sendNewApartments(uniqFlats);
  }
};

new CronJob(
  '*/5 * * * *', // every 5 minutes
  sendFlats,
  null,
  true
);

tgBot.tgbot.on('message', (msg) => {
  const chatId = msg.chat.id;

  tgBot.saveChatId(chatId);

  if (!!msg.text?.match('/findflats')) {
    uniqFlatService.reset();

    sendFlats();
  }
});
