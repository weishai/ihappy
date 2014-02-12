/*
 * GET home page.
 */

var BlogModel = require('../models/blog.js');

module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/tool', function (req, res) {
    res.render('tool');
  });

  app.get('/blog/:name', function (req, res) {
    res.render('tool');
  });

  app.post('/api/postblog', function (req, res) {
    var newBlogData = {
      title: req.body.title,
      content: req.body.content
    }

    BlogModel.create(newBlogData, function (err, blog) {
      if(err){
        res.json({result:false, msg: 'err'})
      }
      else{
        res.json({
          result: true,
          data: blog,
          msg: 'save success'
        })
      }
    })
  });

  app.get('/api/getblog', function (req, res) {
    BlogModel.find({}, function (err, blog) {
      if(err){
        res.json({result:false, msg: 'err'})
      }
      else{
        res.json({
          result: true,
          data: blog,
          msg: 'get success'
        })
      }
    })
  });

  // app.post('/uploadfile', function (req, res) {
  //   var upload = require('jquery-file-upload-middleware')
  //     , fs = require('fs')
  //     , userFiles = req.files.csslift.length > 1 ? req.files.csslift : [req.files.csslift]
  //   for(var i in userFiles){
  //     if (userFiles[i].size == 0){
  //       // 使用同步方式删除一个文件
  //       fs.unlinkSync(userFiles[i].path);
  //       console.log('Successfully removed an empty file!');
  //     } else {
  //       var target_path = './public/uploads/csslift/' + userFiles[i].name;
  //       console.log(userFiles[i].name);
  //       // 使用同步方式重命名一个文件
  //       fs.renameSync(userFiles[i].path, target_path);
  //       console.log('Successfully renamed a file!');
  //     }
  //   }
  //   res.json(userFiles)
  //   fs.readFile(userFiles[0].path, function (err, contents) {
  //     res.write(contents)
  //     res.end
  //   })

  //   res.writeHead(302, {
  //     'Location': 'http://localhost:3000/showHtml'
  //   });
  //   res.end();
  // });

  // app.get('/showHtml', function (req, res) {
  //   res.send('good showHtml');
  // });
};