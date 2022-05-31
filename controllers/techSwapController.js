import TechSwap from '../models/techSwap.js';
import Logger from '../models/logger.js';
import ip from 'ip';

const techSwapCtrl = {};


//named functions
techSwapCtrl.getAvailableTechSwaps = async (req, res, next) => {
    try{
        console.log('Retrieving all Tech Swap items');
        const techSwapItems = await TechSwap.find();
        res.json(techSwapItems);
    } catch(err) {
        console.log(`Error: ${ err.message }`);
        res.status(500).json({ mesage: err.message });
    }

};

techSwapCtrl.createNewTechSwap = async (req, res, next) => {
    const techSwap = new TechSwap({
        item: req.body.item,
        purchasedDate: req.body.purchasedDate,
        condition: req.body.condition,
        owner: req.body.owner,
        contactNo: req.body.contactNo,
        email: req.body.email,
        available: req.body.available,
        preferredSwap: req.body.preferredSwap,
        giveAway: req.body.giveAway
    });

    //save the entry
    try{
        const newTechSwapItem = await techSwap.save();
        console.log('New Tech Swap added');
        res.status(201).json(newTechSwapItem);
    } catch(err) {
        res.status(400).json({ message: err.message }); //bad user data
    }
}

techSwapCtrl.getSingleTechSwap = async (req, res, next) => {
    console.log(`Return details of Tech Swap id: ${req.params.id}`);
    return res.status(201).json(res.techSwap); 
}

techSwapCtrl.updateTechSwap = async (req, res, next) => {
    console.log(`Updating Tech Swap id: ${req.params.id}`);
    try{
        const techSwap = await TechSwap.findByIdAndUpdate(req.params.id, req.body);
        if(!techSwap){
            console.error(`Unable to find id: ${req.params.id}`);
            res.status(404).send('Tech Swap item not found');
        }else {
            console.log('Update successful');
            res.status(201).send(techSwap);
        }
        next();
    } catch(err){
        console.error(`Error: ${err.mesage}`);
        res.status(500).json({ message: err.mesage});
    }
}

techSwapCtrl.deleteTechSwap = async (req, res, next) => {
    const id = req.params.id;
    console.log(`Deleting entry with id ${id}`);
    try{
        await res.techSwap.remove();
        console.log('Successfully deleted');
        //next();
    } catch(err){
        console.error(`Error ${err.message}`)
        res.status(500).json({ message: err.message })
    }
    return res.status(204).send("Deleted"); //204 is no content so won't send anything
}

// //middleware
techSwapCtrl.getTechSwapItem = async (req, res, next) => {
    let techSwap;
    try{
        console.log(`Searching for id: ${req.params.id}`);
        techSwap = await TechSwap.findById(req.params.id);
        if(techSwap === null){
            console.error('Tech Swap item not found')
            return res.status(404).json({ message: `Cannot find Tech Swap item with id ${req.params.id}`});
        }
    } catch(err) {
        console.error(`Error: ${ err.message }`);
        return res.status(500).json({ message: err.message});
    }
    console.log('Tech Swap item found');
    res.techSwap = techSwap;
    next();
}

techSwapCtrl.logger = async (req, res, next) =>{
    console.log('Logging activity');
    const myIP = ip.address().toString();
    
    const logger = new Logger ({
        serverIP: myIP,
        request: req.method,
        id: req.params.id,
        requestJSON: JSON.stringify(req.body)
    });

    try{
        await logger.save();
        next();
    } catch(err){
        console.error(`Error: ${ err.message }`);
        res.status(500).json({ message: err.message })
    }
}

export default techSwapCtrl;