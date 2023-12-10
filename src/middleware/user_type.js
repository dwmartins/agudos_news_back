exports.checkUserType = (req, res, next) => {
    const { user_type } = req.query;

    if(user_type === 'admin') {
        next();
    } else {
        const response = {notPermission: `Você não tem permissão para executar essa ação.`};
        res.status(200).json(response);
    }
}
