import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ListTweetProps {
  tweet: string;
  photo: string;
  created_at: Date;
  id: number;
}

export default function ListTweet({
  tweet,
  photo,
  created_at,
  id,
}: ListTweetProps) {
  return (
    <Link href={`/tweets/${id}`} className="flex gap-5">
      <div className="relative size-28 rounded-md overflow-hidden">
        <Image className="object-cover" fill src={photo} alt={tweet} />
      </div>
      <div className="flex flex-col gap-2 *:rounded-md">
        <span className="text-lg">{tweet}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(created_at.toString())}
        </span>
      </div>
    </Link>
  );
}
