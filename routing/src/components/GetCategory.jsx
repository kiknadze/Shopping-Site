import React from 'react';

import Pagenation from './Pagenation';

//Mariami
//Filters the whole existing product and saves only filtered product in array
export default function GetCategory(props) {
    let arr = [];
   

    return (
        <div>

            {

                props.products
                    .filter(product => product.category === props.category && !props.colorChoose && !props.materialChoose && props.matchProduct.length === 0)
                    .map((product, index) => { arr.push(product) }
                    )
            }




            {
                props.products
                    .filter(product => product.color === props.color && product.category === props.category && !props.materialChoose)
                    .map((product, index) => { arr.push(product) }
                    )
            }

            {
                props.products
                    .filter(product => product.color === props.color && !props.categoryChoose && props.colorChoose && !props.materialChoose)
                    .map((product, index) => { arr.push(product) }
                    )
            }

            {
                props.products
                    .filter(product => props.material.includes(product.material) && product.category === props.category && props.categoryChoose && !props.colorChoose)
                    .map((product, index) => { arr.push(product) }
                    )
            }

            {
                props.products
                    .filter(product => props.material.includes(product.material) && !props.categoryChoose && props.materialChoose)
                    .map((product, index) => { arr.push(product) }
                    )
            }

            {
                props.products
                    .filter(product => props.material.includes(product.material) && product.category === props.category && props.categoryChoose && props.materialChoose
                        && product.color === props.color && props.colorChoose)
                    .map((product, index) => { arr.push(product) }
                    )
            }
            <Pagenation arr={arr} />


        </div>


    )
}

