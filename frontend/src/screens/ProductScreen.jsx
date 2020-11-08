import React, { useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import {useDispatch, useSelector} from 'react-redux'
import {listProductDetails} from '../actions/productActions'

const ProductScreen = ({match, history}) => {
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
    
    useEffect(() => {
      dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
   history.push(`/cart/${match.params.id}`)
    }

    
    return (
        <>
            <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
    {loading? <h2>Loading...</h2> : error? <h3>{error}</h3> : 
    
        <Row>
            <Col md={6}>
                <Image src={product.image} alr={product.name} fluid />
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h3>{product.name}</h3>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Rating 
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                        />
                    </ListGroupItem>
                    <ListGroupItem>
                      Price: ${product.price}  
                    </ListGroupItem>
                    <ListGroupItem>
                      Description: ${product.description}  
                    </ListGroupItem>

                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                          <Row>
                              <Col>Price:</Col>
                              <Col> <strong>{product.price}</strong></Col>
                          </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                          <Row>
                              <Col>Status:</Col>
                              <Col> <strong>{product.countInStock? 'In Stock' : 'Out of Stock'}</strong></Col>
                          </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button onClick={addToCartHandler} className='btn-block' types='button' disabled={product.countInStock === 0}>Add To Cart</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    }
        </>
    )
}

export default ProductScreen
