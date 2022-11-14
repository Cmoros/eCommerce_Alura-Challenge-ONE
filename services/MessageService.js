import Http from "../clients/Http.js";
import config from "/config.js";

export default class MessageService {
  static URL = `${location.protocol}//${location.hostname}:${config.PORT_DB}/message/`;

  static http = new Http(this.URL);

  static getMessage(id) {
    return MessageService.http.get(id);
  }

  static getAllMessages() {
    return MessageService.http.get();
  }

  static getManyMessages(urlSearchParams) {
    return MessageService.http.get(urlSearchParams);
  }

  static createMessage(data) {
    return MessageService.http.post(data);
  }

  static updateMessage(id, data) {
    return MessageService.http.put(id, data);
  }

  static deleteMessage(id) {
    return MessageService.http.delete(id);
  }
}