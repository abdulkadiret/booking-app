import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { markSeated } from '../redux/actions';
import PropTypes from 'prop-types';

const MyBooking = ({ getBookingProps, markSeatedProps }) => {
  const [bookingId, setBookingId] = useState('');
  const [status, setStatus] = useState(null);
  const [shouldDisplayButton, setShouldDisplayButton] = useState(false);
  const [shouldDisplaySearch, setShouldDisplaySearch] = useState(false);

  useEffect(() => {
    const { pathname } = window.location;
    const bookingId = pathname && pathname.split('/')[2];
    setBookingId(bookingId);
  }, []);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    markSeatedProps(bookingId, data.status);
    setShouldDisplayButton(false);
    e.target.reset();
  };

  const onRadioChange = (e) => {
    setStatus(e.target.value);
    setShouldDisplayButton(true);
    if (getBookingProps(bookingId).status === e.target.value) {
      setShouldDisplayButton(false);
    } else {
      setShouldDisplayButton(true);
    }
  };

  const onSearch = (id, e) => {
    setBookingId(id.bookingRefNum);
    setShouldDisplaySearch(true);
    e.target.reset();
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {Object.keys(getBookingProps(bookingId)).length ? (
        <Card className="col-md-5 d-flex flex-column align-items-center shadow my-3 px-0 bg-light rounded">
          <Card.Body>
            <dl className="row mr-0">
              <dt className="col-md-6 text-muted text-md-right pl-md-0">
                Booking Ref &#8470; :
              </dt>
              <dd className="col-md-6 list-group-item p-md-1">
                {getBookingProps(bookingId).id}
              </dd>

              <dt className="col-md-6 text-muted text-md-right pl-md-0">
                First Name :
              </dt>
              <dd className="col-md-6 list-group-item p-md-1">
                {getBookingProps(bookingId).firstName}
              </dd>

              <dt className="col-md-6 text-muted text-md-right pl-md-0">
                Last Name :
              </dt>
              <dd className="col-md-6 list-group-item p-md-1">
                {getBookingProps(bookingId).lastName}
              </dd>

              <dt className="col-md-6 text-muted text-md-right pl-md-0">
                &#8470; of Guests :
              </dt>
              <dd className="col-md-6 list-group-item p-md-1">
                {getBookingProps(bookingId).numberOfGuests}
              </dd>

              <dt className="col-md-6 text-muted text-md-right pl-md-0">
                Dining Date :
              </dt>
              <dd className="col-md-6 list-group-item p-md-1">
                {getBookingProps(bookingId).date}
              </dd>

              <dt className="col-md-6 text-muted text-md-right pl-md-0">
                Phone &#8470; :
              </dt>
              <dd className="col-md-6 list-group-item p-md-1">
                {getBookingProps(bookingId).phone}
              </dd>

              <dt className="col-md-6 text-muted text-md-right pl-md-0">
                Email :
              </dt>
              <dd className="col-md-6 list-group-item p-md-1">
                {getBookingProps(bookingId).email}
              </dd>

              {getBookingProps(bookingId).status || shouldDisplayButton ? (
                <>
                  <dt className="col-md-6 text-muted text-md-right pl-md-0">
                    Status :
                  </dt>
                  <dd
                    className="col-md-6 list-group-item p-md-1"
                    style={{ minHeight: '2rem' }}
                  >
                    {getBookingProps(bookingId).status}
                  </dd>
                </>
              ) : null}
            </dl>
          </Card.Body>
          <Card.Footer className="text-center text-muted py-2 col-md-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="text-md-right pl-md-0 mr-2">Status: </label>
              <input
                type="radio"
                name="status"
                className="mx-1"
                id="notArrived"
                ref={register}
                value="Not Arrived"
                onChange={onRadioChange}
                checked={status === 'Not Arrived'}
              />
              <label htmlFor="notArrived" className="mr-2">
                Not Arrived
              </label>
              <input
                type="radio"
                name="status"
                className="mr-1"
                id="seated"
                ref={register}
                value="Seated"
                onChange={onRadioChange}
                checked={status === 'Seated'}
              />
              <label htmlFor="seated" className="text-muted mr-2">
                Seated
              </label>
              {shouldDisplayButton ? (
                <input
                  type="submit"
                  value="Save"
                  className="btn btn-outline-success my-2 my-sm-0"
                />
              ) : null}
            </form>
            {(status !== getBookingProps(bookingId).status &&
              shouldDisplayButton === false) ||
              (shouldDisplayButton === true && (
                <p className="col-md-6 text-success mx-auto mt-3">
                  <small>
                    It looks like you have changing your status. Make sure to
                    save your change, to update your status.
                  </small>
                </p>
              ))}
          </Card.Footer>
        </Card>
      ) : (
        <>
          <form
            onSubmit={handleSubmit(onSearch)}
            className="form-inline form-group d-flex justify-content-center mt-3"
          >
            <fieldset className="col-md-8">
              <span>
                <label htmlFor="bookingRefNum" className="text-muted">
                  Enter Your Booking Ref &#8470; To See Your Booking Details and
                  Update Your Status
                </label>
                <input
                  type="search"
                  name="bookingRefNum"
                  className="form-control mr-sm-2 my-1"
                  id="search"
                  ref={register}
                  placeholder="Search"
                />
              </span>
              <span>
                <input
                  type="submit"
                  value="Search"
                  className="btn btn-outline-success my-1 my-sm-0"
                />
              </span>
            </fieldset>
          </form>
          {shouldDisplaySearch &&
            !Object.keys(getBookingProps(bookingId)).length && (
              <p className="col-md-6 text-danger">
                <small>
                  Can't get any booking with this Ref &#8470;, Please check your
                  Booking Ref &#8470; and try again.
                </small>
              </p>
            )}
        </>
      )}
    </div>
  );
};

MyBooking.propTypes = {
  getBookingProps: PropTypes.func.isRequired,
  markSeatedProps: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    getBookingProps: (bookingId) =>
      state.bookings.find((booking) => booking.id === bookingId) || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    markSeatedProps: (bookingId, status) =>
      dispatch(markSeated(bookingId, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBooking);
