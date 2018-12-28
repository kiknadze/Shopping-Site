import React, { Component } from 'react';
import SearchProduct from "./SearchProduct"
import GetCategory from "./GetCategory"
import Pagenation from './Pagenation';
const userURL = "http://localhost:5000/db/products";

//Mariami
//Filters and Searches Product
class ProductFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: "4",
            categoryChoose: false,
            colorChoose: false,
            materialChoose: false,
            categoryDate: [],
            material: [],
            color: "",
            products: [],
            matchProduct: [],
          
        }
    }
    componentDidMount() {
        this.GetProduct();

    }//get category from user
    handleClick = (e) => {
        this.setState({ category: e.target.id })
        this.setState({ colorChoose: false })
        this.setState({ categoryChoose: true })

    }//get choosen color from user
    colorClick = (e) => {
        this.setState({ color: e.target.id })
        this.setState({ colorChoose: true })


    }//get choosen material from user
    handleChange = (e) => {

        let materialArray = this.state.material

        if (!materialArray.includes(e.target.id)) {
            materialArray.push(e.target.id)
            this.setState({ material: materialArray })
            this.setState({ materialChoose: true })
        } else {
            let index = materialArray.indexOf(e.target.id)
            materialArray.splice(index, 1);
            this.setState({ material: materialArray })
            this.setState({ materialChoose: true })
        }
        if (materialArray.length === 0) {
            this.setState({ materialChoose: false })
        }

    }//get whole existing product and save them in state
    GetProduct = () => {
        fetch(userURL)
            .then(products => products.json())
            .then(products => {
                this.setState({ products })

            })
            .catch(err => console.log(err));


    }//searching product by name and description
    onSearch = (e) => {
        let matchProduct = [];
        let search = new RegExp(e.target.value, 'gi');

        this.state.products.forEach((item, index) => {
            if ((item.name.match(search) || item.desc.match(search)) && (!matchProduct.includes(item))) {
                matchProduct.push(item)
            } else if (matchProduct.includes(item)) {
                matchProduct.splice(index, 1);
            }
        })
        if (!matchProduct.length || e.target.value === "") {
            this.setState({ matchProduct: [] })
        } else {
            this.setState({ matchProduct: matchProduct })
        }

    }

    render() {
      
        return (
            <div className="proFilter">
                <div className="proFilter--details">
                    <div className="proFilter--sidebar">
                        <div className="proFilter-categories">
                            <h4>CATEGORIES</h4>
                            <div className="proFilter-categories--menu">
                                <div id="1" onClick={this.handleClick} className="menu--cate">Tables</div>
                                <div id="2" onClick={this.handleClick} className="menu--cate">Chairs</div>
                                <div id="3" onClick={this.handleClick} className="menu--cate">Decores</div>
                                <div id="4" onClick={this.handleClick} className="menu--cate">Beds</div>
                            </div>

                        </div>
                        <div className="proFilter-material">
                            <h4>Material</h4>
                            <div className="proFilter-material-menu">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" onChange={this.handleChange} value="" id="1"></input>
                                    <label className="form-check-label" htmlFor="wood">Wood</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" onChange={this.handleChange} value="" id="2"></input>
                                    <label className="form-check-label" htmlFor="metal">Metal</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" onChange={this.handleChange} value="" id="3"></input>
                                    <label className="form-check-label" htmlFor="plastic">Plastic</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" onChange={this.handleChange} value="" id="4"></input>
                                    <label className="form-check-label" htmlFor="glass">Glass</label>
                                </div>
                            </div>
                        </div>
                        <div className="proFilter-color">
                            <h4>Colors</h4>
                            <div className="proFilter-color--menu">
                                <div className="color1" id="1" onClick={this.colorClick}></div>
                                <div className="color2" id="2" onClick={this.colorClick}></div>
                                <div className="color3" id="3" onClick={this.colorClick}></div>
                                <div className="color4" id="4" onClick={this.colorClick}></div>
                                <div className="color5" id="5" onClick={this.colorClick}></div>
                                <div className="color6" id="6" onClick={this.colorClick}></div>
                            </div>
                        </div>
                    </div>
                    <div className="proFilter--img">
                        <div className="searchProduct">
                            <div><SearchProduct onSearch={this.onSearch} /> </div>
                        </div>
                        {!this.state.matchProduct.length ? <GetCategory matchProduct={this.state.matchProduct}//displays the filtered product
                            color={this.state.color}
                            material={this.state.material}
                            category={this.state.category}
                            categoryChoose={this.state.categoryChoose}
                            colorChoose={this.state.colorChoose}
                            materialChoose={this.state.materialChoose}
                            products={this.state.products}
                            handleClick={this.handleClick}
                            colorClick={this.colorClick}
                            handleChange={this.handleChange}
                           
                           

                        /> :
                            <div className="container--product--container">
                                <div className="container--product">
                                    {
                                     <Pagenation arr={this.state.matchProduct}/>//numbers the pages 
                                    }
                                </div>
                            </div>}
                    </div>
                </div>
            </div>

        );
    }
}

export default ProductFilter;