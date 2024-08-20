import styled from "styled-components";
import { format, isToday } from "date-fns";
import { IBookingProps } from "../../types";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  // booking: {
  //   id: bookingId,
  //   created_at,
  //   startDate,
  //   endDate,
  //   numNights,
  //   numGuests,
  //   totalPrice,
  //   status,
  //   guests: { fullName: guestName, email },
  //   cabins: { name: cabinName },
  // },
  booking,
}: {
  booking: IBookingProps;
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{booking.cabins.name}</Cabin>

      <Stacked>
        <span>{booking.guests.fullName}</span>
        <span>{booking.guests.email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(booking.startDate))
            ? "Today"
            : formatDistanceFromNow(booking.startDate)}{" "}
          &rarr; {booking.numNights} night stay
        </span>
        <span>
          {format(new Date(booking.startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(booking.endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag $type={statusToTagName[booking.status]}>
        {booking.status.replace("-", " ")}
      </Tag>

      <Amount>{formatCurrency(booking.totalPrice)}</Amount>
    </Table.Row>
  );
}

export default BookingRow;
