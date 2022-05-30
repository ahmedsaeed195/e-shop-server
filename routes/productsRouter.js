const express = require('express')
const ProductsController = require('../controllers/ProductsController')
const ProductsValidator = require('../middleware/validation/products/ProductsValidator')

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
 *                  type: integer
 *                  description: Quantity of this product that is avaiable in stock
 *              status:
 *                  type: boolean
 *                  description: Whether the product avaible for show or not
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

//#region Get by name
/**
 * @swagger
 *  /products/{name}:
 *      get:
 *          tags: [Products]
 *          summary: Returns a list of products with given name
 *          parameters:
 *            - in: path
 *              name: name
 *              schema:
 *                 type: string
 *              required: true
 *              description: The product name
 *          responses: 
 *              200:
 *                  description: The list of the products by name
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */
//#endregion
ProductsRouter.get('/:name', ProductsController.showByName)

//#region Get by category
/**
 * @swagger
 *  /products/{category}:
 *      get:
 *          tags: [Products]
 *          summary: Returns a list of products with given category (Under Construction, DO NOT USE THIS YET)
 *          parameters:
 *            - in: path
 *              name: category
 *              schema:
 *                 type: string
 *              required: true
 *              description: The category id
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
ProductsRouter.get('/:category', ProductsController.showByCategory)

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
ProductsRouter.post('/', ProductsValidator, ProductsController.store)

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
