import { hashSync } from 'bcrypt';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { ConfigService } from '../../config/config.service';
import { Users } from './users.entity';

@EventSubscriber()
export class AdminSubscriber extends ConfigService
  implements EntitySubscriberInterface<any> {
  listenTo() {
    return Users;
  }

  beforeInsert(event: InsertEvent<Users>): Promise<any> | void {
    if (event.entity) {
      event.entity.password = this.hashPassword(event.entity.password);
    }
  }

  beforeUpdate(event: UpdateEvent<Users>): Promise<any> | void {
    if (event.entity) {
      event.entity.password = this.hashPassword(event.entity.password);
    }
  }

  hashPassword(password: string) {
    return hashSync(password, this.getSetting('SALT_ROUND'));
  }
}
