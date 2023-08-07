import { PasswordService } from '../shared/password.service';
import { PrismaService } from '../shared/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let prismaService: PrismaService;
  let passwordService: PasswordService;

  beforeEach(() => {
    authService = new AuthService(prismaService),
    authController = new AuthController(authService, passwordService)
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const userId = 1;
      const user = { id: userId }; 
      
      jest.spyOn(authController['authService'], 'findOne').mockResolvedValue(user);

      const result = await authController.findOne(userId);
      
      expect(result).toBe(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = 9999;

      jest.spyOn(authController['authService'], 'findOne').mockResolvedValue(null);

      try {
        await authController.findOne(userId);
      } catch (error) {
        expect(error.response.message).toBe('User not found!');
      }
    });
  });
});
