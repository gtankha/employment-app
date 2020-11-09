var express = require('express');
var Busboy = require('busboy');
var fs = require('fs');
var request = require('request-promise');
var router = express.Router();

const { Users } = require('../../models');
const session = require('express-session');
const clientID = 'c0c14aedd53cea6';

router.post('/', function(req, res, next) {
    var busboy = new Busboy({headers: req.headers});
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        if(fieldname == 'image') {
            // the buffer
            file.fileRead = [];
            file.on('data', function(data) {
                // add to the buffer as data comes in
                this.fileRead.push(data);
            });

            file.on('end', function() {
                // create a new stream with our buffered data
                var finalBuffer = Buffer.concat(this.fileRead);

                var options = {
                    uri: 'https://api.imgur.com/3/image',
                    method: 'POST',
                    headers: {
                        'Authorization': 'Client-ID ' + clientID // put client id here
                    },

                    formData: {
                        image: finalBuffer,
                        type: 'file'
                    }
                };

                request(options)
                    .then(function(parsedBody) {
                        const data = JSON.parse(parsedBody).data;

                        Users.update({image:data.link},

                            { where: { id: req.session.user_id } }
                
                        )
                            .then(result => {
                
                                Users.findOne({
                                    where: {
                                        id: req.session.user_id
                                    }
                                }
                                )
                                    .then(updatedUser => console.log(updatedUser));
                            })
                
                            .catch((err) => {
                
                                res.status(500).json(err);
                            });


             
                        res.status(200).json(data);
                    })
                    .catch(function(err) {
                     
                        res.status(400).json(JSON.parse(err));
                        alert(JSON.parse(err));
                    });
            });
        }
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
      
    });
    busboy.on('finish', function() {
       // res.status(200).end()
     
    });
    req.pipe(busboy);
});

module.exports = router;