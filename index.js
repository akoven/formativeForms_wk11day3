const express = require("express");

const app = express();
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const csrfProtection = csrf({cookie: true});
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render('index', {users});
});

app.get('/create', csrfProtection, (req, res, next) => {
  res.render('create', {user: {}, errors: [], csrfToken: req.csrfToken()})
})




// const firstNameCheck = (req, res, next) =>{
//   const {firstName, lastName, email,password,confirmedPassword} = req.body;
//   if(!req.body.firstName){
//     req.errors.push('Please provide a first name.')
//   }
//   next();
// }

// const lastNameCheck = (req, res, next) =>{
//   const {firstName, lastName, email,password,confirmedPassword} = req.body;
//   if(req.body.lastName.length > 1){
//     next();
//   }else{
//     req.errors.push('Please provide a last name.')
//   }
// }

// const emailCheck = (req, res, next) =>{
//   const {firstName, lastName, email,password,confirmedPassword} = req.body;
//   if(req.body.email.length > 1){
//     next();
//   }else{
//     req.errors.push('Please provide an email.')
//   }
// }

// const passwordCheck = (req, res, next) =>{
//   const {firstName, lastName, email,password,confirmedPassword} = req.body;
//   if(req.body.password.length > 1){
//     next();
//   }else{
//     req.errors.push('Please provide a password.')
//   }
// }

// const passwordConfirmation = (req, res, next) =>{
//   const {firstName, lastName, email,password,confirmedPassword} = req.body;
//   if(req.body.password === req.body.confirmedPassword){
//     next();
//   }else{
//     req.errors.push('The provided values for the password and password confirmation fields did not match.')

//   }
// }

const validationMiddleware = (req, res, next) => {
	const { firstName, lastName, email, password, confirmedPassword } = req.body;
	const errors = [];

	if (!firstName) {
		errors.push('Please provide a first name.');
	}

	if (!lastName) {
		errors.push('Please provide a last name.');
	}

	if (!email) {
		errors.push('Please provide an email.');
	}

	if (!password) {
		errors.push('Please provide a password.');
	}

	if (password && password !== confirmedPassword) {
		errors.push('The provided values for the password and password confirmation fields did not match.');
	}

	req.errors = errors;
	next();
};


app.post('/create', validationMiddleware, csrfProtection, (req, res, next) => {
  const {firstName, lastName, email} =req.body

  if(req.errors.length > 0){
    res.render('create', {user: req.body, errors: req.errors, csrfToken: req.csrfToken()});
  }else{
    const user = {
      id: users.length+1,
      firstName,
      lastName,
      email
    }
    users.push(user);
    res.redirect('/');
  }
})

app.get('/create-interesting', csrfProtection, (req, res) => {
  res.render('create-interesting', {user: {}, errors: [], csrfToken: req.csrfToken()})
})


const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
