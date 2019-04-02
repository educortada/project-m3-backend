exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    const err = new Error('Unauthorized');
    err.status = 401;
    err.statusMessage = 'Unauthorized';
    next(err);
  }
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) {
    next();
  } else {
    const err = new Error('Forbidden');
    err.status = 403;
    err.statusMessage = 'Forbidden';
    next(err);
  }
};

exports.validationLoggin = () => (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({
      error: true,
      code: 'Error! check all empty fields',
    });
  } else {
    next();
  }
}

exports.validationSignup = () => (req, res, next) => {
  const { username, password, email } = req.body;
  
  if (!username || !password || !email) {
    return res.status(422).json({
      error: true,
      code: 'Error! check all empty fields',
    });
  } else {
    next();
  }
}