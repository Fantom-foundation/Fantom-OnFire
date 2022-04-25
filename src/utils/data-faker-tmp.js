import { randIntRange, randNumberRange } from '@/utils/number.js';
import { bToTokenValue, toHex } from '@/utils/big-number.js';

function getFakeNumber(definition, def) {
    let value = def.__prv__.value;
    let step = def.__prv__.step;

    if (Array.isArray(step)) {
        step = randIntRange(step[0], step[1]);
    }

    if (definition.between) {
        value = randNumberRange(definition.between[0], definition.between[1], definition.type === 'int');
    } else if (definition.decrease) {
        value -= step;
        def.__prv__.value = value;
    } else {
        value += step;
        def.__prv__.value = value;
    }

    if (definition.decimals) {
        value = bToTokenValue(value, definition.decimals);
    }

    if (definition.toHex) {
        value = toHex(value);
    }

    return value;
}

export function getFakeData(definition = {}, len = 5) {
    const itemsDef = definition;
    const keys = Object.keys(itemsDef);
    const defs = [];
    const data = [];
    let item = {};

    keys.forEach((key) => {
        const item = itemsDef[key];
        const def = {
            name: key,
            value: null,
            __prv__: {},
        };

        if (typeof item === 'object') {
            def.__prv__.value = 'initialValue' in item ? item.initialValue : undefined;
            def.__prv__.step = item.step || 1;

            if (item.type === 'timestamp') {
                item.type = 'int';
                if (item.initialValue) {
                    def.__prv__.value = new Date(item.initialValue).valueOf() / 1000;
                }
            }

            if (item.type === 'int' || item.type === 'float') {
                if (def.__prv__.value === undefined) {
                    def.__prv__.value = 0;
                }

                def.value = getFakeNumber;
            }
        } else {
            def.value = item;
        }

        defs.push(def);
    });

    for (let i = 0; i < len; i++) {
        item = {};

        defs.forEach((def) => {
            const value = def.value;

            item[def.name] = typeof value === 'function' ? value(itemsDef[def.name], def, i) : value;
        });

        data.push(item);
    }

    return data;
}
