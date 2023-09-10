import TelegramBot from 'node-telegram-bot-api';

import { Apartment } from '../types';

export class TgBot {
  token = process.env.TG_TOKEN || '';

  chats: number[] = [];

  tgbot: TelegramBot = new TelegramBot(this.token, {
    polling: true,
  });

  saveChatId(id: number) {    
    if (this.chats.indexOf(id) === -1) {
      this.chats.push(id);
    }
  }

  sendNewApartments(apartments: Apartment[]) {
    this.chats.forEach((chatId) => {
      apartments.forEach((apartment) => {
        this.tgbot.sendPhoto(chatId, apartment.previewUrl, {
          caption: `
${apartment.location}
Price: ${apartment.price} ${apartment.czynsz ? 'Czynsz ' + apartment.czynsz : ''}
Meters: ${apartment.meters}
Rooms: ${apartment.rooms || 'uknown'}
Create date: ${apartment.createdAt}
Valid date: ${apartment.validUntil}
        `.trim(),
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Open link', url: apartment.urlToApartment }],
            ],
          },
        });
      });
    });
  }
}
