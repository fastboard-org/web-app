import { Connection, Query } from "@/types/connections";
import { Button, useDisclosure } from "@nextui-org/react";
import QuestionModal from "@/components/shared/QuestionModal";
import { useCreateQuery } from "@/hooks/connections/useCreateQuery";
import { toast } from "sonner";
import { useUpdateQuery } from "@/hooks/connections/useUpdateQuery";
import { useDeleteQuery } from "@/hooks/connections/useDeleteQuery";

const QueryButtons = ({
  newMetadata,
  onSaveSuccess,
  onDeleteSuccess,
  query,
  connection,
  saveDisabled = false,
  deleteDisabled = false,
}: {
  newMetadata: () => any;
  onSaveSuccess: (query: Query) => void;
  onDeleteSuccess: () => void;
  query: Query;
  connection: Connection;
  saveDisabled?: boolean;
  deleteDisabled?: boolean;
}) => {
  const queryExists = !query?.id?.includes(" new");

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  const { createQuery, loading: createQueryLoading } = useCreateQuery({
    onSuccess: (query: Query) => {
      onSaveSuccess(query);
    },
    onError: (error: any) => {
      console.error("Error creating query", error);
      toast.error("Error creating query, try again later.");
    },
  });

  const { updateQuery, loading: updateQueryLoading } = useUpdateQuery({
    onSuccess: (query: Query) => {
      onSaveSuccess(query);
    },
    onError: (error: any) => {
      console.error("Error updating query", error);
      toast.error("Error updating query, try again later.");
    },
  });

  const { deleteQuery, loading: deleteQueryLoading } = useDeleteQuery({
    onSuccess: (data: any) => {
      onDeleteSuccess();
    },
    onError: (error: any) => {
      console.error("Error deleting query", error);
      toast.error("Error deleting query, try again later");
    },
  });

  const handleSave = () => {
    const shouldCreate = !queryExists;
    const metadataToSend = newMetadata();

    if (shouldCreate) {
      createQuery({
        name: query.name,
        connectionId: connection.id,
        metadata: {
          ...query.metadata,
          ...metadataToSend,
        },
      });
    } else {
      updateQuery({
        id: query.id,
        name: query.name,
        metadata: {
          ...query.metadata,
          ...metadataToSend,
        },
      });
    }
  };

  const handleDelete = () => {
    if (queryExists) {
      deleteQuery({
        id: query.id,
      });
    } else {
      onDeleteSuccess();
    }
  };

  return (
    <>
      <div className={"flex gap-2 items-center"}>
        <Button
          variant={"flat"}
          color={"danger"}
          size={"sm"}
          isLoading={deleteQueryLoading}
          onClick={onOpenDeleteModal}
          isDisabled={deleteDisabled}
        >
          Delete
        </Button>
        <Button
          size={"sm"}
          isLoading={updateQueryLoading || createQueryLoading}
          onClick={handleSave}
          variant={"flat"}
          isDisabled={saveDisabled}
        >
          Save
        </Button>
      </div>
      <QuestionModal
        titleText={"Delete Query"}
        questionText={"Are you sure you want to delete this query?"}
        isOpen={isDeleteModalOpen || deleteQueryLoading}
        isLoading={deleteQueryLoading}
        onClose={onCloseDeleteModal}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default QueryButtons;
