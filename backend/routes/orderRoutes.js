import express from "express";

const router=express.Router();
import {
    updateOrderToDelivered,
    updateOrderToPaid,
    getMyOrders,
    getOrderById,
    addOrderItems,
    getOrders
} from "../controllers/orderController.js";
import {admin, protect} from "../middleware/authMiddleware.js";

router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders);
router.route('/mine').get(protect,getMyOrders);
router.route('/:id').get(protect,getOrderById);
router.route('/:id/pay').put(protect,updateOrderToPaid);
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered);


export default router;
