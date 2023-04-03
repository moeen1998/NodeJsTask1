const Client = require('../models/client')
module.exports = {
  
  all(req, res, next){
    const limit = parseInt(req.query.limit) || ''
    Client.find({}).limit(limit)
    .then(clients => res.status(200).send(clients))
    .catch(next)

  }, 
  
  
  create_client(req, res, next){
    const clientProps = req.body; 
    
    Client.create(clientProps)
      .then(client => res.status(201).send(client))
      .catch(next)
  },
  
  edit(req, res, next){

    const clientId = req.params.id;
    const clientProps = req.body;

    Client.findByIdAndUpdate({_id: clientId}, clientProps)
    .then(()=> Client.findById({_id:clientId}))
    .then(client => res.status(200).send(client))
    .catch(next)
  },
  
  delete(req, res, next){
    const clientId = req.params.id;
    
    Client.findByIdAndRemove({_id: clientId})
    .then(()=> res.status(204).send('Client deleted'))
    .catch(next)
  },
  
  details(req, res, next){
    const clientId = req.params.id;

    Client.findById({_id: clientId})
    .then(client => res.status(200).send(client))
    .catch(next)
  }
}
