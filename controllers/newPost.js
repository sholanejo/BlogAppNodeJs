module.exports = (req, res) => {
    if (req.session.userId) {
        res.render('create')
    }
    res.redirect('/auth/login')

}