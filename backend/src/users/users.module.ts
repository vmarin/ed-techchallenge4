import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { UsersService } from './services/users.service';
import { UsersMongooseRepository } from './repositories/mongoose/users.mongoose.repository';
import { UsersRepository } from './repositories/users.repository';
import { AuthUsersService } from './services/auth-users.service';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useClass: UsersMongooseRepository,
    },
    AuthUsersService,
  ],
  exports: [UsersService, AuthUsersService],
})
export class UsersModule {}
