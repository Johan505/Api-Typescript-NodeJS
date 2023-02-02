import {Request, Response} from 'express'
import {QueryResult} from 'pg'

import { pool } from '../database'
export const getUsers = async (req: Request, res:Response): Promise<Response>=>{
    try{
        const response = await pool.query('SELECT*FROM users');
        return res.status(200).json(response.rows);
    }

    catch(e){
        console.log(e)
        return res.status(500).json('Internal Server Error')
    }
}

export const getUserbyId = async (req:Request, res:Response): Promise<Response> => {
    const id = parseInt(req.params.id)
    const response:QueryResult = await pool.query('SELECT*FROM users where id = $1', [id]);
    return res.json(response.rows);
}


export const createUser = async (req:Request, res:Response): Promise<Response> => {
    const {name, email} = req.body;
    const response: QueryResult = await pool.query('INSERT INTO users (name,email) VALUES ($1, $2)', [name, email]);
    return res.json({
        message: 'User created', 
        body:{
            user:{
                name,
                email
            }
        }
    })
}

export const deleteUser = async (req:Request, res:Response): Promise<Response> => {
    const id = parseInt(req.params.id)
    await pool.query('DELETE FROM users where id = $1', [id]);
    return res.json(`User deleted`);
}


export const updateUser = async (req:Request, res:Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const {name, email} =req.body;

    await pool.query('UPDATE users set name=$1, email=$2 where id = $3', [name,email,id]);
    return res.json(`User update`);
}

