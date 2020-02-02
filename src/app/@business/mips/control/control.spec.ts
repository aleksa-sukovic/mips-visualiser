import { Control } from './control';

fdescribe('Control Unit', () => {
    let control: Control = null;

    beforeAll(() => control = new Control());

    it('sets pc write', () => {
        control.pcWrite = '1';

        expect(control.pcWrite).toBe('1');
    });
});
