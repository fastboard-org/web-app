import QuestionModal from "@/components/shared/QuestionModal";

export default function DeleteActionModal({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
}) {
  return (
    <QuestionModal
      titleText="Delete item"
      questionText="Are you sure you want to delete this item?"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
