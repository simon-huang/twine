# PublishUs

> Simple document editing with the power of git.

## Team

  - __Product Owner__: Justin Mendelson
  - __Scrum Master__: Franklin Jeng
  - __Development Team Members__: Simon Huang, Abiy Melaku

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Create projects together with organization and structure. Gated process prevents overwritting changes made with each other.

## Requirements

- Node 0.10.x
- React 15.4.x
- MySQL 5.7.x
- Express 4.10.x
- nodegit 0.17.x

## Development

### Installing Dependencies

Have a MySQL server started:
```
mysql.server start
```
Upon first run, a database needs to be created:
Sign into mysql database, by default the command is:
```
mysql -u root -p
```
With a blank password

Once inside, create a database for use
```
CREATE DATABASE publishus;
```

From within the root directory:

```sh
npm install
```

Start the server with:
```
npm start
```

Start tests with:
```
npm test
```


### Roadmap

View the project roadmap [here](https://github.com/bearded-artichokes/publishus/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
