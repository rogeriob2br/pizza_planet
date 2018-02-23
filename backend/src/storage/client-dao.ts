// import {Storage} from "./storage";
// import {Client} from "../model/client.model";
import mongoose = require('mongoose');
import { Document, Schema, Model, model} from "mongoose";
import {Client} from "../Schema/client";
import { IClient } from "../MongoDB/IClient";


export class ClientDao {

    public static save(client: IClient) {
        Client.save(function(err) {
                // we've updated the dog into the db here
                if (err) throw err;
        })
    }

    public static update(client: IClient) {
        var query = { phone1: client.phone1 };  
        Client.findbyIdAndUpdate(client._id, client,function(err){
            if (err) throw err;
        });

    }

    public static getAll(): Promise<IClient[]> {
        return ClientDao.getClients();
    }

    public static get(tel: string): Promise<IClient> {
        Client.findOne({phone1: tel})
            .then((data)) =>{
                
            }
    }

    private static getClients(tel?: string): Promise<IClient[]> {
        return new Promise((resolve, reject) => {
            let sql: string = `SELECT * FROM CLIENTS`;

            if (cpf) {
                sql += ` WHERE CPF = '${cpf}'`;
            }

            return Storage.executeSql(sql).then((clientsStored: any) => {
                let clients: Client[] = [];

                for (let clientStored of clientsStored) {
                    let client: Client = {
                        name: clientStored.NAME,
                        cpf: clientStored.CPF,
                        phone1: clientStored.TELEPHONE,
                        phone2: clientStored.CELLPHONE,
                        address: {
                            place: clientStored.ADDRESS,
                            city: clientStored.CITY,
                            zipCode: clientStored.ZIPCODE,
                            number: clientStored.NUMBER,
                            neighborhood: clientStored.NEIGHBORHOOD,
                            info: clientStored.INFO
                        }
                    };

                    clients.push(client);
                }

                resolve(clients);
            }).catch((e) => {
                reject(e);
            })
        })
    }

}
