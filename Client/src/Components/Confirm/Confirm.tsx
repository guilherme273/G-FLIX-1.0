import { AlertTriangle } from "lucide-react";
import "./Confirm.Style.css";

interface ConfirmProps {
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  mensagem?: string;
}

const Confirm: React.FC<ConfirmProps> = ({
  setOpenConfirm,
  onConfirm,
  mensagem,
}) => {
  const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onConfirm(); // chama a função passada pelo pai
    setOpenConfirm(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenConfirm(false);
  };

  return (
    <section className="section-confirm">
      <div className="div-confirm">
        <AlertTriangle className="icon-confirm" />

        <p className="text-confirmation">{mensagem ?? "Tem certeza?"}</p>
        <div className="buttons-confirm">
          <button onClick={handleConfirm}>Confirmar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
    </section>
  );
};

export default Confirm;
