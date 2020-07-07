const faker = require('faker/locale/fa');
const { uuid } = require('uuidv4');
const times = require('./utils');

const getMeImage = type => {
  const imageObj = {
    image: [
      "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2971&q=80",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1504465039710-0f49c0a47eb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
      "https://images.unsplash.com/photo-1557428894-56bcc97113fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80",
      "https://images.unsplash.com/photo-1557992260-ec58e38d363c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
      "https://images.unsplash.com/photo-1545424920-b978eefcde48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1633&q=80",
      "https://images.unsplash.com/flagged/photo-1576045771676-7ac070c1ce72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",

    ],
    avatar: [
      "https://images.unsplash.com/photo-1586297098710-0382a496c814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
    ]
  };

  return imageObj[type][Math.floor(Math.random()*imageObj[type].length)];
};


const getTags = count => {
  let results = [];
  times (count) (() => results.push(faker.random.words(1)));

  return results;
};

const getComments = () => {
  const results = [];
  times(34)(() =>
    results.push({
        "id": uuid(),
        "content": `${faker.lorem.sentence()}`,
        "likes": faker.random.number({min:5, max:130}),
        "created_at": faker.date.past(),
        "author": {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          avatar: getMeImage("avatar"),
        },
      }
    ));

  return results;
};

const generatePosts = () => {
  let results = [];
  times(13)(() =>
    results.push({
        "id": uuid(),
        "title": `${faker.lorem.sentence()}`,
        "description": faker.lorem.paragraphs(),
        "likes": faker.random.number({min:5, max:10}),
        "created_at": faker.date.past(),
        "author": {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          avatar: getMeImage("avatar"),
        },
        "tags": getTags(Number(faker.random.number({
          'min': 0,
          'max': 10,
        }))),
        "image": getMeImage("image"),
        "comments": getComments(Number(faker.random.number({
          'min': 0,
          'max': 5,
        })))
      }
    ));

  return results;
};

module.exports = { posts: generatePosts(), user: { first_name: 'افسانه', last_name: 'فدایی', avatar: "http://afsanefadaei.ir/static/media/afsane.43bcb5f8.jpg"}};
