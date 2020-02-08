import { CPU } from '../cpu/cpu';

export interface Clock
{
    execute (cpu: CPU): void;
    id (): string;
}
