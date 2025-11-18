export type DateIndexCorrectorBlueprint = (
    fullYear: number,
    month: number,
    date: number
) => Date;

export type GenderMapBlueprint = (gender: 'm' | 'f' | 't') => string;

export type Speciality = {
    _id: string;
    title: string;
    slug: string;
    department: string;
    isActive: boolean;
};
