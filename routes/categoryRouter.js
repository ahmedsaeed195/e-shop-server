const express = require('express')
const CategoryController = require('../controllers/CategoryController')
const CategoryValidator = require('../middleware/validation/category/CategoryValidator')
const CategoryUpdateValidator = require('../middleware/validation/category/CategoryUpdateValidator')
const IdValidator = require('../middleware/validation/IdValidator')

const CategoryRouter = express.Router()

//#region Swagger schema
/**
 * @swagger
 * components:
 *  schemas:
 *      Category:
 *          type: object
 *          required:
 *              - name
 *              - status
 *          properties:
 *              _id:
 *                  type: string
 *                  description: Auto generated id of the category
 *              name:
 *                  type: string
 *                  description: Category name
 *              status:
 *                  type: boolean
 *                  description: Status of category if it is active or not
 *              createdAt:
 *                  type: string
 *                  description: Date at which the document was created
 *              updatedAt:
 *                  type: string
 *                  description: Date at which the document was last updated
 *              __v:
 *                  type: integer
 *                  description: Version key of the document
 */
//#endregion

//#region Swagger Tags
/**
 * @swagger
 *  tags:
 *      name: Category
 *      description: Category managing API
 */
//#endregion

//#region Get All
/**
 * @swagger
 *  /category:
 *      get:
 *          tags: [Category]
 *          summary: Returns a list of all categories
 *          responses:
 *              200:
 *                  description:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Category'
 */
//#endregion
CategoryRouter.get('/', CategoryController.index)

//#region Get Active
/**
 * @swagger
 *  /category/active:
 *      get:
 *          tags: [Category]
 *          summary: Returns a list of all active categories
 *          responses:
 *              200:
 *                  description:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Category'
 */
//#endregion
CategoryRouter.get('/active', CategoryController.indexActive)

//#region Create Category
/**
 * @swagger
 *  /category:
 *      post:
 *          tags: [Category]
 *          summary: Create a new category
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - name
 *                              - status
 *                          properties:
 *                              name:
 *                                  type: string
 *                              status:
 *                                  type: boolean
 *                      example:
 *                              name: test
 *                              status: true
 *          responses:
 *              201:
 *                  description: The category was successfully created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Category'
 *              406:
 *                  description: Not Acceptable, data validation error
 *              409:
 *                  description: Category exists
 *              
 */
//#endregion
CategoryRouter.post('/', CategoryValidator, CategoryController.store)

//#region Update Category by ID
/**
 * @swagger
 *  /category/{id}:
 *      put:
 *          tags: [Category]
 *          summary: Update a category by id
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The category id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                              status:
 *                                  type: boolean
 *                      example:
 *                              name: test
 *                              status: true
 *          responses:
 *              200:
 *                  description: The category was successfully updated
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Category'
 *              404:
 *                  description: The category was not found
 *              406:
 *                  description: Not Acceptable, data validation error
 */
//#endregion
CategoryRouter.put('/:id', IdValidator, CategoryUpdateValidator, CategoryController.update)

//#region Delete By ID
/**
 * @swagger
 *  /category/{id}:
 *      delete:
 *          tags: [Category]
 *          summary: Remove category by id
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The category id
 *          responses:
 *              200:
 *                  description: The category was deleted
 *              404:
 *                  description: The category was not found
 *              409:
 *                  description: This Category is used by some products, please remove all products from this category first then try again
 */
//#endregion
CategoryRouter.delete('/:id', IdValidator, CategoryController.delete)

module.exports = CategoryRouter

