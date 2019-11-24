# Flease
Flease is a convenient tool to speedup generating boilerplate files during development. 

By default, it is designed to generate express files like `models` and `controllers` and also imports mongoose. However, it is not limited to Node js. 

## Installation
Run `npm i -g flease` to install globally.

## Usage
To run any command, simply run `flease [cmd]` . Run `flease --help` to list all available commands

## Case Study
For most of my nodejs projects, I generally use mongodb as the data store, and mongoose as the ODM. This means for every model I create, I'd have to import mongoose, setup the schema, export the schema e.t.c. This can become too repetitive.

With flease, run `flease make:model User`. You should have a `models/User.js` file in your project with the following content;

```js
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('User', userSchema);
```

You can also create a controller and associate it with a model instantly. Run `flease make:controller UsersController --model User` or `flease mc UsersController --model User`. You should now have a `controllers/UsersController.js` file in your project with the following content;

```js
const mongoose = require('mongoose');
const User = mongoose.model('User');

//
```

## Configuring
All generated codes are obtained from a single json file. You should publish it so that you can edit accordingly. Run `flease publish`. You should get a `flease.json` file that looks like this;

```json
{
    "models": [
        "const mongoose = require('mongoose');\n",
        "mongoose.Promise = global.Promise;\n\n",
        "const #{name}Schema = new mongoose.Schema({\n",
            "\tcreated: {\n",
            "\t\ttype: Date,\n",
            "\t\tdefault: Date.now\n",
            "\t},\n",
        "});\n\n",
        "module.exports = mongoose.model('#{model}', #{name}Schema);"
    ],
    "controllers": [
        "const mongoose = require('mongoose');\n",
        "const #{model} = mongoose.model('#{model}');\n\n",
        "//"
    ]
}
```

You can edit or add new lines in each section. As long as it is a valid json string, it will work fine.

## Testing
This project uses Jest for automated testing. Run `npm test`

## Contributing
