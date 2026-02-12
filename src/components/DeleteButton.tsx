interface DeleteButtonProps {
  onDelete: () => void;
  carName: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete, carName }) => {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer ${carName} ?`
    );
    if (confirmed) {
      onDelete();
    }
  };

  return (
    <button className="delete-btn" onClick={handleDelete} title={`Supprimer ${carName}`}>
      🗑️ Supprimer
    </button>
  );
};
