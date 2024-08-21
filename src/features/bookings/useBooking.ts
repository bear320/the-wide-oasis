import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

export const useBooking = () => {
  const { bookingId } = useParams();

  const {
    data: booking,
    isPending: isFetching,
    error,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(+bookingId!),
    retry: false,
  });

  return { booking, isFetching, error };
};
