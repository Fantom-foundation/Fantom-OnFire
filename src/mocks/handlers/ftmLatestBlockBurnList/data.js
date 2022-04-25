import { getFakeData } from '@/utils/data-faker-tmp.js';
import { appConfig } from '@/app.config.js';
import { randIntRange } from '@/utils/number.js';

let blockNumber = 36608542;
let len = 20;

function getFakeDataDefinition(blockNumber = 36608542, timestamp = '2022-04-21 7:43', staticData = false) {
    const definition = {
        blockNumber: {
            type: 'int',
            toHex: true,
            decrease: true,
            step: 1,
            initialValue: blockNumber,
        },
        timestamp: {
            type: 'timestamp',
            toHex: true,
            decrease: true,
            step: [1, 4],
            initialValue: timestamp,
        },
        amount: {
            type: 'float',
            // type: 'int',
            // between: [1000000, 2000000],
            between: [0.03, 0.1],
            toHex: true,
            decimals: 18,
        },
        __typename: 'FtmBlockBurn',
    };

    if (staticData) {
        definition.timestamp.step = 1;

        definition.amount.initialValue = 0.03;
        delete definition.amount.between;
    }

    return definition;
}

export function data() {
    if (appConfig.env.mockingEnabled) {
        const data = {
            ftmLatestBlockBurnList: getFakeData(getFakeDataDefinition(blockNumber, Date.now()), len),
        };

        len = randIntRange(1, 4);
        blockNumber += len;

        return data;
    }

    return {
        ftmLatestBlockBurnList: getFakeData(getFakeDataDefinition(36608542, '2022-04-21 7:43', true), 20),
    };
}

export function data2() {
    return {
        ftmLatestBlockBurnList: getFakeData(getFakeDataDefinition(36608562, '2022-04-21 7:46', true)),
    };
}
