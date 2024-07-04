import { Card, CardBody } from "@nextui-org/react";
import { Danger } from "iconsax-react";
import { motion } from "framer-motion";

export default function AuthError({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-md bg-danger">
        <CardBody>
          <div className="flex flex-row gap-4">
            <p className="text-white text-sm">{message}</p>
            <Danger color="white" variant="Bold" />
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
