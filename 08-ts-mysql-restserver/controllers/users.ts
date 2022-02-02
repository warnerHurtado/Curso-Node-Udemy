import { Request, Response } from "express"
import User from "../models/user"


export const getUsers = async ( req: Request, res: Response) => {
    
    let users;

    users = await User.findAll();

    res.status( 200 ).json({
        users
    })
} 

export const getUser = async ( req: Request, res: Response) => {
    
    const { id } = req.params;

    let users;

    users = await User.findByPk( id );

    if (users ){
        res.status( 200 ).json({
            users
        })
    } else {
        res.status( 404 ).json({
            msg: `No existe un usuario con el id ${ id }`
        });
    }

} 

export const editUser = async ( req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {

        const user = await User.findByPk( id );
        if ( !user ){
            return res.status( 404 ).json({
                msg: `No existe un usuario con el id ${ id }`
            });
        }

        if ( body.email ){
            const existEmail = await User.findOne({
                where: {
                    email: body.email
                }
            });
    
            if ( existEmail ) {
                return res.status( 400 ).json({ msg: `Ya existe un usuario con el email ${ body.email }`});
            }

        }

        await user.update( body );

        res.json( user );

    } catch (error) {
        console.log(error);
        res.status( 500 ).json({
            msg: 'Hable con el administrador.'
        })
    }
} 

export const deleteUser = async ( req: Request, res: Response) => {
    const { id } = req.params;

    try {

        const user = await User.findByPk( id );
        if ( !user ){
            return res.status( 404 ).json({
                msg: `No existe un usuario con el id ${ id }`
            });
        }

        await user.update( { estado: 0 } );

        //await user.destroy(); esto por si quiero borrarlo fisico
        res.json( user );

    } catch (error) {
        console.log(error);
        res.status( 500 ).json({
            msg: 'Hable con el administrador.'
        })
    }
} 

export const createUser = async ( req: Request, res: Response) => {
    const { body } = req;
    try {

        const existEmail = await User.findOne({
            where: {
                email: body.email
            }
        });

        if ( existEmail ) {
            return res.status( 400 ).json({ msg: `Ya existe un usuario con el email ${ body.email }`});
        }

        const user = new User( body );
        await user.save();
        res.json( user );
    } catch (error) {
        console.log(error);
        res.status( 500 ).json({
            msg: 'Hable con el administrador.'
        })
    }

} 

