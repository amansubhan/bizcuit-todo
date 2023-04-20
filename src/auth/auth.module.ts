import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'SuperSecret',
      signOptions: { expiresIn: '600s' },
    }),
    UserModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
