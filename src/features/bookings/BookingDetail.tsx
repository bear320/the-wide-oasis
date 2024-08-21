import { useNavigate } from "react-router-dom";
import { useBooking } from "./useBooking";
import { useCheckout } from "../check-in-out/useCheckout";
import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isFetching } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isFetching) return <Spinner />;

  const { id, status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag $type={statusToTagName[status as keyof typeof statusToTagName]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${booking.id}`)}>Check in</Button>
        )}

        {booking.status === "checked-in" && (
          <Button disabled={isCheckingOut} onClick={() => checkout(booking.id)}>
            Check out
          </Button>
        )}

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
