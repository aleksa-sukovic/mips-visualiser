import { Clock } from '../../clock/clock';
import { NullClock } from '../../clock/Null/NullClock';
import Specification from '../specification';

export default class Config
{
    public static ELEMENT_TEXT = 'element_text';
    public static ELEMENT_ARROW = 'element_arrow';
    public static ELEMENT_PATH = 'element_path';

    protected static _config: any = Specification;

    public static get ()
    {
        return this._config;
    }

    public static elementTooltip (element, clock: Clock = null)
    {
        if (!clock) {
            return Config._config.global_tooltips.find(it => it.ids.find(id => id == element.id));
        }

        return Config.findClockConfig(clock).tooltips.find(it => it.ids.find(id => id == element.id));
    }

    public static findClockConfig (clock: Clock)
    {
        return this._config.clocks.find(it => it.id === clock.id()) || Config.findClockConfig(new NullClock());
    }

    public static elementType (element)
    {
        if (this._config.visual.nodes.text.find(it => it == element.id)) {
            return Config.ELEMENT_TEXT;
        } else if (this._config.visual.nodes.arrows.find(it => it == element.id)) {
            return Config.ELEMENT_ARROW;
        } else if (element.tagName === 'path') {
            return Config.ELEMENT_PATH;
        }
    }
}
