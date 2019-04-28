const express = require('express')
const app = express()
var mysql = require('promise-mysql');
var cors = require('cors');
app.use(cors({
    origin:['http://localhost:8800'],  //指定接收的地址
    methods:['GET'],  //指定接收的请求类型
    alloweHeaders:['Content-Type','Authorization']  //指定header
}))
let pools =  mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '831015',
  database: 'mysql',
  port: '3306'
})
// 登陆
app.get('/login', (req, res) => {
  let sql
  sql = `select * from mysql.user where username=${req.query.username} AND password=${req.query.password}`
  pools.query(sql).then(function(rows){
    console.log({code: 200, data: rows})
    res.send({code: 200, data: rows})
  }).catch(e => {
    console.log(e)
  });
})
// 添加管理员
app.get('/createUser', (req, res) => {
  let target = JSON.parse(req.query.form)
  let createSql = `INSERT INTO mysql.user (uid, name, username, permission, password) VALUES(uuid(), ${target.name}, ${target.username}, ${target.permission}, ${target.newpassword})`
  let searchSql = `select * from mysql.user where username=${target.username}`
  pools.query(searchSql).then((rows) => {
    if (rows.length > 0) {
      res.send({
        code: 200, data: rows
      })
    } else {
      pools.query(createSql).then((rows) => {
        res.send({code: 200, data: rows})
      }).catch(e => {
        console.log(e)
      })
    }
  })
})
// 获取非一级管理员信息
app.get('/getManager', (req, res) => {
  let sql = 'select * from mysql.user where permission = 0'
  pools.query(sql).then((rows) => {
    res.send({
      code: 200,
      data: rows
    })
  })
})
// 更改管理员信息
app.get('/upDataManagerInfo', (req, res) => {
  // JSON.stringify
  let username = JSON.parse(req.query.username)
  // let uid = JSON.parse(req.query.uid)
  console.log(username)
  let sql = `UPDATE mysql.user SET permission = 1 where username = ${username}`
  pools.query(sql).then((rows) => {
    console.log(rows, 999)
    res.send({
      code: 200,
      data: rows
    })
  }).catch( e => {
    console.log(e)
  })
})
// 获取教室表
app.get('/classroom', (req, res) => {
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