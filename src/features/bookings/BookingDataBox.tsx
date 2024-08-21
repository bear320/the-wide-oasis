import { IBookingDetailsProps } from "../../types";
import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";
import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

const StyledBookingDataBox = styled.section`
  /* Box */
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  background-color: var(--color-brand-500);
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;

  svg {
    width: 3.2rem;
    height: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-size: 1.8rem;
    font-weight: 600;
  }

  & span {
    margin-left: 4px;
    font-family: "Sono";
    font-size: 2rem;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    color: var(--color-grey-700);
    font-weight: 500;
  }
`;

interface IPriceProps {
  $isPaid: boolean;
}

const Price = styled.div<IPriceProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.4rem;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  background-color: ${(props) =>
    props.$isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.$isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  color: var(--color-grey-500);
  font-size: 1.2rem;
  text-align: right;
`;

// A purely presentational component
function BookingDataBox({ booking }: { booking: IBookingDetailsProps }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: {
      fullName: guestName,
      email,
      nationalID,
      nationality,
      nationalFlag,
    },
    cabins: { name: cabinName },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          {nationalFlag && (
            <Flag src={nationalFlag} alt={`Flag of ${nationality}`} />
          )}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <Price $isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
