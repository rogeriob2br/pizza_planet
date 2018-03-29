import {Request, Response, Router} from "express";
import ProductModel from "../model/product.model";

export class ProductRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/', ProductRouter.getAll);
        this.router.get('/:id', ProductRouter.getOne);
        this.router.post('/', ProductRouter.save);
        this.router.put('/', ProductRouter.edit);
    }

    private static getAll(request: Request, response: Response) {
        ProductModel.find({},"combo categoria name price ingredientes")
        .then((data) =>{
            if(!data){
                response.status(404).send({
                    data: new Error('Não há Produtos cadastrados')
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
        let productId: number = parseInt(request.params._id);
  

        ProductModel.findOne(productId)
            .then((data) =>{
                if(!data){
                    response.status(404).send({
                        data: new Error('Produto não foi cadastrado')
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

        let product = new ProductModel({
            _id: params.id,
            name: params.name,
            price: params.price,
            ingredientes: params.ingredientes,
            combo: params.combo,
            categoria: params.categoria
        }); 

        product.save()
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

    private static edit(request: Request, response: Response) {
        let params = request.body;
        let productid = request.params.id;
        let options = {new: true}
        
        
        ProductModel.findByIdAndUpdate({_id: productid, params, options})
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

const productRouter = new ProductRouter();
productRouter.init();

export default productRouter.router;
