import React, {Component, component} from 'react';
import Aux from '../../hoc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 15,
    cheese: 20,
    meat: 30,
    bacon: 20
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {}
    // }
    state = {
        ingredient: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 30,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState (ingredient) {
       
        const sum = Object.keys(ingredient)
            .map(igKey => {
                return ingredient[igKey];
            })
            .reduce((sum, el) =>{
                return sum + el;
            }, 0);

            this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredient[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredient 
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( {totalPrice: newPrice, ingredient: updatedIngredients} );
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredient[type];
        if(oldCount <=0 ){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredient 
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( {totalPrice: newPrice, ingredient: updatedIngredients} );
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () =>{
        alert('You Continue');
    }
    render (){
        const disabledInfo = {
            ...this.state.ingredient
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler }>
                    <OrderSummary 
                        purchaseCancelled = {this.purchaseCancelHandler}
                        purchaseContinued = {this.purchaseContinueHandler}
                        price = {this.state.totalPrice}
                        ingredient={this.state.ingredient}/>
                </Modal>
                <Burger ingredient={this.state.ingredient}/>
                <BuildControls
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                    price={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;