import {Router, Request, Response} from "express";
let jwt = require('jsonwebtoken');

export class TokenRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/validate/:token', TokenRouter.validateToken);
    }

    private static validateToken(request: Request, response: Response) {
        try {
            // verify a token symmetric - synchronous
            // var token = jwt.verify(request.params.token, 'ITATAKARU');
            // console.log(token) // bar
            // verify a token symmetric

            jwt.verify(request.params.token, 'ITATAKARU', function(err, decoded) {
                // console.log(decoded) // bar
                var decoded = jwt.decode(request.params.token, {complete: true});
                // get the decoded payload and header
                var current_time = Date.now() / 1000;
                if ( decoded.exp < current_time) {
                 /* expired */  
                 console.log('Expirado');
                    response.status(200)
                        .send({
                            
                            status: response.status,
                            logged: false
                    });
                }else{
                    response.status(200)
                    .send({
                        status: response.status,
                        logged: true
                    });

                }

                console.log(decoded.header);
                console.log(decoded.payload);
            });

            // jwt.verify(request.params.token, 'ITATAKARU');

            
        } catch (err) {
            console.log(err);
            response.status(200)
                .send({
                    status: response.status,
                    logged: false
                });
        }
    }
}

const tokenRouter = new TokenRouter();
tokenRouter.init();

export default tokenRouter.router;