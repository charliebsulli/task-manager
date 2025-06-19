// show abbreviated month and numerical date only
export function getPrettyDate(due: Date) {
  const dateArr = due.toDateString().split(" ");
  return dateArr[1] + " " + dateArr[2];
}

export default function DateDisplay({
  due,
  isOverdue,
}: {
  due: Date;
  isOverdue: boolean;
}) {
  return (
    <p
      className={
        "flex-5/12 ml-1 " + (isOverdue ? "text-amber-500" : "text-slate-400")
      }
    >
      {getPrettyDate(due)}
    </p>
  );
}
