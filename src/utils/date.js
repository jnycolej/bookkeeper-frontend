export const formatDate = (date, options = {}) => {
    if (!date) return "";

    const d = new Date(date);

    return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        ...options,
    });
};

export const formatRelativeDate = (date) => {
  if (!date) return "";

  const now = new Date();
  const then = new Date(date);
  const diff = Math.floor((now - then) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;

  return formatDate(date);
};