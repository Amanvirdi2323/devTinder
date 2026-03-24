const auth = (req, res,next) => {
    if(!req.headers.token)  {
       // return res.send("unauthorized");
         return res.status(401).send("Unauthorized");
    } else {
        next();
};
}
    

module.exports = {auth};