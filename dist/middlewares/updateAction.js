export const updateAction = (action) => {
    return (req, res, next) => {
        if (req.query.action === action) {
            next();
        }
        else {
            next('route');
        }
    };
};
