export const StatusBadge = ({
  status,
}: {
  status?: "live" | "development" | "archived";
}) => {
  if (!status) return null;

  const statusConfig = {
    live: { text: "Live", led: "bg-green-500", ring: "ring-green-500/20" },
    development: {
      text: "In Development",
      led: "bg-yellow-500",
      ring: "ring-yellow-500/20",
    },
    archived: {
      text: "Archived",
      led: "bg-gray-500",
      ring: "ring-gray-500/20",
    },
  };
  const config = statusConfig[status];
  if (!config) return null;

  return (
    <div
      className={`absolute top-4 right-4 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-card/95 backdrop-blur-md border border-border shadow-lg ring-4 ${config.ring}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${config.led} animate-pulse shadow-lg`}
      ></span>
      <span className="text-foreground">{config.text}</span>
    </div>
  );
};
