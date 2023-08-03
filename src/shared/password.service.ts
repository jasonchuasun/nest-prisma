import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly salt = 10;

  async hashPassword(password: string): Promise<string> {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  comparePasswordAndPasswordConfirmation(password: string, password_confirm: string): void {
    if (password !== password_confirm) {
      throw new BadRequestException('Password and password confirmation do not match')
    }
  }
}
