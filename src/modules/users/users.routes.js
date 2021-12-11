const { Router } = require("express");
const isAuth = require("../../middlewares/isAuth");
const {
  validateCreate,
  validateUpdate,
  validateStatus,
} = require("../../exports/validations/users.validations");
const {
  create,
  findAll,
  findOne,
  update,
  remove,
  status,
} = require("./users.controllers");

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *      required:
 *        - name
 *
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: Crear usuario
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: Usuario registrado
 */
router.post("/", isAuth, validateCreate, create);

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Consultar a todos los usuarios
 *    tags: [User]
 *    responses:
 *      200:
 *        description: Usuarios
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */
router.get("/", isAuth, findAll);

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: Consultar datos del usuario
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID
 *    responses:
 *     200:
 *       description: Usuario
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             ref: '#/components/schemas/User'
 */
router.get("/:id", isAuth, findOne);

router.put("/:id", isAuth, validateUpdate, update);

router.delete("/:id", isAuth, remove);

router.put("/:id/status", isAuth, validateStatus, status);

module.exports = router;
