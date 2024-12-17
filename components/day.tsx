import { DateTime } from "luxon";

interface Props {
  date: string | null;
}

export default function Day({ date }: Props) {
  const dateTime = DateTime.fromISO(date!, {
    zone: "Europe/Istanbul",
    locale: "tr"
  });

  return (
    <div className="dark:bg-zinc-950 sticky top-0 z-20 bg-white px-4 py-2 shadow">
      <div className="mx-auto max-w-screen-md">
        <h5 className="font-medium uppercase opacity-80">
          {dateTime.toFormat("dd LLLL yyyy")}
        </h5>
      </div>
    </div>
  );
}
