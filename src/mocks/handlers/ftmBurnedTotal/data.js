import { appConfig } from '@/app.config.js';
import { randIntRange } from '@/utils/number.js';
import { bToTokenValue, toHex } from '@/utils/big-number.js';

let _ftmBurnedTotal = 1502539;

export function data() {
    let ftmBurnedTotal = _ftmBurnedTotal;

    if (appConfig.env.mockingEnabled) {
        _ftmBurnedTotal += randIntRange(1, 5);
    }

    return {
        ftmBurnedTotal: toHex(bToTokenValue(ftmBurnedTotal, 18)),
    };
}
