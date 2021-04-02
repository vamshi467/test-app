import React from 'react'
import PropType from 'prop-types'
import '../App.css'
const PropTypes = 
{
    person : PropType.array,
}

const Person = (props) => {
    const 
    {
        person,
    } = props
    return (
        <div>
        {person && person.map((data, key) => {
          return (
            <div key={key}>
                <table>
            <tbody>
              <tr>
                <td>
                  <h5>{data.name}</h5>
                </td>
                <td>
                  <h5>{data.username}</h5>
                </td>
                <td>
                  <h4>{data.email}</h4>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
          );
})}
      </div>
    );
};
Person.propTypes = PropTypes
export default Person