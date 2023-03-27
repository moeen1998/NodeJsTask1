// // //
var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('home');
});
app.get('/login',(req,res)=>{
	res.render('login');
});
app.post('/login',(req,res)=>{
	var usersList = readFileAndConvertToJson();
	var loginobj = JSON.parse(JSON.stringify(req.body));  
	var found = false;

	for (const element of usersList) {
		if(element.Email == loginobj.Email && element.Password == loginobj.Password){
			found = true;
			loginobj = element;
			break;
		}
	}

	if(found){
		console.log("Found");
		res.render('profile', { logged : true , UserName: loginobj.Name });
	}
	else{
		console.log("Not Found");

		res.render('login');
	}
});
app.get('/register', (req,res)=>{
	res.render('register', { ID: 7, Qstr: 5 });
});
app.post('/register',(req,res)=>{
	var formdata = JSON.parse(JSON.stringify(req.body));
	var usersList = readFileAndConvertToJson();

	var isvalid = true;
	for (const user of usersList) {
		if(user.Email == formdata.Email){
			isvalid = false;
		}
	}
	if(isvalid){
		usersList.push(formdata);
		fs.writeFile('UsersData.txt', JSON.stringify(usersList), function (err) {
			if (err) throw err;
		});
		res.render('profile', { logged : true , UserName: formdata.Name });
	}
	else{
		res.render('register', { msg: formdata.Email });
	}
});
app.get('/profile', (req,res)=>{
	res.render('profile', { logged : false });
});
function readFileAndConvertToJson(){
    var Users = fs.readFileSync('UsersData.txt', 'utf8')
    UsersList = JSON.parse(Users) || [];
    return UsersList;
}

app.listen(3000);

