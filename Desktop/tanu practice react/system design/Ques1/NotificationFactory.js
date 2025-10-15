
class Notification {
  send(message) {
    throw new Error("Method 'send()' must be implemented.");
  }
}



export class EmailNotification extends Notification {
  send(message) {
    console.log(`Sending EMAIL: ${message}`);
  }
}

export class SMSNotification extends Notification {
  send(message) {
    console.log(`Sending SMS: ${message}`);
  }
}

export class PushNotification extends Notification {
  send(message) {
    console.log(`Sending PUSH Notification: ${message}`);
  }
}



export class NotificationFactory {
  static createNotification(type) {
    switch (type) {
      case "Email":
        return new EmailNotification();
      case "SMS":
        return new SMSNotification();
      case "Push":
        return new PushNotification();
      default:
        throw new Error("Invalid notification type!");
    }
  }
}
