import React from 'react';

const TableHead = (props) => (
        <thead>
            <tr>
                {props.productTableItems.map(item => <th scope="col">{item}</th> )}
            </tr>
        </thead>
)

export default TableHead;