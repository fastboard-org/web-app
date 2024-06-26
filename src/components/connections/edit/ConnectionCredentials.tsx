import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ConnectionCredentials = ({
  credentials,
  onSave,
}: {
  credentials: any;
  onSave: (credentials: any) => void;
}) => {
  const [url, setUrl] = useState(credentials?.url?.split("://")[1]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUrl(credentials?.url?.split("://")[1]);
  }, [credentials]);

  const showButton = url !== credentials?.url?.split("://")[1];

  const handleSaveClick = () => {
    setLoading(true);
    setTimeout(() => {
      // TODO: Save credentials
      onSave({ url: "https://" + url });
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className={"flex items-center gap-4 mb-[60px]"}>
        <h4 className={"text-2xl font-medium"}>Credentials</h4>
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                size={"sm"}
                color={"primary"}
                variant={"flat"}
                onClick={handleSaveClick}
                isLoading={loading}
              >
                Save
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Input
        label={"Base URL"}
        labelPlacement={"outside"}
        size={"lg"}
        className={"w-[45%] max-w-[600px]"}
        classNames={{
          label: "text-lg",
        }}
        value={url}
        placeholder={"api.example.com"}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">https://</span>
          </div>
        }
        onChange={(e) => setUrl(e.target.value)}
      />
    </>
  );
};

export default ConnectionCredentials;
