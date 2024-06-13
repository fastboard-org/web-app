import DashboardName from "@/components/editor/DashboardName";
import PublishButton from "@/components/editor/PublishButton";

export default function Editor() {
  return (
    <div>
      <section>
        <DashboardName></DashboardName>
      </section>
      <section>
        <PublishButton></PublishButton>
      </section>
    </div>
  );
}
