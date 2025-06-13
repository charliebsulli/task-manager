export default function DateDisplay({ due }: { due: Date }) {
  // show abbreviated month and numerical date only
  function getPrettyDate(due: Date) {
    const dateArr = due.toDateString().split(" ");
    return dateArr[1] + " " + dateArr[2];
  }
  return <p className="flex-5/12 ml-1 text-slate-400">{getPrettyDate(due)}</p>;
}
