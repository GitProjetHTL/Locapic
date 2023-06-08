var express = require('express');
var router = express.Router();

module.exports = router;
require('../models/connection');
const Places =require('../models/places');
const { checkBody } = require('../modules/checkBody');

//route POST
router.post('/places', (req, res) => {
    //verifie si les champs ne son pas vide
    if (!checkBody(req.body, ['nickname', 'name', 'latitude', 'longitude'])) {
        res.json({ result: false, error: 'complete all area' });
        return;
    }
    //verifie  si l'utilisateur et le nom de la position existe deja
    Places.findOne({ name:req.body.name , nickname:req.body.nickname }).then(data => {
        if (data) {
        res.json({ result: false, error: 'location already registed' });
        return;
    }
    //crée dans la base de donnée
    const newPlaces = new Places({
        nickname: req.body.nickname,
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    });

    newPlaces.save()
        res.json({ result: true});
    
    });
  });


  //route GET

  router.get('/places/:nickname', (req, res) => {
    Places.find({ nickname: req.params.nickname }).then(nickname => {//ajouter le regex
      if (nickname === null) {
        res.json({ result: false, error: 'User not found' });
        return;
      }
  
      Places.find({ nickname: req.params.nickname }) 
        .then(places => {
          res.json({ result: true, places:places });
        });
    });
  });
  

//route DELETE
router.delete('/places', (req, res) => {
    if (!checkBody(req.body, ['nickname', 'name'])) {
        res.json({ result: false, error: 'complete all area' });
        return;
      }  

  Places.findOne({ nickname: req.body.nickname ,name: req.body.name}).then(user => {
    if (user===null) {
      res.json({ result: false, error: 'User not found' });
      return;
    }

        Places.deleteOne({ nickname: req.body.nickname ,name: req.body.name}).then(() => {
          res.json({ result: true });
        });
      });
  });


module.exports = router;