import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ConnectionCredentials = ({
  credentials,
  onChange,
}: {
  credentials: any;
  onChange: (credentials: any) => void;
}) => {
  return (
    <div>
      <div className={"flex items-center gap-4 mb-[60px]"}>
        <h4 className={"text-2xl font-medium"}>Credentials</h4>
      </div>
      <Input
        label={"Base URL"}
        labelPlacement={"outside"}
        size={"lg"}
        className={"w-[45%] max-w-[600px]"}
        classNames={{
          label: "text-lg",
        }}
        value={credentials?.url?.split("://")[1]}
        placeholder={"api.example.com"}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">https://</span>
          </div>
        }
        onChange={(e) => onChange({ url: "https://" + e.target.value })}
      />
    </div>
  );
};

export default ConnectionCredentials;
