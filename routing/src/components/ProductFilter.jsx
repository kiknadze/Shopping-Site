import React, { Component } from 'react';
const userURL = "http://localhost:5000/db/products";



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
            products: []
        }
    }
    componentDidMount() {
        this.GetProduct();

    }
    handleClick = (e) => {
        this.setState({ category: e.target.id })
        this.setState({ colorChoose: false })
        this.setState({ categoryChoose: true })
    }
    colorClick = (e) => {
        this.setState({ color: e.target.id })
        this.setState({ colorChoose: true })
        console.log(e.target.id)
    }
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
        if (materialArray.length == 0) {
            this.setState({ materialChoose: false })
        }
    }
    GetProduct = () => {
        fetch(userURL)
            .then(products => products.json())
            .then(products => {
                this.setState({ products })
                console.log(this.state.products)
            })
            .catch(err => console.log(err));


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
                                    <label className="form-check-label" for="wood">Wood</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" onChange={this.handleChange} value="" id="2"></input>
                                    <label className="form-check-label" for="metal">Metal</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" onChange={this.handleChange} value="" id="3"></input>
                                    <label className="form-check-label" for="plastic">Plastic</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" onChange={this.handleChange} value="" id="4"></input>
                                    <label className="form-check-label" for="glass">Glass</label>
                                </div>


                            </div>
                            {console.log(this.state.material)}
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
                        {/* <div className="proFilter-price">
                            <h4>Price</h4>
                            <div className="proFilter-price--menu">
                            </div>
                        </div> */}

                    </div>
                    <div className="proFilter--img">
                        {
                            this.state.products
                                .filter(product => product.category == this.state.category && !this.state.colorChoose && !this.state.materialChoose)
                                .map((product) =>
                                    <div><img alt="NO" src={product.url} width="70%"></img>1</div>

                                )
                        }
                        {
                            this.state.products
                                .filter(product => product.color == this.state.color && product.category == this.state.category && !this.state.materialChoose)
                                .map((product) =>
                                    <div><img alt="NO" src={product.url} width="70%"></img>2</div>
                                )
                        }
                        {
                            this.state.products
                                .filter(product => product.color == this.state.color && !this.state.categoryChoose && this.state.colorChoose && !this.state.materialChoose)
                                .map((product) =>
                                    <div><img alt="NO" src={product.url} width="70%"></img>3</div>
                                )
                        }
                        {
                            this.state.products
                                .filter(product => this.state.material.includes(product.material) && product.category == this.state.category && this.state.categoryChoose && !this.state.colorChoose)
                                .map((product) =>
                                    <div><img alt="NO" src={product.url} width="70%"></img>4</div>
                                )
                        }
                        {
                            this.state.products
                                .filter(product => this.state.material.includes(product.material) && !this.state.categoryChoose && this.state.materialChoose)
                                .map((product) =>
                                    <div><img alt="NO" src={product.url} width="70%"></img>5</div>
                                )
                        }
                        {
                            this.state.products
                                .filter(product => this.state.material.includes(product.material) && product.category == this.state.category && this.state.categoryChoose && this.state.materialChoose
                                    && product.color == this.state.color && this.state.colorChoose)
                                .map((product) =>
                                    <div><img alt="NO" src={product.url} width="70%"></img>6</div>
                                )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductFilter;