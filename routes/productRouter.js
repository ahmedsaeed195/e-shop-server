const express = require('express')
const ProductController = require('../controllers/ProductController')
const ProductValidator = require('../middleware/validation/product/ProductValidator')
const IdValidator = require('../middleware/validation/IdValidator')
const searchValidator = require('../middleware/validation/product/searchValidator')

const ProductRouter = express.Router()

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
 *              - category
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
 *              category:
 *                  type: string
 *                  description: Name of the category classification
 *              description:
 *                  type: string
 *                  description: Product description (Optional, default is "No Description")
 *              rating:
 *                  type: integer
 *                  description: Rating of the product, min&#58; 0, max&#58; 5 (Optional, default is 0)
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
 *      name: Product
 *      description: Product managing API
 */
//#endregion

//#region Get ALL
/**
 * @swagger
 *  /product:
 *      get:
 *          tags: [Product]
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
 *              description: The product price
 *            - in: query
 *              name: quantity
 *              schema:
 *                  type: integer
 *              description: The product quantity available in stock
 *            - in: query
 *              name: category
 *              schema:
 *                  type: string
 *              description: The product category classification
 *            - in: query
 *              name: description
 *              schema:
 *                  type: string
 *              description: The product description
 *            - in: query
 *              name: rating
 *              schema:
 *                  type: string
 *              description: The product rating
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
ProductRouter.get('/', searchValidator, ProductController.index)

//#region Get Active
/**
 * @swagger
 *  /product/active:
 *      get:
 *          tags: [Product]
 *          summary: Returns a list of all active products
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
 *              description: The product price
 *            - in: query
 *              name: quantity
 *              schema:
 *                  type: integer
 *              description: The product quantity available in stock
 *            - in: query
 *              name: category
 *              schema:
 *                  type: string
 *              description: The product category classification
 *            - in: query
 *              name: description
 *              schema:
 *                  type: string
 *              description: The product description
 *            - in: query
 *              name: rating
 *              schema:
 *                  type: string
 *              description: The product rating
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
ProductRouter.get('/active', searchValidator, ProductController.indexActive)

//#region Get by ID
/**
 * @swagger
 *  /product/{id}:
 *      get:
 *          tags: [Product]
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
ProductRouter.get('/:id', IdValidator, ProductController.show)

//#region Create Product
/**
 * @swagger
 *  /product:
 *      post:
 *          tags: [Product]
 *          summary: Create a new product
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - name
 *                              - price
 *                              - quantity
 *                              - category
 *                          properties:
 *                              name:
 *                                  type: string
 *                              price:
 *                                  type: number
 *                              quantity:
 *                                  type: integer
 *                              category:
 *                                  type: string
 *                              description:
 *                                  type: string
 *                              rating:
 *                                  type: integer
 *                      example:
 *                              name: test
 *                              price: 25.54
 *                              quantity: 20
 *                              category: tests
 *                              description: Test product
 *                              rating: 5
 *          responses:
 *              201:
 *                  description: The product was successfully created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              406:
 *                  description: Not Acceptable, data validation error
 *              
 */
//#endregion
ProductRouter.post('/', ProductValidator, ProductController.store)

//#region Update Product by ID
/**
 * @swagger
 *  /product/{id}:
 *      put:
 *          tags: [Product]
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
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                              price:
 *                                  type: number
 *                              quantity:
 *                                  type: integer
 *                              category:
 *                                  type: string
 *                              description:
 *                                  type: string
 *                              rating:
 *                                  type: integer
 *                      example:
 *                              name: test
 *                              price: 25.54
 *                              quantity: 20
 *                              category: tests
 *                              description: Test product
 *                              rating: 5
 *          responses:
 *              200:
 *                  description: The product was successfully updated
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: The product was not found
 *              406:
 *                  description: Not Acceptable, data validation error
 */
//#endregion
ProductRouter.put('/:id', IdValidator, ProductValidator, ProductController.update)

//#region Delete By ID
/**
 * @swagger
 *  /product/{id}:
 *      delete:
 *          tags: [Product]
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
ProductRouter.delete('/:id', IdValidator, ProductController.delete)

module.exports = ProductRouter
