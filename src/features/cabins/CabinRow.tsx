import { useDuplicateCabin } from "./useDuplicateCabin";
import { useDeleteCabin } from "./useDeleteCabin";
import { ICabin } from "../../types";
import { formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }: { cabin: ICabin }) => {
  const { duplicateCabin, isDuplicating } = useDuplicateCabin();
  const { deleteCabin, isDeleting } = useDeleteCabin();

  const { id: cabinId, name, description, maxCapacity, regularPrice, discount, image } = cabin;

  const handleDuplicate = () => {
    duplicateCabin({
      name: `Copy of ${name}`,
      description,
      maxCapacity,
      regularPrice,
      discount,
      image,
    });
  };

  return (
    <Table.Row>
      <Img src={image.toString()} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId.toString()} />

            <Menus.List id={cabinId.toString()}>
              <Menus.Button icon={<HiSquare2Stack />} disabled={isDuplicating} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete resourceName="cabins" disabled={isDeleting} onConfirm={() => deleteCabin(cabinId)} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
