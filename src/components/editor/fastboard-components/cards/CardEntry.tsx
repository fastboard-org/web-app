const CardEntry = ({ entry }: { entry: { key: string; value: string } }) => {
  return (
    <div className="p-2 my-1 bg-[#27272A]/100 rounded-md shadow-lg shadow-black/25 rounded">
      <p>
        <span className="font-bold">{entry.key}:</span> {entry.value}
      </p>
    </div>
  );
};

export default CardEntry;
