import React, { Component } from 'react';
import Table from './Table';
import Search from './Search';
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
            id: '',
            name: '',
            url: '',
            desc: '',
            category: '0',
            material: '0',
            color: '0',
            price: ''
        }
    }

    componentDidMount() {
        this.GetProduct();
    }

    //Search Product
    onSearch = (e) => {
        let matchProduct = [];
        let search = new RegExp(e.target.value, 'gi');
        this.state.product.forEach((item, index) => {
            if(item.name.match(search) && (!matchProduct.includes(item))) {
                matchProduct.push(item)
            } else if(matchProduct.includes(item)){
                matchProduct.splice(index, 1);
            }
        })

        if(!matchProduct.length || e.target.value === '') {
            this.GetProduct() 
        } else { 
            this.setState({ product: matchProduct })
        }
    }

    //set products inputs
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    //Get products from DB
    GetProduct = () => {
        fetch(productUrl)
            .then(product => product.json())
            .then(product => {
                this.setState({ product })
            })
            .catch(err => console.log(err))
    };

    //reset input values
    onReset = (e) => {
        e.preventDefault();
        this.setState({ 
            id: '',
            name: '', 
            url: '', 
            desc: '',
            color: '0',
            category: '0',
            material: '0',
            price: ''
        });
    }

    //Add products value
    onSubmit = (e) => {
        e.preventDefault();
        this.AddProducts(
            this.state.id,
            this.url.current.value,
            this.name.current.value,
            this.category.current.value,
            this.desc.current.value,
            this.price.current.value,
            this.color.current.value,
            this.material.current.value
        )
        this.setState({
            id: '', 
            name: '', 
            url: '', 
            desc: '',
            color: '0',
            category: '0',
            material: '0',
            price: ''
        });
    };

    //Adding products
    AddProducts = (id, url, name, category, desc, price, color, material) => {
        fetch('http://localhost:5000/admin/product/add', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, url, name, category, desc, price, color, material })
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

        this.setState({ 
            id: findProduct.id,
            name: findProduct.name, 
            url: findProduct.url, 
            desc: findProduct.desc,
            color: findProduct.color,
            category: findProduct.category,
            material: findProduct.material,
            price: findProduct.price 
        });
    }

    //print product category for option 
    ProductCategory = () => {
        let option = [];
        for (let i = 0; i < Category.length; i++) {
            option.push(
                this.state.category ? (this.state.category === Category[i].id ? 
                <option key={i} selected value={Category[i].id}>{Category[i].name}</option> : 
                <option key={i} value={Category[i].id}>{Category[i].name}</option>) : 
                <option key={i} value={Category[i].id}>{Category[i].name}</option>
            )
        }
        return option;
    };

    //print product color for option 
    ProductColor = () => {
        let color = [];
        for (let i = 0; i < Color.length; i++) {
            color.push(
                this.state.color ? (this.state.color === Color[i].id ? 
                <option key={i} selected value={Color[i].id}>{Color[i].name}</option> : 
                <option key={i} value={Color[i].id}>{Color[i].name}</option>) : 
                <option key={i} value={Color[i].id}>{Color[i].name}</option>
            )
        }
        return color;
    };

    //print product material for option 
    ProductMaterial = () => {
        let material = [];
        for (let i = 0; i < Material.length; i++) {
            material.push(
                this.state.material ? (this.state.material === Material[i].id ? 
                <option key={i} selected value={Material[i].id}>{Material[i].name}</option> : 
                <option key={i} value={Material[i].id}>{Material[i].name}</option>) : 
                <option key={i} value={Material[i].id}>{Material[i].name}</option>
            )
        }
        return material;
    };
    //get Category name
    PrintCategory = (categoryID) => {
        return Category[categoryID - 1].name
    };
    //get color name
    PrintColor = (colorID) => {
        return Color[colorID - 1].name
    };
    //get material name
    PrintMaterial = (materialID) => {
        return Material[materialID - 1].name
    };

    render() {
        return (
            <div>
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" name="name" ref={this.name} value={this.state.name} onChange={this.onChange} placeholder="Product Name" required />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="category">Category</label>
                            <select id="category" ref={this.category} className="form-control">
                                {this.ProductCategory()}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">Image</label>
                        <input type="text" className="form-control" id="url" name="url" ref={this.url} value={this.state.url} onChange={this.onChange} placeholder="Image URL" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <textarea className="form-control" id="desc" name="desc" rows="3" ref={this.desc} value={this.state.desc} onChange={this.onChange} ></textarea>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="color">Color</label>
                            <select id="color" ref={this.color} className="form-control">
                                {this.ProductColor()}
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="material">Material</label>
                            <select id="material" ref={this.material} className="form-control">
                                {this.ProductMaterial()}
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="price">Price</label>
                            <input type="number" className="form-control" id="price" name="price" ref={this.price} value={this.state.price} onChange={this.onChange} required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success" onClick={this.onSubmit} >{!!this.state.id ? 'Update Product' : 'Add Product'}</button>
                    <button type="reset" id="btn--reset" className="btn btn-danger" onClick={this.onReset} >Cancel</button>
                </form>
                <Search onSearch={this.onSearch} />
                <Table
                    productTableItems={this.state.productTableItems}
                    product={this.state.product}
                    PrintCategory={this.PrintCategory}
                    PrintMaterial={this.PrintMaterial}
                    PrintColor={this.PrintColor}
                    DeleteProductHandler={this.DeleteProductHandler}
                    EditProductHandler={this.EditProductHandler}
                    isSearch={this.state.isSearch}
                />
            </div>
        )
    }
}
