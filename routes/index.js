var express = require('express');
var router = express.Router();

const Client = require('../Client');
const PubSub = require('../PubSub');

router.post('/', function(req, res, next) {
    
    const GROUP_NAME = req.body.group_name;
    const pubSub = new PubSub();

    const diogo = new Client('Diogo', pubSub);
    const hilario = new Client('Hilário', pubSub);
    const sandro = new Client('Sandro', pubSub);
    const ze = new Client('Ze', pubSub);
    const ricardo = new Client('Ricardo', pubSub);
    const francisco = new Client('Francisco', pubSub);

    
    diogo.enterGroup(GROUP_NAME);
    francisco.enterGroup(GROUP_NAME);
    sandro.enterGroup(GROUP_NAME);  
    hilario.enterGroup(GROUP_NAME);  
    ricardo.enterGroup(GROUP_NAME);
    diogo.leaveGroup(GROUP_NAME);
    diogo.sendMessage(GROUP_NAME, 'OLA');
    hilario.sendMessage(GROUP_NAME, 'O Diogo Saíu, vou sair tambem.');
    hilario.leaveGroup(GROUP_NAME);    
    hilario.enterGroup(GROUP_NAME);  
    ricardo.enterGroup(GROUP_NAME);
    ricardo.sendMessage(GROUP_NAME, 'Não consigo entrar duas vezes. Adeus.');
    ricardo.leaveGroup(GROUP_NAME);    
    

    res.json({status : true})    
});

module.exports = router;
