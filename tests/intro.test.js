import { describe, it, expect } from 'vitest';
import { calculateAverage, factorial, fizzBuzz, max } from '../src/intro';

describe('fizzBuzz', () => {
    it('should return FizzBuzz if arg is divisible by 3 and 5', () => {
      expect(fizzBuzz(15)).toBe('FizzBuzz');
    });
  
    it('should return Fizz if arg is only divisible by 3', () => {
      expect(fizzBuzz(3)).toBe('Fizz');
    });
  
    it('should return Buzz if arg is only divisible by 5', () => {
      expect(fizzBuzz(5)).toBe('Buzz');
    });
  
    it('should return arg as a string if it is not divisible by 3 or 5', () => {
      expect(fizzBuzz(1)).toBe('1');
    });
  });

  describe('factorial', () => {
    it('should return 1 if given 0', () => {
      expect(factorial(0)).toBe(1);
    });
  
    it('should return 1 if given 1', () => {
      expect(factorial(1)).toBe(1);
    });
  
    it('should return 2 if given 2', () => {
      expect(factorial(2)).toBe(2);
    });
  
    it('should return 6 if given 3', () => {
      expect(factorial(3)).toBe(6);
    });
  
    it('should return 24 if given 4', () => {
      expect(factorial(4)).toBe(24);
    });
  
    it('should return undefined if given a negative number', () => {
      expect(factorial(-1)).toBeUndefined();
    });
  });