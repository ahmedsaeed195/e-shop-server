const express = require('express')
const ProductsController = require('../controllers/ProductsController')
const ProductsValidator = require('../middleware/validation/products/ProductsValidator')
const IdValidator = require('../middleware/validation/products/IdValidator')
const searchValidator = require('../middleware/validation/products/searchValidator')

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
 *              - quantity
 *              - categoryId
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
 *              quantity:
 *                  type: integer
 *                  description: Quantity of this product that is avaiable in stock
 *              categoryId:
 *                  type: string
 *                  description: ID of the category classification
 *              description:
 *                  type: string
 *                  description: Product description (Optional, default is an empty string)
 *              rating:
 *                  type: integer
 *                  description: Rating of the product (Optional, default is 0)
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

//TODO: update swagger docs for GET ALL with the rest of queries
//#region Get ALL
/**
 * @swagger
 *  /products:
 *      get:
 *          tags: [Products]
 *          summary: Returns a list of all products
 *          parameters:
 *            - in: query
 *              name: name
 *              schema:
 *                  type: string
 *              description: The product name
 *            - in: query
 *              name: price
 *              schema:
 *                  type: number
 *              description: The product name
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
ProductsRouter.get('/', searchValidator, ProductsController.index)

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
ProductsRouter.get('/:id', IdValidator, ProductsController.show)
//TODO: update swagger docs with 406 error code for not acceptable data and 201 for successful post
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
ProductsRouter.put('/:id', IdValidator, ProductsValidator, ProductsController.update)

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
ProductsRouter.delete('/:id', IdValidator, ProductsController.delete)

module.exports = ProductsRouter
