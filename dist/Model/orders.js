"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderData = void 0;
const database_1 = __importDefault(require("../database"));
//as discussed in class we export which has all method i.e. show, index, create etc.
//following methods are all reference to classroom. we are connecting to database
//running query on database and then we disconnect from database
// then we send a result 
class orderData {
    async create(order) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders(product_id, quantity, user_id, status) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [order.product_id, order.quantity, order.user_id, order.status]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`pls check cant create order :${err}`);
        }
    }
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        }
        catch (err) {
            throw new Error(`pls check could not found orders index: ${err}`);
        }
    }
    //
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`pls check cannot get order show ${err}`);
        }
    }
    async updateStatus(status, order_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `UPDATE orders SET status=$1 WHERE id=$2 RETURNING *`;
            const res = await conn.query(sql, [status, order_id]);
            conn.release();
            return res.rows[0];
        }
        catch (err) {
            throw new Error(`pls check could not update: ${err}`);
        }
    }
    async getCurrOrdByUserid(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM orders WHERE user_id =$1 ORDER BY id DESC LIMIT 1`;
            const res = await conn.query(sql, [user_id]);
            conn.release();
            return res.rows[0];
        }
        catch (err) {
            throw new Error(`pls check could not get current order by user_id: ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM orders WHERE id=($1)';
            await conn.query(sql, [id]);
            conn.release();
        }
        catch (error) {
            throw new Error(`could not delete user ${error}`);
        }
    }
}
exports.orderData = orderData;
