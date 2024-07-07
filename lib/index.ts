import { CronJob } from 'cron';
import { OlxFlatService, TgBot } from './services';
import * as logger from './services/logger.service';
import { saveFlat } from './db';

require('dotenv').config();

const tgBot = new TgBot();
const olxService = new OlxFlatService();

const sendFlats = async () => {
  const flats = await olxService.getOlxListApartments();
  saveFlat(flats);
};

new CronJob(
  '*/1 * * * *', // every 5 minutes
  sendFlats,
  null,
  true
);

tgBot.tgbot.on('message', (msg) => {
  const chatId = msg.chat.id;

  tgBot.saveChatId(chatId);

  if (!!msg.text?.match('/findflats')) {
    sendFlats();
  }
});
