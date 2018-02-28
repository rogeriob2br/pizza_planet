import {Request, Response, Router} from "express";
import OrderModel from "../model/order.model";
import ClientModel from "../model/client.model";
export class OrderRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/', OrderRouter.getAll);
        this.router.get('/:id', OrderRouter.getOne);
        this.router.post('/', OrderRouter.save);
        this.router.post('/complete/:id', OrderRouter.complete);
        this.router.post('/cancel/:id', OrderRouter.cancel);
    }

    private static getAll(request: Request, response: Response) {
        OrderModel.find({})
            .then((data) =>{
                if(!data){
                    response.status(404).send({
                        data: new Error('Não há Pedidos realizados')
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
            })
    }

    private static getOne(request: Request, response: Response) {
        let orderId: number = parseInt(request.params.id);

        OrderModel.findOne(orderId)
            .then((data) =>{
                if(!data){
                    response.status(404).send({
                        data: new Error('O Pedido não foi cadastrado')
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
        let order= new OrderModel({
            date: params.date,
            status: params.status,
            client: params.client,
            products: params.products,
            totalPrice: params.totalPrice

        })

        order.save()
        .then((data) => {
            response.status(200).send({
                data
            })
        }).catch((error) => {
            response.status(500).send({
                message: error.message
            })
        })
    }

    private static complete(request: Request, response: Response) {
        OrderRouter.changeStatus(request, response, "DONE");
    }

    private static cancel(request: Request, response: Response) {
        OrderRouter.changeStatus(request, response, "CANCELED");
    }

    private static changeStatus(request: Request, response: Response, status: string) {
        let orderId: number = parseInt(request.params.id);

        OrderModel.findOne(orderId, function (err, OrderModel ) {
            if(err){
                return err;
            }else{
                OrderModel.status = status;
                OrderModel.save();
            }
        }).then(() => {
            response.status(200)
                .send(status)
        }).catch((error) => {
            response.status(500).send({
                message: error.message
            })
        })
    }
    // ======================
    // private static getTotalPrice(request: Request, response: Response): number {
    //     let orderId: number = parseInt(request.params.id);
    //     let total: number;
        
    //             OrderModel.findOne(orderId, function (err, OrderModel ) {
    //                 if(err){
    //                     response.status(404).send({err})
    //                 }else{
                        
    //                     total = OrderModel.totalPrice;
    //                     return total

    //                 }
    //             }).then(() => {
    //                 response.status(200)
    //                     .send(status)
    //             }).catch((error) => {
    //                 response.status(500).send({
    //                     message: error.message
    //                 })
    //             })

    // }

}

const orderRouter = new OrderRouter();
orderRouter.init();

export default orderRouter.router;
