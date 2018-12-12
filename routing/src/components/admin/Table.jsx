import React from 'react';
// import { Link } from 'react-router-dom';

const Table = (props) => (
    <table className="table table-hover table-dark">
        <thead>
            <tr>
                {props.productTableItems.map(item => <th key={item} scope="col">{item}</th>)}
            </tr>
        </thead>
        <tbody>
            {props.product.map((Product, index) => (
                <tr key={index}>
                    <th scope="row">{Product.id}</th>
                    <td><img src={Product.url} alt="NOIMAGE" /></td>
                    <td>{Product.name}</td>
                    <td>{props.PrintCategory(Product.category)}</td>
                    <td>{Product.desc}</td>
                    <td>{props.PrintMaterial(Product.material)}</td>
                    <td>{props.PrintColor(Product.color)}</td>
                    <td>{Product.price}</td>
                    <td><button type="button" className="btn btn-warning" onClick={() => props.EditProductHandler(Product.id)}>Edit</button></td>
                    <td><button type="button" className="btn btn-danger" onClick={() => props.DeleteProductHandler(Product.id)}>Delete</button></td>
                </tr>
            ))}

        </tbody>
    </table>
)

export default Table;