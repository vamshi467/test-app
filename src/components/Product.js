import React from 'react'
import PropType from 'prop-types'
import '../App.css'

const PropTypes = {
    products : PropType.array
}
const Product = (props) => {
      const {
          products
      } = props
  return (
    <div className="stock-container">
    { products && products.map((data, key) => {
      return (
        <div key={key}>
                    return (
                        <table>
                        <tbody>
                        <tr>
                            <td>
                            <h5>{data.name}</h5>
                            </td>
                            <td>
                            <h5>{data.brand}</h5>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    );
        </div>
      );
    })}
  </div>

  );
};

Product.propTypes = PropTypes
export default Product
