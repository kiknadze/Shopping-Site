import React from 'react';

const ShowOrders = (props) => (
    <table className="table table-hover table--order">
        <thead>
            <tr>
                {props.orderTableItems.map(item => <th key={item} scope="col">{item}</th>)}
            </tr>
        </thead>
        <tbody>
            {props.orders.map((order, index) => (
                <tr key={index}>
                    <th scope="row">{index}</th>
                    <td><img src={order.url} alt="NOIMAGE" /></td>
                    <td>{order.name}</td>
                    <td>{order.desc}</td>
                    <td>{order.price} GEL</td>
                    <td>{order.quantity}</td>
                </tr>
            ))}
        </tbody>
    </table>
)
export default ShowOrders;