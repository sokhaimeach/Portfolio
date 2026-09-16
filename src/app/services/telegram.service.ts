import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private BOT_TOKEN: string = '8754051928:AAGQbsEEeOzNmxeoatRD5ezMP9rcvUwixpk';
  private CHAT_ID: string = '-1004290422336';
  private API_URL: string = `https://api.telegram.org/bot${this.BOT_TOKEN}/`;

  constructor(private http: HttpClient) {}

  sendMessage(message: string) {
    const payload = {
      chat_id: this.CHAT_ID,
      text: message
    };
    
    return this.http.post(this.API_URL + 'sendMessage', payload);
  }

}
