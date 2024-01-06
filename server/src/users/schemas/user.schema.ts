import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({
    default:
      'https://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg',
  })
  photo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
