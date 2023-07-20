import express from 'express'

import { homePage, signupUser } from '../controller/user-controller.js'
import { createQuestion } from '../controller/question-controller.js'
import Question from '../model/questions.js'

const router = express.Router()

router.get('/home',homePage)
router.get('/', homePage)
router.post('/signup',signupUser)
router.post("/api/questions", createQuestion);   

export default router;