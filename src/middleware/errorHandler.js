export default (err, req, res, next) => {
    
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    if(req.app.get('env') === 'production' && err.status === 404) {
        res.render('404');
        return;
    }
    res.render('error');
}