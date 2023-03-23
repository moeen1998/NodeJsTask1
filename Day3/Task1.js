var http = require('http')
var fs = require('fs')

http.createServer(function(req, res){
    var html = fs.readFileSync('index.html', 'utf8')	
    var Style = fs.readFileSync('Style.css', 'utf8')
	
	if(req.url==='/'){
		// res.writeHead(200, {'content-type': "text/html"})
		res.writeHead(200, {'content-type': "text/html","Trailer": "Content-MD5" })
        html = html.replace('{message}', "Home Page")
        res.sendFile(Style)
  		res.write(html)
	}
	else if(req.url==='/login' && req.method==='GET'){
		// res.writeHead(200, {'content-type': "application/json"})
		res.writeHead(200, {'content-type': "text/html"})
        html = html.replace('{message}', "Login Page")
        res.write(html)
	}
    else if(req.url==='/login' && req.method==='POST'){
		res.writeHead(200, {'content-type': "text/html"})
        html = html.replace('{message}', "Login Page Post")
        res.write(html)
	}
    else if(req.url==='/register' && req.method==='GET' ){
        res.writeHead(201, {'content-type': "text/html"})
        html = html.replace('{message}', "Register Page")
        res.write(html)
    }
	else if(req.url==='/register' && req.method==='POST' ){
		res.writeHead(201, {'content-type': "text/html"})
        html = html.replace('{message}', "Register Page Post")
        res.write(html)
	}
	else if (req.url==='/profile' && req.method==='GET'){
		res.writeHead(201, {'content-type': "text/html"})
        html = html.replace('{message}', "Profile Page")
        res.write(html)
	}
	else if (req.url==='/profile' && req.method==='POST'){
        res.writeHead(200, {'content-type': "text/html"})
        html = html.replace('{message}', "Profile Page Post")
        res.write(html)
    }
	else{
        res.writeHead(404)
        html = html.replace('{message}', "Not Found")
        res.write(html)
	}
    res.end()

}).listen(3000)
