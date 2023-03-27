const express = require('express');
const notificationRouter = express.Router();
const Notification = require('../model/Notifications');
const createError = require('../utils/errors/createError.js');
const upload = require('../utils/middlewares/files.middleware.js');
const isAuth = require ('../utils/middlewares/auth.middleware.js')
const uploadToCloud = require('../utils/middlewares/cloudinary');

notificationRouter.get('/', async (request, response, next) => {
    try {
        const allNotifications = await Notification.find().populate('student');
        return response.status(200).json(allNotifications);
    } catch (error) {
        next(error)
    }
});

notificationRouter.get('/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const allNotifications = await Notification.findOne({ id: id });
        return response.status(200).json(allNotifications);
    } catch (error) {
        next(error)
    }
});
notificationRouter.post('/', [upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'calendar', maxCount: 1 }
  ]),  uploadToCloud], async (request, response, next) => {
    try {
        const allNotifications = await Notification.find();
        let maxId = 0;
        allNotifications.forEach((boardNotification) => {
            let id = parseInt(boardNotification.id);
            if (id >= maxId) {
                maxId = id + 1;
            }
        });
        const newNotification = new Notification({ ...request.body, id: maxId, 
            image: request.file_urls ? request.file_urls[0] : null,
            calendar: request.file_urls ? request.file_urls[1] : null,
        });
        const newNotificationDoc = await newNotification.save();
        return response.status(201).json(newNotificationDoc);
    } catch (error) {
        next(error)
    }
});

notificationRouter.put('/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const modifiedNotification = new Notification({ ...request.body});
        modifiedNotification._id = id;
        const updatedNotification = await Notification.findByIdAndUpdate(
            id,
            modifiedNotification,
            { new: true }
        );
        if (!updatedNotification) {
            return next(createError(`No se encuentra el Notification con el Id: ${id} para actualizarlo`, 404))
        }
        return response.status(201).json(updatedNotification);
    } catch (error) {
        next(error)
    }
});
notificationRouter.delete('/:id' ,async (request, response, next) => {
    try {
        const id = request.params.id;
        const deletedNotification = await Notification.findByIdAndDelete(id);
        if (!deletedNotification) {
            return next(createError(`No se encuentra el Notification con el Id: ${id} para eliminarlo`, 404))
        } else {
            return response.status(200).json(`Notification eliminado con éxito`);
        }
    } catch (error) {
        next(error)
    }
});



module.exports = notificationRouter;


