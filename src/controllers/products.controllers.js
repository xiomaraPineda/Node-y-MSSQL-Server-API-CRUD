import {getConnection} from '../database/connection.js';
import sql from 'mssql';

export const getproducts = async (req, res) => {
    const pool = await getConnection();
    const result = await  pool.request().query('SELECT * FROM products');
    res.json(result.recordset);

    //console.log(result);
    //res.send('obteniendo productos');
};

export const getProduct = async (req, res) => {
    console.log(req.params.id)
    const pool = await getConnection();
    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .query('SELECT * FROM products WHERE id= @id');

    console.log(result)

    if (result.rowsAffected[0] == 0){
        return res.status(404).json({message: "Poduct not found"});
    }

    return res.json(result.recordset[0]);
    
    //res.send('obteniendo un solo producto');
};

export const createProduct = async (req, res) => {
    console.log(req.body);

    const pool = await getConnection();
    const result = await  pool
    .request()
    .input('name', sql.VarChar, req.body.name)
    .input('price', sql.Decimal, req.body.price)
    .input('quantity', sql.Int, req.body.quantity)
    .input('description', sql.Text, req.body.description)
    .query("INSERT INTO products (name,price,quantity, description) VALUES (@name, @price, @quantity, @description); SELECT SCOPE_IDENTITY() AS id;");
    console.log(result)
    //res.send("creando un producto");
    res.json({
        id: result.recordset[0].id,
        name: req.body.name, 
        price: req.body.price, 
        quantity: req.body.quantity, 
        description: req.body.description })
};

export const updateProduct = async (req, res) => {
    const pool = await getConnection();
  const result =  await pool.request()
    .input("id", sql.Int, req.params.id)
    .input('name', sql.VarChar, req.body.name)
    .input('price', sql.Decimal, req.body.price)
    .input('quantity', sql.Int, req.body.quantity)
    .input('description', sql.Text, req.body.description)
    .query('UPDATE products SET name = @name, price = @price, quantity = @quantity, description = @description WHERE id= @id')

    console.log(result)

    if (result.rowsAffected[0] == 0){
        return res.status(404).json({message: "Poduct not found"});
    }

    res.json({
        id: req.params.id,
        name: req.body.name, 
        price: req.body.price, 
        quantity: req.body.quantity, 
        description: req.body.description })

    //return res.json({message: "Product update"});

    //res.send("actualizando un producto");
};

export const deleteProduct = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
    .input("id", sql.Int, req.params.id)
    .query("DELETE FROM products WHERE id = @id");

    console.log(result)

    if (result.rowsAffected[0] == 0){
        return res.status(404).json({message: "Poduct not found"});
    }

    return res.json({message: "Product delete"});


    ///res.send("eliminando un producto");
};