import { useSearchParams } from "react-router-dom";
import { useCabins } from "./useCabins";
import { ICabin } from "../../types";
import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menus";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";

const CabinTable = () => {
  const [searchParams] = useSearchParams();
  const { cabins, isFetching } = useCabins();

  if (isFetching) return <Spinner />;

  // Filter
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins: ICabin[] = [];

  if (filterValue === "all") filteredCabins = [...(cabins as ICabin[])];
  else if (filterValue === "with-discount")
    filteredCabins = (cabins as ICabin[])?.filter(
      (cabin) => cabin.discount > 0
    );
  else if (filterValue === "no-discount")
    filteredCabins = (cabins as ICabin[])?.filter(
      (cabin) => cabin.discount === 0
    );

  // Sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-") as [
    keyof ICabin,
    "asc" | "desc"
  ];
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (+a[field] - +b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins!}
          render={(cabin: ICabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
