const router = require('express').Router();
const axios = require('axios');

router.get('/*', (req, res)=>{
    let baseUrl = process.env.FORECAST_SERVICE;
    
    axios.get(`${baseUrl}/api/forecast${req.url}`).then(data=>{
        if(data.status === 200){
            res.send(data.data);
        }else{
            res.status(data.status).send({
                'error':'error with api gateway'
            });
        }
    }).catch(err=>{
        res.status( 500).send({
            'error':'error with api gateway'
        });
    })
});

module.exports = router;