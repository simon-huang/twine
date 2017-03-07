# Twine

> Github for Documents. For additional info, [read our press release](https://github.com/bearded-artichokes/publishus/blob/master/PRESS-RELEASE.md).

## Table of Contents

1. [Roadmap](#roadmap)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Contributing](#contributing)
1. [Team](#team)

### Roadmap

[View the project roadmap](https://github.com/bearded-artichokes/publishus/issues)

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
CREATE DATABASE twine;
```

From within the root directory:

```sh
npm install
```

Start the server with:
```
npm start
```

Run front end tests with:
```
npm run-script testf
```

Run back end tests with:
```
npm run-script testb
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Team

  - __Product Owner__: Justin Mendelson
  - __Scrum Master__: Franklin Jeng
  - __Development Team Members__: Simon Huang, Abiy Melaku
