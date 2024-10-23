import QuestionModal from "@/components/shared/QuestionModal";

export default function DeleteActionModal({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  titleText,
  questionText,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
  titleText?: string;
  questionText?: string;
}) {
  return (
    <QuestionModal
      titleText={titleText !== undefined ? titleText : "Delete item"}
      questionText={
        questionText !== undefined
          ? questionText
          : "Are you sure you want to delete this item?"
      }
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
