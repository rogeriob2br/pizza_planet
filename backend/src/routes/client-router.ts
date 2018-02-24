import {Router, Request, Response, NextFunction} from "express";
import ClientModel from "../model/client.model";

export class ClientRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/', ClientRouter.getAll);
        this.router.get('/:tel', ClientRouter.getOne);
        this.router.post('/', ClientRouter.save);
        this.router.put('/', ClientRouter.update);
    }

    private static getAll(request: Request, response: Response): void {
        ClientModel.find({})
            .then((data) =>{
                if(!data){
                    response.status(404).send({
                        data: new Error('Não há clientes cadastrados')
                    });
                }else{
                    response.status(200).send({
                        data
                    })
                }

            })
            .catch((err) =>{
                console.log(err);
                response.status(500).send({
                    data: new Error('Ocorreu um erro no sistema')
                });
            });
        
    }

    private static getOne(request: Request, response: Response) {
        let clienttel: string = request.params.phone1;

        ClientModel.findOne(clienttel)
            .then((data) =>{
                if(!data){
                    response.status(404).send({
                        data: new Error('O Cliente não foi cadastrado')
                    });
                }else{
                    response.status(200).send({
                        data
                    });
                }
            })
            .cath((err) =>{
                response.status(500).send({
                    data: new Error('Ocorreu um erro no sistema')
                });
            });

    }

    private static save(request: Request, response: Response) {
        let params = request.body;
        let client = new ClientModel({
            name: params.name,
            cpf: params.cpf,
            phone1: params.phone1,
            phone2: params.phone2,
            address:{
                place: params.address.place,
                city: params.address.city,
                zipcode: params.address.zipcode,
                number: params.address.number,
                neighborhood: params.address.neighborhood,
                info: params.address.info
            }
        });

        client.save()
            .then((data) => {
                response.status(200).send({
                    data
                });
            }).catch((error) => {
                response.status(500).send({
                    message: error.message
                });
            });
    }

    private static update(request: Request, response: Response) {
        let params = request.body;
        let clientid = request.params.id;
        let options = {new: true}

        ClientModel.findByIdAndUpdate({_id: clientid, params, options})
            .then((data) => {
                response.status(200).send({
                    data
                });
            }).catch((error) => {
                response.status(500).send({
                    message: error.message
                })
            })
    }

}

const clientRouter = new ClientRouter();
clientRouter.init();

export default clientRouter.router;
