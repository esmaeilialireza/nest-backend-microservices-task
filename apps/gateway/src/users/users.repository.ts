import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { UserDocument } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
  protected logger = new Logger(UsersRepository.name);

  constructor(@InjectModel(UserDocument.name) useModel: Model<UserDocument>) {
    super(useModel);
  }

  async saveAvatar(userId: number, base64: string) {
    const user = await this.model.findOne({ id: userId });

    if (user) {
      await user.updateOne({
        avatar: base64,
      });
    }

    await user.save();

    return user;
  }
}
