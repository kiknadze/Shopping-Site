import React from 'react';
import { Link } from 'react-router-dom';

export default function GetCategory(props) {
    return (
        <div className="container--product--container">
            <div className="container--product">
                {

                    props.products
                        .filter(product => product.category === props.category && !props.colorChoose && !props.materialChoose && props.matchProduct.length === 0)
                        .map((product, index) =>
                            <div key={index} className="container--product--wrapper">
                                <Link to={`/products/${product.id}`} key={index} ><div className="image"><img alt="NO" src={product.url} ></img></div></Link>
                                <div className="line"></div>
                                <div className="proPrice">{product.price}ლ</div>
                                <div className="proName">{product.name}</div>
                            </div>
                        )

                }


                {
                    props.products
                        .filter(product => product.color === props.color && product.category === props.category && !props.materialChoose)
                        .map((product, index) =>
                            <div key={index} className="container--product--wrapper">
                                <Link to={`/products/${product.id}`} key={index} ><div className="image"><img alt="NO" src={product.url} ></img></div></Link>
                                <div className="line"></div>
                                <div className="proPrice">{product.price}ლ</div>
                                <div className="proName">{product.name}</div>
                            </div>
                        )
                }

                {
                    props.products
                        .filter(product => product.color === props.color && !props.categoryChoose && props.colorChoose && !props.materialChoose)
                        .map((product, index) =>
                            <div key={index} className="container--product--wrapper">
                                <Link to={`/products/${product.id}`} key={index} ><div className="image"><img alt="NO" src={product.url} ></img></div></Link>
                                <div className="line"></div>
                                <div className="proPrice">{product.price}ლ</div>
                                <div className="proName">{product.name}</div>
                            </div>
                        )
                }

                {
                    props.products
                        .filter(product => props.material.includes(product.material) && product.category === props.category && props.categoryChoose && !props.colorChoose)
                        .map((product, index) =>
                            <div key={index} className="container--product--wrapper">
                                <Link to={`/products/${product.id}`} key={index} ><div className="image"><img alt="NO" src={product.url} ></img></div></Link>
                                <div className="line"></div>
                                <div className="proPrice">{product.price}ლ</div>
                                <div className="proName">{product.name}</div>
                            </div>
                        )
                }

                {
                    props.products
                        .filter(product => props.material.includes(product.material) && !props.categoryChoose && props.materialChoose)
                        .map((product, index) =>
                            <div key={index} className="container--product--wrapper">
                                <Link to={`/products/${product.id}`} key={index} ><div className="image"><img alt="NO" src={product.url} ></img></div></Link>
                                <div className="line"></div>
                                <div className="proPrice">{product.price}ლ</div>
                                <div className="proName">{product.name}</div>
                            </div>
                        )
                }

                {
                    props.products
                        .filter(product => props.material.includes(product.material) && product.category === props.category && props.categoryChoose && props.materialChoose
                            && product.color === props.color && props.colorChoose)
                        .map((product, index) =>
                            <div key={index} className="container--product--wrapper">
                                <Link to={`/products/${product.id}`} key={index} ><div className="image"><img alt="NO" src={product.url} ></img></div></Link>
                                <div className="line"></div>
                                <div className="proPrice">{product.price}ლ</div>
                                <div className="proName">{product.name}</div>
                            </div>
                        )
                }
            </div>

        </div>

    )
}
