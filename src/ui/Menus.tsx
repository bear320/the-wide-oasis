import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface IListProps {
  $position: { x: number; y: number };
}

const StyledList = styled.ul<IListProps>`
  position: absolute;
  top: ${(props) => props.$position.y}px;
  right: ${(props) => props.$position.x}px;
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  z-index: 1;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 1.2rem 2.4rem;
  width: 100%;
  border: none;
  background: none;
  font-size: 1.4rem;
  text-align: left;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface IMenusProps {
  openId: string;
  open: (name: string) => void;
  close: () => void;
  position: { x: number; y: number } | null;
  setPosition: (position: { x: number; y: number } | null) => void;
}

const MenusContext = createContext<IMenusProps>({
  openId: "",
  open: () => {},
  close: () => {},
  position: null,
  setPosition: () => {},
});

const Menus = ({ children }: { children: React.ReactNode }) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState<null | { x: number; y: number }>(null);

  const open = (id: string) => setOpenId(id);
  const close = () => setOpenId("");

  return (
    <MenusContext.Provider value={{ openId, close, open, position, setPosition }}>{children}</MenusContext.Provider>
  );
};

const Toggle = ({ id }: { id: string }) => {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  const handleClick = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).closest("button")!.getBoundingClientRect();

    setPosition({
      x: -8,
      y: rect.height + 8,
    });

    const shouldOpen = openId === "" || openId !== id;
    if (shouldOpen) open(id);
    else close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close);

  if (openId !== id) return null;

  return (
    <StyledList $position={position!} ref={ref as unknown as React.RefObject<HTMLUListElement>}>
      {children}
    </StyledList>
  );
};

const Button = ({
  icon,
  children,
  disabled,
  onClick,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  const { close } = useContext(MenusContext);
  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton disabled={disabled} onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
