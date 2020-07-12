import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Seating = ({ bookingsProps }) => {
  const getStatusClass = (status) => {
    if (status === 'Seated') {
      return 'text-white bg-success';
    } else if (status === 'Not Arrived') {
      return 'text-white bg-danger';
    } else {
      return '';
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
            <tr key={id}>
              <td>{id}</td>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{numberOfGuests}</td>
              <td>{date}</td>
              <td>{phone}</td>
              <td>{email}</td>
              <td className={getStatusClass(status)}>{status}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  return !bookingsProps || !bookingsProps.length ? (
    <p className="text-center mt-3">Sorry, there is no any booking to show!</p>
  ) : (
    <Container className="table-responsive mt-3">
      <h1 className="text-center">Seating Data</h1>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Booking Ref</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Number of Guests</th>
            <th scope="col">Dining Date</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        {renderTableData()}
      </table>
    </Container>
  );
};

Seating.propTypes = {
  bookingsProps: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    bookingsProps: state.bookings,
  };
};

export default connect(mapStateToProps)(Seating);
