# bat-graphql
A NodeJS application providing an interface for the BungeeAdminTools mySQL database.
The interface uses GraphQL and Express.

# Production
`NodeJS 8` or higher is required.

## Setup

Install dependencies
```
npm install
```

Build production files
```
npm run build
```

## Start
```
npm start
```
The default url for the interface is [http://localhost:8000/graphql](http://localhost:8000/graphql).

An in-browser IDE for exploring the API is available under [http://localhost:8000/graphiql](http://localhost:8000/graphiql)

# Development
Starts the application with Nodemon to watch files and restart on change.
```
npm run dev
```

# Configuration
The server has a configuration file `config.json` where you can enter your mySQL database
options and change its web server settings.
```
{
  "api": {
    "hostname": "localhost",
    "port": 8000,
    "cors": {
      "allowedOrigins": [
        "*"
      ]
    }
  },
  "mysql": {
    "host": "localhost",
    "port": 3306,
    "database": "mc_bat",
    "user": "user",
    "password": "123456"
  }
}
```