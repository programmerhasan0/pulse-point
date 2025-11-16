import { RegisterLoginFormInput } from '@definitions/Forms';
import { FieldErrors } from 'react-hook-form';

type PropTypes = {
    name: keyof RegisterLoginFormInput;
    errors: FieldErrors<RegisterLoginFormInput>;
};

const FormErrorMessage: React.FC<PropTypes> = ({ name, errors }) => {
    return errors[name] ? (
        <p className="text-red-500 font-light">{errors[name]?.message}</p>
    ) : null;
};

export default FormErrorMessage;
