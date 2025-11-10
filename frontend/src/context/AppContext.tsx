import { doctors, specialityData } from '@assets/assets_frontend/assets';
import { AppContext } from '@context/contexts';
import { AppContextValue } from '@definitions/context';

type Props = {
    children: React.ReactNode;
};

const AppContextProvider: React.FC<Props> = ({ children }) => {
    const currencySymbol: string = '$';
    const value: AppContextValue = {
        doctors,
        specialityData,
        currencySymbol,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
