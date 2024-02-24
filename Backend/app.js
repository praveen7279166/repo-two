const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const oLeavesData = require('../Backend/model/datamodel');

const addUserInfo = require('./addUserInfo/add-userInfo');


app.use(bodyParser.json());

const cors = require('cors');

app.use(cors());

const mongoose = require('mongoose');
const auth = require('./Auth/auth');

mongoose.connect('mongodb+srv://praveen7279166:TEST124124@cluster0.fanah2h.mongodb.net/')
  .then(() => {
    console.log("DB conneced successfully");
  })
  .catch((err) => {
    console.log("Failed", err)
  })

app.get('/api/fetch-records', addUserInfo, (req,res) => {
  oLeavesData.find({oUser: req.UserInfo.id}).then((oData) => {
    res.json({bSuccess: true, tData: oData});
  })
})

app.get('/api/test', (req,res) => {
  res.json({bSuccess: true});
})

app.delete('/api/delete/:id', (req,res) => {
  
  oLeavesData.deleteOne({_id: req.params.id}).then((result) => {
    console.log("delete success - ", res);
    res.json({bSuccedd: true});
  })
  .catch((err) => {
    console.log('error delete - ', err);
  })
})

app.post('/api/add',addUserInfo , (req, res) => {
  const newLeave = new oLeavesData({sReason: req.body.sReason, nDate: req.body.nDate, bIsFullDay: req.body.bIsFullDay, bIsLeaveTypeCL: req.body.bIsLeaveTypeCL, oUser: req.UserInfo.id });
  newLeave.save()
  .then(() => {
    console.log(req.body);
    res.status(200).json({bSuccess: true, tData: newLeave});
  })
  .catch((error) => {console.log("error",error)}) ;
  
})

app.use('/auth', auth)

// app.use((req, res, next) => {
//   res.send('Hello, world!');
//   // req.json({ data: 'Hello World!' });
// });

// app.use((req, res, next) => {
//   console.log("2");
// })



module.exports = app;


