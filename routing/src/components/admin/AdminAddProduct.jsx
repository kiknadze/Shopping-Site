import React, { Component } from 'react';
import Table from './Table';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 

import Category from '../../db/category.json';
import Color from '../../db/colors.json';
import Material from '../../db/material.json';

const productUrl = 'http://localhost:5000/db/products';

export default class AdminAddProduct extends Component {
    constructor(props) {
        super(props)

        this.url = React.createRef();
        this.name = React.createRef();
        this.category = React.createRef();
        this.desc = React.createRef();
        this.material = React.createRef();
        this.color = React.createRef();
        this.price = React.createRef();

        this.state = {
            //product table items
            productTableItems: ['#', 'Image', 'Name', 'Category', 'Description', 'Material', 'Color', 'Price', 'Edit', 'Delete'],
            product: [], //product array before fetch
            editProduct: null,
        }
    }

    componentDidMount() {
        this.GetProduct();
        console.log("temo")
    }

    //Get products from DB
    GetProduct = () => {
        fetch(productUrl)
            .then(product => product.json())
            .then(product => {
                this.setState({ product })
            })
            .catch(err => console.log(err))
    };

    //Add products value
    onSubmit = (e) => {
        e.preventDefault();
        this.AddProducts(
            this.url.current.value,
            this.name.current.value,
            this.category.current.value,
            this.desc.current.value,
            this.price.current.value,
            this.color.current.value,
            this.material.current.value
        )
    };

    //Adding products
    AddProducts = (url, name, category, desc, price, color, material) => {
        fetch('http://localhost:5000/admin/product/add', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url, name, category, desc, price, color, material })
        })
            .then(res => res.json())
            .then(product => {
                this.setState({ product })
            })
            .catch(err => console.log(err))
    };

    //Delete product
    DeleteProductHandler = (id) => {
        confirmAlert({
            title: 'Delete Prodcut',
            message: 'Are you sure to do Delete?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.DeleteProduct(id)
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
        });
    };

    //Delete product by ID
    DeleteProduct = (id) => {
        fetch(`http://localhost:5000/admin/product/delete`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        })
            .then(res => res.json())
            .then(product => {
                this.setState({ product })
            }) 
            .catch(err => console.log(err))
    };

    //Edit Product
    EditProductHandler = (id) => {
        window.scrollTo(0, 0);
        let findProduct;
        findProduct = this.state.product[this.state.product.findIndex(index => index.id === id)];
        this.setState(()=>({ editProduct: findProduct }))
    }

    ProductCategory = () => {
        let option = [];
        for (let i = 0; i < Category.length; i++) {
            option.push(
                !!this.state.editProduct ? (this.state.editProduct.category === Category[i].id ? 
                <option key={i} selected value={Category[i].id}>{Category[i].name}</option> : 
                <option key={i} value={Category[i].id}>{Category[i].name}</option>) : 
                <option key={i} value={Category[i].id}>{Category[i].name}</option>
            )
        }
        return option;
    };

    ProductColor = () => {
        let color = [];
        for (let i = 0; i < Color.length; i++) {
            color.push(
                !!this.state.editProduct ? (this.state.editProduct.color === Color[i].id ? 
                <option key={i} selected value={Color[i].id}>{Color[i].name}</option> : 
                <option key={i} value={Color[i].id}>{Color[i].name}</option>) : 
                <option key={i} value={Color[i].id}>{Color[i].name}</option>
            )
        }
        return color;
    };

    ProductMaterial = () => {
        let material = [];
        for (let i = 0; i < Material.length; i++) {
            material.push(
                !!this.state.editProduct ? (this.state.editProduct.material === Material[i].id ? 
                <option key={i} selected value={Material[i].id}>{Material[i].name}</option> : 
                <option key={i} value={Material[i].id}>{Material[i].name}</option>) : 
                <option key={i} value={Material[i].id}>{Material[i].name}</option>
            )
        }
        return material;
    };

    PrintCategory = (categoryID) => {
        return Category[categoryID - 1].name
    };

    PrintColor = (colorID) => {
        return Color[colorID - 1].name
    };

    PrintMaterial = (materialID) => {
        return Material[materialID - 1].name
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="name">Name</label>
                            <input type="text" className="form-control" id="name" ref={this.name} value={!!this.state.editProduct ? this.state.editProduct.name : ''} placeholder="Product Name" required />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="category">Category</label>
                            <select id="category" ref={this.category} className="form-control">
                                {this.ProductCategory()}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="url">Image</label>
                        <input type="text" className="form-control" id="url" ref={this.url} value={!!this.state.editProduct ? this.state.editProduct.url : ''} placeholder="Image URL" required />
                    </div>
                    <div className="form-group">
                        <label for="desc">Description</label>
                        <textarea className="form-control" id="desc" rows="3" ref={this.desc} value={!!this.state.editProduct ? this.state.editProduct.desc : ''} ></textarea>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label for="color">Color</label>
                            <select id="color" ref={this.color} className="form-control">
                                {this.ProductColor()}
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label for="material">Material</label>
                            <select id="material" ref={this.material} className="form-control">
                                {this.ProductMaterial()}
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label for="price">Price</label>
                            <input type="number" className="form-control" id="price" ref={this.price} value={!!this.state.editProduct ? this.state.editProduct.price : ''} required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success">Add Product</button>
                </form>

                <Table
                    productTableItems={this.state.productTableItems}
                    product={this.state.product}
                    PrintCategory={this.PrintCategory}
                    PrintMaterial={this.PrintMaterial}
                    PrintColor={this.PrintColor}
                    DeleteProductHandler={this.DeleteProductHandler}
                    EditProductHandler={this.EditProductHandler}
                />
            </div>
        )
    }
}
