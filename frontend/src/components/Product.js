import React from 'react'
import {Card} from "react-bootstrap";

const Products = ({product}) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <div>
                <Card.Img src={product.image} variant='top'/>
            </div>

            <Card.Body>
                <Card.Title as='div'>
                    <strong>
                        {product.name}
                    </strong>
                </Card.Title>
            </Card.Body>
            <Card.Text as='div'>
                <div className='my-3'>
                    {product.rating} from {product.numReviews} reviews
                </div>
            </Card.Text>
            <Card.Text as='h3'>${product.price}</Card.Text>
        </Card>
    )
};

export default Products
