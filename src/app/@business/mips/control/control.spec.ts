import { Control } from './control';

fdescribe('Control Unit', () => {
    let control: Control = null;

    beforeAll(() => control = new Control());

    it('sets pc write', () => {
        control.pcWrite = '1';

        expect(control.pcWrite).toBe('1');
    });

    it('sets pc write cond', () => {
        control.pcWriteCond = '0';

        expect(control.pcWriteCond).toBe('0');
    });

    it('sets lorD', () => {
        control.lorD = '1';

        expect(control.lorD).toBe('1');
    });

    it('sets memRead and memWrite', () => {
        control.memRead = '1';
        control.memWrite = '0';

        expect(control.memRead).toBe('1');
        expect(control.memWrite).toBe('0');
    });

    it('sets irRegister', () => {
        control.irRegister = '1';

        expect(control.irRegister).toBe('1');
    });

    it('sets memToReg', () => {
        control.memToReg = '1';

        expect(control.memToReg).toBe('1');
    });
});
