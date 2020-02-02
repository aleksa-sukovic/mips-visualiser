import { Memory } from './memory';

describe('Memory', () => {
    let memory: Memory = null;

    beforeAll(() => memory = new Memory());

    it('Sets data to memory address', () => {
        memory.set('123', 10);

        expect(memory.get('123')).toBe(10);
    });
});
