import { describe, it, expect } from 'vitest';
import dayjs from './dayjs.js';

describe('dayjs', () => {
    it('should return number of seconds if amount of passed time from now is less than a minute', () => {
        const NOW = dayjs();

        expect(dayjs(NOW - 2000).fromNow()).toBe('2 seconds ago');
        expect(dayjs(NOW - 4000).fromNow()).toBe('4 seconds ago');
    });
});
