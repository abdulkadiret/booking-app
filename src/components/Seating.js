import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Seating = ({ bookingsProps }) => {
  const getStatusClass = (status) => {
    if (status === 'Seated') {
      return 'table-success';
    } else if (status === 'Not Arrived') {
      return 'table-danger';
    } else {
      return 'table-warning';
    }
  };

  let renderTableData = () => {
    return (
      <tbody>
        {bookingsProps.map((booking) => {
          const {
            id,
            firstName,
            lastName,
            numberOfGuests,
            date,
            phone,
            email,
            status,
          } = booking; //destructuring
          return (
            <tr key={id} className={getStatusClass(status)}>
              <td scope="row" className="pl-4">
                {id}
              </td>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{numberOfGuests}</td>
              <td>{date}</td>
              <td>{phone}</td>
              <td>{email}</td>
              <td>{status}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  return !bookingsProps || !bookingsProps.length ? (
    <p className="text-center mt-3">Sorry, there is no any booking to show!</p>
  ) : (
    <div className="table-responsive-md mt-3 mb-5">
      <h3 className="text-center">Seating Data</h3>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col" className="pl-4">
              Booking Ref &#8470;
            </th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">&#8470; of Guests</th>
            <th scope="col">Dining Date</th>
            <th scope="col">Phone &#8470;</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        {renderTableData()}
      </table>
    </div>
  );
};

Seating.propTypes = {
  bookingsProps: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    bookingsProps: state.bookings,
  };
};

export default connect(mapStateToProps)(Seating);
