const CardEntry = ({ entry }: { entry: { key: string; value: string } }) => {
  return (
    <div className="p-2 my-1 bg-content2 rounded-md">
      <p>
        <span className="font-bold">{entry.key}:</span> {entry.value}
      </p>
    </div>
  );
};

export default CardEntry;
