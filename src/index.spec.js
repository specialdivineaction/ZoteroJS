import { Greeter } from './index';
import { expect } from 'chai';

describe('greeter', () => {
  it('should say hello', () => {
    let greeter = new Greeter('World');
    expect(greeter.greet()).to.equal('Hello, World!');
  });
});
