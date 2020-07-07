const jsonServer = require('json-server');
const server = jsonServer.create();
const middleWares = jsonServer.defaults();
const port = 8000;
const generateData = require('./dataGenerator');
const { uuid } = require('uuidv4');

let dynamicData = generateData;

server.use(jsonServer.bodyParser);
server.use(middleWares);

server.get('/posts', (req, res) => {
    if (req.method === 'GET') {
        let result = dynamicData.posts;
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'not found' });
        }
    }
});

server.get('/user', (req, res) => {
    if (req.method === 'GET') {
        let result = dynamicData.user;
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'not found' });
        }
    }
});

server.get('/post/:id', (req, res) => {
    if (req.method === 'GET') {
        let result = dynamicData.posts.find(el => String(el.id) === String(req.params.id) );
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'not found' });
        }
    }
});

server.post('/posts', (req, res) => {
    if (req.method === 'POST') {
        if (req.body) {
            const newPost = {
                ...req.body.data,
                id: uuid(),
                likes: 0,
                created_at: new Date(),
                comments: [],
                image: "https://images.unsplash.com/photo-1557428894-56bcc97113fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80"
            };

            dynamicData.posts.push(newPost);
            res.status(200).json(newPost);
        } else {
            res.status(400).json({ error: 'bad request' });
        }
    }
});


server.get('/post/:id/like', async (req, res) => {
    if (req.method === 'GET') {
        let finded = dynamicData.posts.find(el => String(el.id) === String(req.params.id));
        finded.likes = finded.likes + 1;
        res.status(200).json({ msg: 'liked', count: finded.likes });
    } else {
        res.status(404).json({ error: 'not found' });
    }
});

console.log(`server ready at port ${port}`);

server.listen(port);







