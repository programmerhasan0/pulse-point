import { DateIndexCorrectorBlueprint } from '@definitions/utils';

export const correctDateIdex: DateIndexCorrectorBlueprint = (
    year,
    month,
    date
): Date => new Date(year, month - 1, date);
