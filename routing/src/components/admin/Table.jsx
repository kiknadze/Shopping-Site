import React from 'react';

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
                    <td>{Product.price} GEL</td>
                    <td><i className="fas fa-edit" onClick={() => props.EditProductHandler(Product.id)} ></i></td>
                    <td><i className="far fa-trash-alt" onClick={() => props.DeleteProductHandler(Product.id)}></i></td>
                </tr>
            ))}

        </tbody>
    </table>
)
export default Table;