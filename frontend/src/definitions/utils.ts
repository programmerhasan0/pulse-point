export type DateIndexCorrectorBlueprint = (
    fullYear: number,
    month: number,
    date: number
) => Date;

export type GenderMapBlueprint = (gender: 'm' | 'f' | 't') => string;
