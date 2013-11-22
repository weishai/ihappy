
/*
 * GET home page.
 */

module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/tool', function (req, res) {
    res.render('tool');
  });

  app.post('/uploadfile', function (req, res) {
    var upload = require('jquery-file-upload-middleware');
    upload.configure({
        uploadDir: __dirname + '/public/uploads',
        uploadUrl: '/uploads',
        imageVersions: {
            thumbnail: {
                width: 80,
                height: 80
            }
        }
    });
    upload.fileHandler();
  });
};