const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const requirementData=require("../model/schema")

router.use(express.json());
router.use(express.urlencoded({extended:true}));


// Get All requirement list - Admin
router.get('/requirementlist', (req, res) => {
    requirementData.find()
      .then((Requirements) => {
        res.json(Requirements);
      })
      .catch((error) => {
        console.error('Error retrieving Requirements:', error);
        res.status(500).send('Error retrieving Requirements');
      });
  });

//   get a single requirement details - Admin
  router.get('/get-requirement/:id', (req, res) => {
    const id = req.params.id;
  
    requirementData.findById(id)
      .then((data) => {
        if (!data) {
          return res.status(404).json({ error: 'Data not found' });
        }
        res.json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving data' });
      });
  });

  
//   Add requirements - Admin
router.post('/addrequirement',async (req,res)=>{                              
    try{
        //console.log(req.headers.authorization)
        console.log(req.body);
        const item = req.body;                                               
        const newdata = await requirementData(item);                               
        newdata.save();                                
        res.status(200).json("Requirement Added");    
        console.log(` POST data`);                                                                         
    }catch(error){
        res.status(400).json("Cannot /POST data");                            
        console.log(`Cannot POST data`);                                      
    }
})


// Update requirement details - Admin
router.put('/update-requirement/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
  
    requirementData.findByIdAndUpdate(id, updatedData, { new: true })
      .then((updated) => {
        res.json(updated);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Error updating requirement' });
      });
  });

router.get('/viewdata/:_id',async (req,res)=>{
  try {
      let id = req.params._id;
      console.log(id)
      let data = await requirementData.findById(id);
      res.json({data:data,status:200}).status(201);
  } catch (error) {
      res.status(400).json({ message: "GET request CANNOT be completed" });    
  }
}) 


//  Approve Curriculum - Admin
router.put('/approve-curriculum/:id', async (req, res) => {
  const { id } = req.params;
  const { approved } = req.body;

  try {
    const updatedItem = await requirementData.findByIdAndUpdate(id, { approved }, { new: true });
    return res.json(updatedItem);
  } catch (err) {
    console.error('Error updating item:', err);
    return res.status(500).json({ error: 'Error updating item' });
  }
});


//   delete a requirement - Admin
  router.delete('/delete-requirement/:id', (req, res) => {
    const id = req.params.id;
  
    requirementData.findByIdAndRemove(id)
      .then((removedData) => {
        if (removedData) {
          console.log('Requirement deleted successfully:', removedData);
          res.json({ message: 'Requirement deleted successfully' });
        } else {
          res.status(404).json({ error: 'Requirement not found' });
        }
      })
      .catch((err) => {
        console.error('Error deleting requirement:', err);
        res.status(500).json({ error: 'Error deleting requirement' });
      });
  });


//   search filter - Admin

  router.get('/search', (req, res) => {
    const { name, institution, area, requirements } = req.query;
    const filters = {};
    if (name !== undefined && name !== '') filters.name = name;
    if (institution !== undefined && institution !== '') filters.institution = institution;
    if (area !== undefined && area !== '') filters.area = area;
    if (requirements !== undefined && requirements !== '') filters.requirements = requirements;
    
    // Fetch data from db based on the filters
    requirementData.find(filters)
      .then(result => res.json(result))
      .catch(err => res.status(500).json({ error: 'Error fetching data.' }));
  });


  router.get('/searchfilter', (req, res) => {
    requirementData.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: 'An error occurred' });
      });
  });

// Add Response - Faculty
router.put('/save-requirement/:id', (req, res) => {
  const id = req.params.id;
  const responseData = req.body;

  requirementData.findByIdAndUpdate(id, responseData, { new: true })
    .then((updated) => {
      res.json(updated);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Error updating response' });
    });
});

module.exports = router