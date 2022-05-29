const express = require('express')
const ProductsController = require('../controllers/ProductsController')

const ProductsRouter = express.Router()

//#region Swagger schema
/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          required:
 *              - name
 *              - price
 *              - stock
 *              - status
 *          properties:
 *              _id:
 *                  type: string
 *                  description: Auto generated id of the product
 *              name:
 *                  type: string
 *                  description: Product name
 *              price:
 *                  type: number
 *                  description: Product price
 *              stock:
 *                  type: number
 *                  description: Quantity of this product that is avaiable in stock
 *              status:
 *                  type: boolean
 *                  description: whether the product avaible for show or not
 */
//#endregion

//#region Swagger Tags
/**
 * @swagger
 *  tags:
 *      name: Products
 *      description: Products managing API
 */
//#endregion

//#region Get ALL
/**
 * @swagger
 *  /products:
 *      get:
 *          tags: [Products]
 *          summary: Returns a list of all products
 *          responses: 
 *              200:
 *                  description: The list of the products
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */
//#endregion
ProductsRouter.get('/', ProductsController.index)
//#region Get ALL Active
/**
 * @swagger
 *  /products/active:
 *      get:
 *          tags: [Products]
 *          summary: Returns a list of all products that are active
 *          responses: 
 *              200:
 *                  description: The list of the products
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */
//#endregion
ProductsRouter.get('/active', ProductsController.indexActive)

//#region Get by ID
/**
 * @swagger
 *  /products/{id}:
 *      get:
 *          tags: [Products]
 *          summary: Returns a product by id
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                 type: string
 *              required: true
 *              description: The product id
 *          responses: 
 *              200:
 *                  description: The product description by id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: The product was not found
 */
//#endregion
ProductsRouter.get('/:id', ProductsController.show)

//#region Create Product
/**
 * @swagger
 *  /products:
 *      post:
 *          tags: [Products]
 *          summary: Create a new product
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              200:
 *                  description: The product was successfully created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Invalid request
 *              
 */
//#endregion
ProductsRouter.post('/', ProductsController.store)

//#region Update Product by ID
/**
 * @swagger
 *  /products/{id}:
 *      put:
 *          tags: [Products]
 *          summary: Update a product by id
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The product id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              200:
 *                  description: The product was successfully updated
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: The product was not found
 *              400:
 *                  description: Invalid request
 */
//#endregion
ProductsRouter.put('/:id', ProductsController.update)

//#region Update Product Status by ID
/**
 * @swagger
 *  /products/{id}/status:
 *      put:
 *          tags: [Products]
 *          summary: Update a product status by id
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: the product id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              200:
 *                  description: Product status was successfully updated
 *              404:
 *                  description: Product was not found
 */
//#endregion
ProductsRouter.put('/:id/status', ProductsController.updateStatus)

//#region Delete By ID
/**
 * @swagger
 *  /products/{id}:
 *      delete:
 *          tags: [Products]
 *          summary: Remove product by id
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The product id
 *          responses:
 *              200:
 *                  description: The product was deleted
 *              404:
 *                  description: The product was not found
 */
//#endregion
ProductsRouter.delete('/:id', ProductsController.delete)

module.exports = ProductsRouter
