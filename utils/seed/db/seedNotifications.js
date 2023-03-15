require('dotenv').config();
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const fs = require('fs');
const Notification = require('../../../model/Notifications');
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const allNotifications = await Notification.find();

    if (allNotifications.length) {
        await Notification.collection.drop();
    }
}).catch((error) => {
    console.log(`Ha habido un error al borrar los Notifications ${error}`);
}).then(async () => {
    const data = fs.readFileSync('./utils/seed/db/notifications.json');
    const parsedData = JSON.parse(data);
    const NotificationsDoc = parsedData.map((notify) => {
        return new Notification(notify);
    });
    await Notification.insertMany(NotificationsDoc);
    console.log('Notifications añadidos con exito');
}).catch((error) => {
    console.log(`Ha habido un error al añadir los Notifications ${error}`);
}).finally(() => mongoose.disconnect());