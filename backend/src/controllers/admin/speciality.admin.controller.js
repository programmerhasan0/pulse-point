import Speciality from '../../models/speciality.model.js';
import ApiResponse from '../../utils/ApiResponse.util.js';

export const getSpecialities = async (req, res) => {
    if (req.user?.role === 'admin' || req.user?.role === 'staff') {
        const specilities = await Speciality.find();
        if (specilities.length > 0) {
            return new ApiResponse(res).success(
                200,
                'ok',
                'data found',
                specilities
            );
        } else {
            return new ApiResponse(res).error(
                404,
                'not found',
                'Speciality data is not available.'
            );
        }
    } else {
        return new ApiResponse(res).unauthorized();
    }
};

export const postAddSpeciality = async (req, res) => {
    if (req.user?.role === 'admin') {
        try {
            const { title, slug, department } = req?.body;

            if (!(title && slug && department)) {
                return new ApiResponse(res).badRequest();
            }

            const speciality = new Speciality({
                title,
                slug,
                department,
                isActive: true,
            });

            const saveSpeciality = await speciality.save();

            if (saveSpeciality._id) {
                return new ApiResponse(res).success(
                    200,
                    'ok',
                    'Speciality created'
                );
            }
            return new ApiResponse(res).error();
        } catch (err) {
            if (err.code === 11000 && err.keyPattern?.slug) {
                return new ApiResponse(res).error(
                    401,
                    'exists',
                    'Slug Already Exists'
                );
            }
            return new ApiResponse(res).error();
        }
    } else {
        return new ApiResponse(res).unauthorized();
    }
};

export const postChangeActiveStatus = async (req, res) => {
    if (req.user?.role === 'admin') {
        const { _id, active } = req?.body;

        if (!_id || active === undefined) {
            return new ApiResponse(res).badRequest();
        }

        const updateSpeciality = await Speciality.findByIdAndUpdate(
            _id,
            { isActive: active },
            { new: true }
        );

        if (updateSpeciality.title) {
            return new ApiResponse(res).success(
                200,
                'ok',
                'Speciality status updated'
            );
        }

        return new ApiResponse(res).error();
    } else {
        return new ApiResponse(res).unauthorized();
    }
};

export const patchEditSpeciality = async (req, res) => {
    if (req.user?.role === 'admin') {
        const { _id, title, slug, department } = req?.body;

        if (!(_id && title && slug && department)) {
            return new ApiResponse(res).badRequest();
        }

        const updatedSpeciality = await Speciality.findByIdAndUpdate(
            _id,
            { title, slug, department },
            { new: true }
        );

        if (updatedSpeciality.title) {
            return new ApiResponse(res).success(200, 'ok', 'Spciality Updated');
        }

        return new ApiResponse(res).error();
    } else {
        return new ApiResponse(res).unauthorized();
    }
};
