import { FastboardComponent } from "@/types/editor";
import FastboardTable from "../fastboard-components/FastboardTable";

interface FullLayoutProps {
  component1: FastboardComponent;
}

export default function FullLayout(props: FullLayoutProps) {
  function getComponent(component: FastboardComponent) {
    switch (component.type) {
      case "Table":
        return <FastboardTable />;
    }
  }

  return (
    <div className="flex h-full w-full justify-center items-center">
      {getComponent(props.component1)}
    </div>
  );
}
