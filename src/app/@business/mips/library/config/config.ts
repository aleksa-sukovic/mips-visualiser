import { Clock } from '../../clock/clock';
import { NullClock } from '../../clock/Null/NullClock';
import Specification from '../specification';

export default class Config
{
    public static ELEMENT_TEXT  = 'element_text';
    public static ELEMENT_ARROW = 'element_arrow';
    public static ELEMENT_PATH  = 'element_path';
    public static ELEMENT_LABEL = 'element_label';
    public static ELEMENT_COMPONENT = 'element_component';

    protected static _config: any = Object.assign({}, Specification);

    public static get (): any
    {
        return Config._config;
    }

    public static clockConfig (clock: Clock)
    {
        return Config.get().clocks.find(it => it.id === clock.id()) || Config.clockConfig(new NullClock());
    }

    public static elementTooltip (element, clock: Clock = null)
    {
        if (!clock) {
            return Config.get().global_tooltips.find(it => it.ids.find(id => id == element.id));
        }

        return Config.clockConfig(clock).tooltips.find(it => it.ids.find(id => id == element.id));
    }

    public static elementType (element)
    {
        if (Config.get().visual.nodes.labels.find(it => it == element.id)) {
            return Config.ELEMENT_LABEL;
        } else if (Config.get().visual.nodes.components.find(it => it == element.id)) {
            return Config.ELEMENT_COMPONENT;
        } else if (Config.get().visual.nodes.text.find(it => it == element.id)) {
            return Config.ELEMENT_TEXT;
        } else if (Config.get().visual.nodes.arrows.find(it => it == element.id)) {
            return Config.ELEMENT_ARROW;
        } else if (element.tagName === 'path') {
            return Config.ELEMENT_PATH;
        }
    }
}
