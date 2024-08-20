const express = require('express');
const router = express.Router();

const notificationTypeController = require('../controllers/NotificationTypeController');
const notificationController = require('../controllers/NotificationController');

// Rutas para NotificationType
router.post('/notification-types', notificationTypeController.createNotificationType);
router.get('/notification-types', notificationTypeController.getAllNotificationTypes);
router.get('/notification-types/:id', notificationTypeController.getNotificationTypeById);
router.put('/notification-types/:id', notificationTypeController.updateNotificationType);
router.delete('/notification-types/:id', notificationTypeController.deleteNotificationType);

// Rutas para Notification
router.post('/notifications/create', notificationController.createNotification);
router.get('/notifications', notificationController.getAllNotifications);
router.get('/notifications/:id', notificationController.getNotificationById);
router.get('/notifications/user/:userId', notificationController.getNotificationsByUserId);
router.get('/notifications/count/:userId', notificationController.getNotificationCount);
router.get('/notification/:id/sender', notificationController.getSenderByNotificationId);
router.put('/notifications/:id', notificationController.updateNotification);
router.delete('/notifications/:id', notificationController.deleteNotification);

module.exports = router;
