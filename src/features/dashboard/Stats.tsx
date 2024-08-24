import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import { IBooking } from "../../types";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: {
  bookings: IBooking[];
  confirmedStays: IBooking[];
  numDays: number;
  cabinCount: number;
}) => {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkIns = confirmedStays.length;
  const occupancyRate = `${Math.round(
    (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount)) * 100
  )}%`;

  return (
    <>
      <Stat title="Bookings" value={numBookings} color="blue" icon={<HiOutlineBriefcase />} />
      <Stat title="Sales" value={formatCurrency(sales)} color="green" icon={<HiOutlineBanknotes />} />
      <Stat title="Check-ins" value={checkIns} color="indigo" icon={<HiOutlineCalendarDays />} />
      <Stat title="Occupancy rate" value={occupancyRate} color="yellow" icon={<HiOutlineChartBar />} />
    </>
  );
};

export default Stats;
