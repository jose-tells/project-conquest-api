import { Test, TestingModule } from '@nestjs/testing';
import { IllustrationsController } from './illustrations.controller';

describe('IllustrationsController', () => {
  let controller: IllustrationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IllustrationsController],
    }).compile();

    controller = module.get<IllustrationsController>(IllustrationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
