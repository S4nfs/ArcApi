const { Instance } = require('../models/instance.model');
const router = require('express').Router();
const mongoose = require('mongoose');

router.post('/createinstance', async (req, res, next) => {
    try {
        const { userid, uuid, action, username, instance_type, domain_name, os, vcpu, cores, threads, memory, memory_unit, source_file_volume, volume_image_name, volume_size, drive_type, target_bus, storage_pool, existing_driver_type, existing_target_bus, source_file_cd, mac_address, model_type, source_network } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            res.status(400).json({
                success: 0,
                message: "Invalid User Id"
            });
        }
        const { data } = await Instance.create({ userid: userid, uuid: uuid, action: action, username: username, instance_type: instance_type, domain_name: domain_name, os: os, vcpu: vcpu, cores: cores, threads: threads, memory: memory, memory_unit: memory_unit, source_file_volume: source_file_volume, volume_image_name: volume_image_name, volume_size: volume_size, drive_type: drive_type, target_bus: target_bus, storage_pool: storage_pool, existing_driver_type: existing_driver_type, existing_target_bus: existing_target_bus, source_file_cd: source_file_cd, mac_address: mac_address, model_type: model_type, source_network: source_network });
        res.status(200).json({
            success: 1,
            message: "Instance created successfully",
            result: data
        });
    } catch (error) {
        res.status(500).json({
            success: 0,
            message: "Internal server error",
            error: error.message
        });
    }
}
);

//update arclight_vms collection  dynamically with passed values where domain_name = req.body.domain_name
router.post('/updateinstance', async (req, res, next) => {
    try {
        const { userid, uuid, action, username, instance_type, domain_name, os, vcpu, cores, threads, memory, memory_unit, source_file_volume, volume_image_name, volume_size, drive_type, target_bus, storage_pool, existing_driver_type, existing_target_bus, source_file_cd, mac_address, model_type, source_network } = req.body;

        const { data } = await Instance.findOneAndUpdate({ domain_name: domain_name }, { $set: { userid: userid, uuid: uuid, action: action, username: username, instance_type: instance_type, domain_name: domain_name, os: os, vcpu: vcpu, cores: cores, threads: threads, memory: memory, memory_unit: memory_unit, source_file_volume: source_file_volume, volume_image_name: volume_image_name, volume_size: volume_size, drive_type: drive_type, target_bus: target_bus, storage_pool: storage_pool, existing_driver_type: existing_driver_type, existing_target_bus: existing_target_bus, source_file_cd: source_file_cd, mac_address: mac_address, model_type: model_type, source_network: source_network } }, { new: true, upsert: true });
        res.status(200).json({
            success: 1,
            message: "Instance updated successfully",
            result: data
        });
    } catch (error) {
        res.status(500).json({
            success: 0,
            message: "Internal server error",
            error: error.message
        });
    }
}
);

//delete arclight_vms document where domain_name and userid matches with params
router.delete('/deleteinstance/:userid/:domain_name', async (req, res, next) => {
    try {
        const { userid, domain_name } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            res.status(400).json({
                success: 0,
                message: "Invalid User Id"
            });
        }
        const { data } = await Instance.findOneAndDelete({ userid: userid, domain_name: domain_name });
        res.status(200).json({
            success: 1,
            message: "Instance deleted successfully",
            result: data
        });
    } catch (error) {
        res.status(500).json({
            success: 0,
            message: "Internal server error",
            error: error.message
        });
    }
}
);





module.exports = router;
