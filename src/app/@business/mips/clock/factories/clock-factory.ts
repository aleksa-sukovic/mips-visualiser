import { Clock1 } from '../1/clock-1';
import { Clock } from '../clock';
import { Clock2 } from '../2/clock-2';
import { Clock3 } from '../3/clock-3';
import { Clock4 } from '../4/clock-4';
import { Clock5 } from '../5/clock-5';
import { Clock7 } from '../7/clock-7';
import { Clock6 } from '../6/clock-6';
import { Clock8 } from '../8/clock-8';
import { Clock9 } from '../9/clock-9';
import { Clock10 } from '../10/clock-10';
import Config from '../../library/config/config';

export class ClockFactory
{
    public static fromId (id: string): Clock
    {
        switch (id) {
            case 'clock_1':
                return new Clock1(Config.get().word_length);
            case 'clock_2':
                return new Clock2(Config.get().word_length);
            case 'clock_3':
                return new Clock3(Config.get().word_length);
            case 'clock_4':
                return new Clock4();
            case 'clock_5':
                return new Clock5();
            case 'clock_6':
                return new Clock6();
            case 'clock_7':
                return new Clock7();
            case 'clock_8':
                return new Clock8();
            case 'clock_9':
                return new Clock9();
            case 'clock_10':
                return new Clock10();
        }
    }
}
