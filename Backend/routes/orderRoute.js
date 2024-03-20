import express from "express";
const router=express.Router();

import {authenticate,authorizedAdmin} from '../middlewares/authMiddleware.js'
import { calcualteTotalSalesByDate, calculateTotalSales, countTotalOrders, createOrder, findOrderById, getAllOrders, getUserOrders, markOrderAsDelivered, markOrderAsPaid } from "../controllers/orderController.js";

router.route('/').post(authenticate,createOrder).get(authenticate,authorizedAdmin,getAllOrders)
router.route('/mine').get(authenticate,getUserOrders)
router.route('/total-orders').get(authenticate,authorizedAdmin,countTotalOrders)
router.route('/total-sales').get(calculateTotalSales)
router.route('/total-sales-by-date').get(calcualteTotalSalesByDate)
router.route('/:id').get(authenticate,findOrderById)
router.route('/:id/pay').put(authenticate,markOrderAsPaid)
router.route('/:id/deliver').put(authenticate,authorizedAdmin,markOrderAsDelivered)


export default router;