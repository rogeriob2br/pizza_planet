import {Request, Response, Router} from "express";
import UserModel from "../model/user.model";
let jwt = require('jsonwebtoken');

export interface Login {
    successful: boolean,
    token: string
}

export class LoginRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.post('/', LoginRouter.getUser);
    }

    private static getUser(request: Request, response: Response) {
        let username: string = request.body.username;
        let password: string = request.body.password;

        UserModel.findOne(username)
            .then((data) => {
                if (data) {
                    if(data.password == password){
                        response.status(200)
                        .send({
                            token: jwt.sign(data, 'ITATAKARU', {expiresIn: 1800})
                        });
                    }else{
                        response.status(401).send();
                    }
                    
                } else {
                    response.status(401).send();
                }
            }).catch((error) => {
                response.status(500).send({
                    message: error.message
                })
            });
    }
}

const loginRouter = new LoginRouter();
loginRouter.init();

export default loginRouter.router;