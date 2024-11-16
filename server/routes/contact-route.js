import express from "express"

import { createContact,updateContact, deleteContact,getAllContacts, getContactById } from "../controller/contact-controller.js"

const router=express.Router();

router.route('/contacts').post(createContact);
router.route('/contacts').get(getAllContacts)
router.route('/contacts/:id').delete(deleteContact)
router.route('/contacts/:id').get(getContactById)
router.route('/contacts/:id').put(updateContact)

export default router