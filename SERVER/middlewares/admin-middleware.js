const isAdmin = (req, res, next) => {
    const { user } = req;

    if (!user || !user.isAdmin) {

      return res.status(403).json({ message: 'Access denied. You do not have admin privileges.' });
    }
  
    next();
  };
  
  module.exports = { isAdmin };