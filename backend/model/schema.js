const mongoose = require('mongoose');

// Requirement Collection
const Schema = mongoose.Schema({                                              
    name:{
        type:String,                                                         
     
    },
    area:{
        type:String,                                                          
      
    },
    institute:{
        type:String,                                                          
     
    },
    requirements:{                                                                  
        type:String,

    },
    hours:{                                                                  
        type:String,
      
    },
    approved:{                                                                  
        type:Number,
      
    },
    comments:{                                                                  
        type:String,
      
    },
    curriculum:{                                                                  
        type:String,
      
    },
    user:{
        type:String,
    },
    file:{
        type:String,
    }

});

const documentData = mongoose.model('requirement',Schema);
module.exports = documentData;
