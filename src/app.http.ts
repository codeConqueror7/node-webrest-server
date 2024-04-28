import { readFileSync } from 'fs'
import http from 'http'

const server = http.createServer((req, res) => {

    console.log(req.url)

    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write('<h1>Hola Mundo!</h1>');
    // res.end();
    // const data = { name: 'John doe', age: 30, city: 'New york' };
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify(data))

    if (req.url === '/') {

        const htmlFile = readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    }

    if (req.url?.endsWith('.js')) {

        res.writeHead(200, { 'Content-Type': 'application/javascript' });
    } else if (req.url?.endsWith('.css')) {

        res.writeHead(200, { 'Content-Type': 'text/css' })
    }

    const responseContent = readFileSync(`./public${req.url}`, 'utf-8');
    res.end(responseContent);

    // else if (req.url === '/css/styles.css') {

    //     const cssFile = readFileSync('./public/css/styles.css', 'utf-8');
    //     res.writeHead(200, { 'Content-Type': 'text/css' });
    //     res.end(cssFile)
    // } else if (req.url === '/js/app.js') {

    //     const jsFile = readFileSync('./public/js/app.js', 'utf-8');
    //     res.writeHead(200, { 'Content-Type': 'application/javascript' });
    //     res.end(jsFile)
    // }
    // else {

    //     res.writeHead(404, { 'Content-Type': 'text/html' })
    //     res.end()
    // }
})

server.listen('8080', () => {

    console.log('Server running on port 8080')
})