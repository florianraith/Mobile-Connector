module.exports = (req, res, next) => {

    if('mobile' in req.query) {
        req.session.isMobile = req.query.mobile;        
    }

    if('isMobile' in req.body) {
        req.session.isMobile = req.body.isMobile;
    }

    next();
};