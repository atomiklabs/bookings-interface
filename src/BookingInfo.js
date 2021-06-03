import React, { useEffect, useState } from 'react'
import { Grid, Card } from 'semantic-ui-react'

import { useSubstrate } from './substrate-lib'

function Main(props) {
  const { api } = useSubstrate()
  const [booking, setBooking] = useState('')

  useEffect(() => {
    let unsubscribe

    api.query.bookings
      .booking((booking) => {
        console.log('booking: ', booking.toHuman())
        setBooking(booking.toHuman())
      })
      .then((unsub) => {
        unsubscribe = unsub
      })
      .catch(console.error)

    return () => unsubscribe && unsubscribe()
  }, [api.query.bookings])

  return (
    <Grid.Column>
      <h3>Booking info:</h3>
      <Card>
        <Card.Content>
          <Card.Description>
            {booking && (
              <div style={{ overflowWrap: 'break-word' }}>
                <p>
                  <b>start:</b> {booking.start}
                </p>
                <p>
                  <b>end:</b> {booking.end}
                </p>
                <p>
                  <b>status:</b> {booking.status}
                </p>
              </div>
            )}
          </Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
  )
}

export default function BookingInfo(props) {
  const { api } = useSubstrate()

  return api.query.bookings && api.query.bookings.booking ? <Main {...props} /> : null
}
