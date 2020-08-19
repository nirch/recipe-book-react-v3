import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './RecipeCard.css'

class RecipeCard extends Component {

    constructor(props) {
        super(props);
    }
    

    render() {

        const { recipe } = this.props;

        return (
            <Card className="c-recipe-card">
                <Card.Img variant="top" src={recipe.img} />
                <Card.Body>
                    <Card.Title>{recipe.name}</Card.Title>
                    <Card.Text>
                        {recipe.desc}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default RecipeCard;