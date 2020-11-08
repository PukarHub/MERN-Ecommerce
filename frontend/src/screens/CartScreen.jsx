import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, ListGroup,ListGroupItem, Image, Form, Button, Card} from 'react-bootstrap'
import {addToCart, removeFromCart} from '../actions/cartActions'

const CartScreen = ({match}) => {

    const productId = match.params.id

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    console.log(cartItems)
    useEffect(()=>  {
        if(productId){
            dispatch(addToCart(productId))
        }
    },[dispatch, productId])

    const removeFromCartHandler = (id) => {
       dispatch(removeFromCart(id))
    }

    const checkoutHandler = (id) => {
        console.log('checked')
    }


    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0? <h3>Your Cart is empty <Link to="/">Go Back</Link></h3> : (
                  <ListGroup variant='flush'>
                      {cartItems.map(item => (
                          <ListGroupItem key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link> 
                                </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                          <Button type='button' variant='light' onClick={()=> removeFromCartHandler(item.product)}><i className='fas fa-trash'></i></Button>
                      </Col>
                            </Row>
                          </ListGroupItem>
                      ))}
                  </ListGroup>  
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                       <ListGroupItem>
                       <h2>Total price
                       </h2>
              $
                  {cartItems
                    .reduce((acc, item) => acc+ item.price, 0)
                    .toFixed(2)}
                       </ListGroupItem>
                       <ListGroupItem>
                           <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                               Proceed to Checkout
                           </Button>
                       </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
           
        </Row>
    )
}

export default CartScreen
