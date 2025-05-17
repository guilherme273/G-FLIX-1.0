import { ReactNode } from "react";
import "./ModalStyle.css";
interface ModalProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  title: string;
}
const Modal: React.FC<ModalProps> = ({ setIsOpenModal, children, title }) => {
  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleInsideClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede o clique interno de fechar o modal
  };

  return (
    <section className="outside-modal" onClick={handleClose}>
      <div className="modal" onClick={handleInsideClick}>
        <h2 className="title-modal">{title}</h2>
        {children}
      </div>
    </section>
  );
};

export default Modal;
