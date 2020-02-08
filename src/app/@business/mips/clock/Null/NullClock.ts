import { Clock } from '../clock';
import { CPU } from '../../cpu/cpu';

export class NullClock implements Clock
{
    public execute (cpu: CPU): void
    {
        //
    }

    public id (): string
    {
        return 'null_clock';
    }

}
