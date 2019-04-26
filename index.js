const express = require('express')
const app = express()
var mysql = require('promise-mysql');
var cors = require('cors');
app.use(cors({
    origin:['http://localhost:8800'],  //指定接收的地址
    methods:['GET'],  //指定接收的请求类型
    alloweHeaders:['Content-Type','Authorization']  //指定header
}))
// 登陆
app.get('/login', (req, res) => {
    // let sql
    // if(req.query.select == 1) {
    //     sql = `select * from mysql.student where id=${req.query.id} AND password=${req.query.password}`
    // } else if(req.query.select == 2) {
    //     sql = `select * from mysql.manager where id=${req.query.id} AND password=${req.query.password}`
    // }
    // // 获取查询语句
    // mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: '831015',
    //     database: 'mysql',
    //     port: '3306'
    // }).then(function(conn){
    //     var result = conn.query(sql);
    //     conn.end();
    //     return result;
    // }, function() {
    //     conn.end();
    //     res.end('无权限')
    // }).then(function(rows){
    //     // Logs out a list of hobbits
    //     console.log(rows);
    //     console.log({data: rows})
    //     res.send(rows)
    // });
})
// 获取教室表
app.get('/classroom', (req, res) => {
    // console.log('classroom enter')
    // let sql = `select * from mysql.classroom`
    // // 获取查询语句
    // mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: '831015',
    //     database: 'mysql',
    //     port: '3306'
    // }).then(function(conn){
    //     var result = conn.query(sql);
    //     conn.end();
    //     return result;
    // }, function() {
    //     conn.end();
    //     res.end('无权限')
    // }).then(function(rows){
    //     console.log(rows);
    //     let classroom = []
    //     rows.map( e => {
    //         classroom.push({'label': e.no.toString()})
    //     })
    //     console.log({table: classroom})
    //     res.send({table: classroom})
    // });
})
// 获取教室详情
app.get('/classroomDetail', (req, res) => {
    // console.log('classroom enter')
    // let sql
    // if (req.query.no) {
    //     sql = `select * from mysql.classroomDetail where no=${req.query.no}`
    // } else {
    //     sql = `select * from mysql.classroomDetail`
    // }
    // // 获取查询语句
    // mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: '831015',
    //     database: 'mysql',
    //     port: '3306'
    // }).then(function(conn){
    //     var result = conn.query(sql);
    //     conn.end();
    //     return result;
    // }, function() {
    //     conn.end();
    //     res.end('无权限')
    // }).then(function(rows){
    //     console.log(rows);
    //     let classroomDetail = []
    //     rows.map( e => {
    //         console.log(rows)
    //         // classroomDetail.push({'label': e.no.toString()})
    //     })
    //     // res.send({table: classroom})
    // });
})
app.listen(8080, () => console.log('Example app listening on port 8080!'))