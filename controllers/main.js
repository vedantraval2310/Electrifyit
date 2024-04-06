const model = require('../models/electricVehicleData');
const CustomAPIError = require('../errors/custom-error');

const getEvData =  async(req,res)=>{
    try {
    const {Maker} = req.query;
    
    const result = await model.find({});
    if (!result.length) {
        return res.status(200).json({ result: [] });
      }
    const filteredresults = result.filter(doc => {
        const EVname = doc.make;
        return (Maker == EVname);
      });
    res.status(200).json({EvData : filteredresults});
    }   
    catch (error) {
        
        console.error(error);
        alert(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

//this callback function will be used
const getspecifics = async (req, res) => {
    try {
      const { Syear, Eyear, Range } = req.query;
      const dates = new Date(Syear).getTime();
      const edate = new Date(Eyear).getTime();
      const rangeNumber = Number(Range);
      console.log(edate);
  
      const result = await model.find({});
  
      if (!result.length) {
        return res.status(200).json({ result: [] });
      }
     let flag =0; 
      const filteredResults = result.filter(doc => {
        const driven = Number(doc.milesDriven);
        const dateOfReg = new Date(doc.date).getTime();
        console.log("starting date"+ dates + "Ending date "+ edate + "datereange" + dateOfReg);
        if (dateOfReg >= dates && dateOfReg <= edate)
          {
            flag = 1;

          }
          else
          {
              flag = 0;
          }
        return (driven >= rangeNumber && flag == 1);
      });
      res.status(200).json({ result: filteredResults });
    } catch (error) {
      // Handle errors appropriately
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const getall = async (req,res)=>{
    const result = await model.find({});
    res.status(200).json({result})
}

module.exports = {getEvData,getspecifics,getall};