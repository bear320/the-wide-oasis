import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { IBooking } from "../../types";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import styled from "styled-components";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isLoadingBookings } = useRecentBookings();
  const { numDays, stays, confirmedStays, isLoadingStays } = useRecentStays();
  const { cabins, isFetching: isLoadingCabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings as IBooking[]}
        confirmedStays={confirmedStays as IBooking[]}
        numDays={numDays}
        cabinCount={Number(cabins?.length)}
      />
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
