const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js");


/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API para gestionar tareas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único de la tarea
 *         title:
 *           type: string
 *           description: Título de la tarea
 *         completed:
 *           type: boolean
 *           description: Indica si la tarea está completada
 */

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Hubo un problema al intentar crear la tarea
*/

//CREATE TASK
router.post("/create", async(req, res) => {
    try {
        const task = await Task.create({...req.body, completed: false });
        res.status(201).send({ message: "Task successfully created", task });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a task" });
    }
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de todas las tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */

//GET TASKS

router.get("/", async(req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        console.error(error);
    }
});

/**
 * @swagger
 * /id/{_id}:
 *   get:
 *     summary: Obtiene una tarea por su ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea a obtener
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Hubo un problema al intentar obtener la tarea
 */

//GET TASK BY ID

router.get("/id/:_id", async(req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        res.send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "There was a problem with the task with _id number: " +
                req.params._id,
        });
    }
}, )

/**
 * @swagger
 * /markAsCompleted/{_id}:
 *   put:
 *     summary: Marca una tarea como completada
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea a marcar como completada
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Hubo un problema al intentar actualizar la tarea como completada
 */

//MARK TASK AS COMPLETED (en este endpoint no le permitimos que edite el titulo)

router.put("/markAsCompleted/:_id", async(req, res) => {
        try {
            const task = await Task.findByIdAndUpdate(
                req.params._id, {
                    completed: true,
                }, { new: true }
            );
            res.send({ message: "Task successfully updated", task });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem trying to update the task with _id: " +
                    req.params._id,
            });
        }
    }),
/**
 * @swagger
 * /id/{_id}:
 *   put:
 *     summary: Actualiza el título de una tarea por su ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente (solo título)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Hubo un problema al intentar actualizar la tarea
 */
    //UPDATE TASK

    router.put("/id/:_id", async(req, res) => {
        try {
            const task = await Task.findByIdAndUpdate(req.params._id, req.body, { new: true })
            res.send({ message: "task successfully updated", task });
        } catch (error) {
            console.error(error);
        }
    }),
   /*
    @swagger
    * /id/{_id}:
    *   delete:
    *     summary: Elimina una tarea por su ID
    *     tags: [Tasks]
    *     parameters:
    *       - in: path
    *         name: _id
    *         schema:
    *           type: string
    *         required: true
    *         description: ID de la tarea a eliminar
    *     responses:
    *       200:
    *         description: Tarea eliminada exitosamente
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Task'
    *       500:
    *         description: Hubo un problema al intentar eliminar la tarea
    */
   
    //DELETE TASK

    router.delete("/id/:_id", async(req, res) => {
        try {
            const task = await Task.findByIdAndDelete(req.params._id);
            res.send({ message: "task deleted", task });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ message: "There was a problem trying to delete a task" });
        }
    })
module.exports = router;