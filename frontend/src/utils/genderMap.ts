import { GenderMapBlueprint } from '@definitions/utils';

export const genderMap: GenderMapBlueprint = (
    gender: 'm' | 'f' | 't'
): string => {
    const genders = {
        m: 'Male',
        f: 'Female',
        t: 'Third Gender',
    };
    return genders[gender];
};
