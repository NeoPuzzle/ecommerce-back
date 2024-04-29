import { Test, TestingModule } from '@nestjs/testing';
import { OrderdetailsController } from './orderdetails.controller';

describe('OrderdetailsController', () => {
  let controller: OrderdetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderdetailsController],
    }).compile();

    controller = module.get<OrderdetailsController>(OrderdetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
