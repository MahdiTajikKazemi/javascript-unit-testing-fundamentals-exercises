import { vi, it, expect, describe } from 'vitest';
import { getShippingInfo, submitOrder, getDiscount} from '../src/mocking';

import { getShippingQuote } from '../src/libs/shipping';
import { charge } from '../src/libs/payment';

vi.mock('../src/libs/shipping');
vi.mock('../src/libs/payment');


describe('test suite', () => {
    it('test case', () => {
      // Create a mock for the following function
      const sendText = vi.fn();
      sendText.mockReturnValue('ok');
  
      // Call the mock function
      const result = sendText('message');
  
      // Assert that the mock function is called
      expect(sendText).toHaveBeenCalledWith('message');
      // Assert that the result is 'ok'
      expect(result).toBe('ok');
    });
  });

  describe('getShippingInfo', () => {
    it('should return shipping unavailable if quote cannot be fetched', () => {
      vi.mocked(getShippingQuote).mockReturnValue(null);
  
      const result = getShippingInfo('London');
  
      expect(result).toMatch(/unavailable/i);
    });
  
    it('should return shipping info if quote can be fetched', () => {
      vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 });
  
      const result = getShippingInfo('London');
  
      expect(result).toMatch('$10');
      expect(result).toMatch(/2 days/i);
      expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i);
    });
  });

  describe('submitOrder', () => {
    const order = { totalAmount: 10 };
    const creditCard = { creditCardNumber: '1234' };
  
    it('should charge the customer', async () => {
      vi.mocked(charge).mockResolvedValue({ status: 'success' });
  
      await submitOrder(order, creditCard);
  
      expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
    });
  
    it('should return success when payment is successful', async () => {
      vi.mocked(charge).mockResolvedValue({ status: 'success' });
  
      const result = await submitOrder(order, creditCard);
  
      expect(result).toEqual({ success: true });
    });
  
    it('should return success when payment is successful', async () => {
      vi.mocked(charge).mockResolvedValue({ status: 'failed' });
  
      const result = await submitOrder(order, creditCard);
  
      expect(result).toEqual({ success: false, error: 'payment_error' });
    });
  });

  describe('getDiscount', () => {
    it('should return .2 on Christmas day', () => {
      vi.setSystemTime('2024-12-25 00:01');
      expect(getDiscount()).toBe(0.2);
  
      vi.setSystemTime('2024-12-25 23:59');
      expect(getDiscount()).toBe(0.2);
    });
  
    it('should return 0 on any other day', () => {
      vi.setSystemTime('2024-12-24 00:01');
      expect(getDiscount()).toBe(0);
  
      vi.setSystemTime('2024-12-26 00:01');
      expect(getDiscount()).toBe(0);
    });
  });
  