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
 *    Status:
 *      type: object
 *      properties:
 *        status:
 *          type: boolean
 *      required:
 *          - status
 *
 *    User:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        lastname:
 *          type: string
 *      required:
 *        - name
 *        - lastname
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: Crear usuario
 *    tags: [Users]
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
 *    tags: [Users]
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
 *    tags: [Users]
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
 *             $ref: '#/components/schemas/User'
 */
router.get("/:id", isAuth, findOne);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Actualizar datos del usuario
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *     200:
 *       description: Usuario actualizado
 */
router.put("/:id", isAuth, validateUpdate, update);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: Eliminar usuario
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID
 *    responses:
 *     200:
 *       description: Usuario eliminado
 */
router.delete("/:id", isAuth, remove);

/**
 * @swagger
 * /api/users/{id}/status:
 *  put:
 *    summary: Activar o desactivar usuarios
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Status'
 *    responses:
 *     200:
 *       description: Usuario activado/desactivado
 */
router.put("/:id/status", isAuth, validateStatus, status);

module.exports = router;
