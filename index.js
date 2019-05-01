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
  port: '3306',
  connectionLimit: 1000
})
// 登陆
app.get('/login', (req, res) => {
  let sql
  sql = `select * from mysql.managerList where username=${req.query.username} AND password=${req.query.password}`
  pools.query(sql).then(function(rows){
    res.send({code: 200, data: rows})
  }).catch(e => {
    console.log(e)
  });
})
// 添加管理员
app.get('/createUser', (req, res) => {
  let target = JSON.parse(req.query.form)
  let createSql = `INSERT INTO mysql.managerList (uid, name, username, permission, password) VALUES(uuid(), ${target.name}, ${target.username}, ${target.permission}, ${target.newpassword})`
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
  let sql = 'select * from mysql.managerList where permission = 1'
  pools.query(sql).then((rows) => {
    res.send({
      code: 200,
      data: rows
    })
  })
})
// 更改管理员信息
app.get('/upDataManagerInfo', (req, res) => {
  let username = JSON.parse(req.query.username)
  let sql = `UPDATE mysql.managerList SET permission = 0 where username = ${username}`
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

// 创建分类
app.get('/createSubject', (req, res) => {
  let target = JSON.parse(req.query.form)
  let createSql = `INSERT INTO mysql.subjectList (uid, name, orderBy) VALUES(uuid(), ${target.name}, '${target.orderBy}')`
  pools.query(createSql).then((rows) => {
    res.send({code: 200, data: rows})
  }).catch(e => {
    console.log(e)
  })
})
// 获取分类列表
app.get('/getSubject', (req, res) => {
  let sql = 'select * from mysql.subjectList'
  pools.query(sql).then((rows) => {
    res.send({
      code: 200,
      data: rows
    })
  }).catch( e => {
    console.log(e)
  })
})
// 删除分类
app.get('/deleteSubjectInfo', (req, res) => {
  let id = req.query.id
  let sql = `DELETE from mysql.subjectList where id = ${id}`
  pools.query(sql).then((rows) => {
    res.send({
      code: 200,
      data: rows
    })
  }).catch( e => {
    console.log(e)
  })
})

// 创建设备
app.get('/createEquipment', (req, res) => {
  console.log(req.query.form)
  let target = JSON.parse(req.query.form)
  let createSql = `INSERT INTO mysql.equipmentList (uid, name, subjectId, subjectName, num) VALUES(uuid(), ${target.name}, ${target.subject.id}, '${target.subject.name}', ${target.num})`
  pools.query(createSql).then((rows) => {
    res.send({
      code: 200,
      data: rows
    })
  }).catch( e => {
    console.log(e)
  })
})

// 获取设备列表
app.get('/getEquipment', (req, res) => {
  let sql = 'select * from mysql.equipmentList'
  pools.query(sql).then((rows) => {
    res.send({
      code: 200,
      data: rows
    })
  }).catch( e => {
    console.log(e)
  })
})

// 删除设备信息
app.get('/deleteEquipmentInfo', (req, res) => {
  let id = req.query.id
  console.log(id, 999)
  let sql = `DELETE from mysql.equipmentList where id = ${id}`
  pools.query(sql).then((rows) => {
    res.send({
      code: 200,
      data: rows
    })
  }).catch( e => {
    console.log(e)
  })
})

// 借出设备信息
app.get('/divideEquipmentInfo', (req, res) => {
  let form = JSON.parse(req.query.form)
  let name = JSON.parse(req.query.form).orderBy
  let num = parseInt(form.num) - parseInt(form.factNum)
  let borrowNum = parseInt(form.borrowNum) + parseInt(form.factNum)
  let sql = `UPDATE mysql.equipmentList SET num = ${num}, borrowNum = ${borrowNum} where id = ${form.id}`
  pools.query(sql).then((rows) => {
    let createRecordSql = `INSERT INTO mysql.record (equipmentName, orderBy, borrowNum) VALUES(${form.name}, '${name}', ${parseInt(form.factNum)})`
    pools.query(createRecordSql).then((rows) => {}).catch( e => {
      console.log(e)
    })
    res.send({
      code: 200,
      data: rows
    })
  }).catch( e => {
    console.log(e)
  })
})

// 回收设备信息
app.get('/addEquipmentInfo', (req, res) => {
  let form = JSON.parse(req.query.form)
  let name = JSON.parse(req.query.form).orderBy
  let num = parseInt(form.num) + parseInt(form.factNum)
  let borrowNum = parseInt(form.borrowNum) - parseInt(form.factNum)
  let sql = `UPDATE mysql.equipmentList SET num = ${num}, borrowNum = ${borrowNum} where id = ${form.id}`
  pools.query(sql).then((rows) => {
    let createRecordSql = `INSERT INTO mysql.record (equipmentName, orderBy, backNum) VALUES(${form.name}, '${name}', ${parseInt(form.factNum)})`
    pools.query(createRecordSql).then((rows) => {}).catch( e => {
      console.log(e)
    })
    res.send({
      code: 200,
      data: rows
    })
  }).catch( e => {
    console.log(e)
  })
})
app.listen(8080, () => console.log('Example app listening on port 8080!'))