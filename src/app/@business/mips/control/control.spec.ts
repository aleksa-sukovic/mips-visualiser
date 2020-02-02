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
});
