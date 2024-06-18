import { FastboardComponent } from "@/types/editor";
import FastboardTable from "../fastboard-components/FastboardTable";

interface FullLayoutProps {
  component1: FastboardComponent;
}

export default function FullLayout(props: FullLayoutProps) {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <FastboardTable />
    </div>
  );
}
