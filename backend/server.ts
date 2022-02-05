import * as jsonServer from 'json-server'
import {Express} from 'express'

import * as fs from 'fs' 
import * as https from 'https'

import{handleAuthentication} from './auth'
import{handleAuthorization} from './authz'

import * as cors from 'cors'

import {MEAT_API} from '../src/app/app.api'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.bodyParser)

server.post('/login', handleAuthentication)
server.use('/orders', handleAuthorization)


server.use(router)


const options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
}

https.createServer(options, server).listen(3001, () => {
    console.log('Json server is running')
})