var http = require('http')
var fs = require('fs')
var body="";

http.createServer(function(req, res){
    req.on("data", (chunk) => {
        body += chunk.toString();
    });
    req.on('end', function () {
        if(req.url==='/'){
            // res.writeHead(200, {'content-type': "text/html"})
            var html = fs.readFileSync('home.html', 'utf8')	
            res.writeHead(200, {'content-type': "text/html","Trailer": "Content-MD5" })
            html = html.replace('{message}', "Home Page")
              res.write(html)
        }
        else if(req.url==='/login' && req.method==='GET'){
            // res.writeHead(200, {'content-type': "application/json"})
            var html = fs.readFileSync('login.html', 'utf8')
            res.writeHead(200, {'content-type': "text/html"})
            html = html.replace('{message}', "Login Page")
            res.write(html)
        }
        else if(req.url==='/login' && req.method==='POST'){
            var usersList = readFileAndConvertToJson();
            var loginobj = extractFormData();            
            var found = false;

            for (const element of usersList) {
                if(element.Name == loginobj.Name && element.Password == loginobj.Password){
                    found = true;
                    break;
                }
            }

            if(found){
                var html = fs.readFileSync('profile.html', 'utf8');
                html = html.replace("{UserName}",loginobj.Name);
                res.writeHead(200, {'content-type': "text/html"});
                res.write(html);
            }
            else{
                var html = fs.readFileSync('login.html', 'utf8');
                res.writeHead(400, {'content-type': "text/html"});
                html = html.replace("{message}","Wrong Data");
                res.write(html);    
            }
        }
        else if(req.url==='/register' && req.method==='GET' ){
            var html = fs.readFileSync('register.html', 'utf8')	
            res.writeHead(201, {'content-type': "text/html"})
            html = html.replace('{Message}', "Register Page")
            res.write(html)
        }
        else if(req.url==='/register' && req.method==='POST' ){
            var formdata = extractFormData();
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
                var html = fs.readFileSync('profile.html', 'utf8');
                html = html.replace("{UserName}",formdata.Name.replace('+'," "));
                res.writeHead(201, {'content-type': "text/html"});
                res.write(html);
            }
            else{
                var html = fs.readFileSync('register.html', 'utf8');
                html = html.replace("{Message}","The Email Alredy Taken Use Another One");
                res.writeHead(400, {'content-type': "text/html"});
                res.write(html);
            }

        }
        else if (req.url==='/profile' && req.method==='GET'){
            var html = fs.readFileSync('profile.html', 'utf8')	
            res.writeHead(201, {'content-type': "text/html"})
            html = html.replace('{message}', "Profile Page")
            res.write(html)
        }
        else{
            res.writeHead(404)
            res.write("PageNotFound")
        }
        res.end()
      });
}).listen(3000)

function readFileAndConvertToJson(){
    var Users = fs.readFileSync('UsersData.txt', 'utf8')
    
    UsersList = JSON.parse(Users) || [];
    return UsersList;
}
function extractFormData(){
    var formData = body.split('&');    
    let userObj = {};
    userObj = formData.reduce((prev, curr) => {
        const [key, value] = curr.split("=");
        prev[key] = value;
        return prev;
    }, userObj);
    return userObj;
}